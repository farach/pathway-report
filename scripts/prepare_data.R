# ==============================================================================
# Data Preparation Script for Pathway Report (React Web App)
# ==============================================================================
# Converts R outputs from ai-labor-networks to JSON for web consumption

library(tidyverse)
library(jsonlite)

# ---- Configuration ----
source_dir <- "../../ai-labor-networks/outputs"
target_dir <- "../src/data"

cat("Preparing Pathway Report Data (JSON)\n")
cat("=====================================\n")
cat("Source directory:", source_dir, "\n")
cat("Target directory:", target_dir, "\n\n")

# Create networks subdirectory if needed
dir.create(file.path(target_dir, "networks"), showWarnings = FALSE, recursive = TRUE)

# ---- Load Source Data ----
cat("Loading source data...\n")

role_data <- read_csv(
  file.path(source_dir, "all_sectors_combined_results.csv"),
  show_col_types = FALSE
)
cat("  - Role data:", nrow(role_data), "rows\n")

sector_summary <- read_csv(
  file.path(source_dir, "sector_summary.csv"),
  show_col_types = FALSE
)
cat("  - Sector summary:", nrow(sector_summary), "rows\n")

cascade_raw <- read_csv(
  file.path(source_dir, "removal_strategy_comparison.csv"),
  show_col_types = FALSE
)
cat("  - Cascade results:", nrow(cascade_raw), "rows\n")

# ---- Data Cleaning ----
cat("\nCleaning data...\n")

# Fill NAs and create stable IDs
role_data <- role_data |>
  mutate(
    ptr = coalesce(ptr, 0),
    nfc = coalesce(nfc, 0),
    ai_exposure_eloundou = coalesce(ai_exposure_eloundou, 0),
    ai_exposure_microsoft = coalesce(ai_exposure_microsoft, 0),
    betweenness = coalesce(betweenness, 0),
    id = str_to_lower(str_replace_all(title, "[^a-zA-Z0-9]+", "-")),
    id = str_replace_all(id, "^-|-$", "")
  )

# Ensure unique IDs by appending sector
role_data <- role_data |>
  group_by(id) |>
  mutate(
    id = if (n() > 1) paste0(id, "-", str_to_lower(str_replace_all(sector, "[^a-zA-Z0-9]+", "-"))) else id
  ) |>
  ungroup()

cat("  - Created", n_distinct(role_data$id), "unique role IDs\n")

# ---- Export Roles JSON ----
cat("\nExporting roles.json...\n")

roles_export <- role_data |>
  select(
    id,
    title,
    sector,
    soc,
    ptr,
    nfc,
    quadrant_code,
    ai_exposure_eloundou,
    ai_exposure_microsoft,
    betweenness
  ) |>
  mutate(across(where(is.numeric), ~round(., 4)))

write_json(
  roles_export,
  file.path(target_dir, "roles.json"),
  pretty = TRUE,
  auto_unbox = TRUE
)

file_size <- file.info(file.path(target_dir, "roles.json"))$size / 1024
cat("  - Saved roles.json:", nrow(roles_export), "roles,", round(file_size), "KB\n")

# ---- Export Sector Summary ----
cat("\nExporting sectors.json...\n")

sectors_export <- sector_summary |>
  transmute(
    sector = sector,
    total_roles = n_roles,
    roles_with_indices = n_with_indices,
    avg_ptr = round(mean_ptr, 4),
    avg_nfc = round(mean_nfc, 4),
    avg_ai_exposure = round(mean_ai, 4),
    hh_count = n_high_high,
    hh_share = round(pct_high_high / 100, 4),
    high_ptr_count = n_high_ptr,
    high_nfc_count = n_high_nfc
  )

write_json(
  sectors_export,
  file.path(target_dir, "sectors.json"),
  pretty = TRUE,
  auto_unbox = TRUE
)
cat("  - Saved sectors.json:", nrow(sectors_export), "sectors\n")

# ---- Export Network Data Per Sector ----
cat("\nExporting network data per sector...\n")

# Helper to create network for a sector
create_sector_network <- function(sector_name, data, max_nodes = 150) {
  sector_data <- data |>
    filter(sector == sector_name) |>
    slice_max(order_by = betweenness, n = max_nodes, with_ties = FALSE)

  # Create nodes
  nodes <- sector_data |>
    transmute(
      id = id,
      label = title,
      soc = soc,
      ptr = round(ptr, 4),
      nfc = round(nfc, 4),
      quadrant = quadrant_code,
      size = round(pmin(betweenness * 500, 30) + 5, 2),  # Scale for visualization
      aiExposure = round((ai_exposure_eloundou + ai_exposure_microsoft) / 2, 4)
    )

  # Create synthetic edges using hub-spoke pattern
  edges <- tibble(source = character(), target = character(), weight = numeric())

  if (nrow(nodes) >= 2) {
    set.seed(42)  # Reproducible edges

    # Hub nodes (top 10 by betweenness)
    hub_ids <- nodes |>
      slice_max(order_by = size, n = min(10, nrow(nodes))) |>
      pull(id)

    # Connect each node to 1-2 hubs
    edge_list <- list()
    for (i in seq_len(nrow(nodes))) {
      node_id <- nodes$id[i]
      if (!(node_id %in% hub_ids)) {
        # Connect to random hubs
        n_connections <- sample(1:2, 1)
        targets <- sample(hub_ids, min(n_connections, length(hub_ids)))
        for (t in targets) {
          edge_list[[length(edge_list) + 1]] <- tibble(
            source = node_id,
            target = t,
            weight = round(runif(1, 0.4, 1.0), 2)
          )
        }
      }
    }

    # Connect hubs to each other
    if (length(hub_ids) >= 2) {
      for (i in 1:(length(hub_ids) - 1)) {
        for (j in (i + 1):length(hub_ids)) {
          if (runif(1) > 0.3) {  # 70% chance of hub-to-hub connection
            edge_list[[length(edge_list) + 1]] <- tibble(
              source = hub_ids[i],
              target = hub_ids[j],
              weight = round(runif(1, 0.6, 1.0), 2)
            )
          }
        }
      }
    }

    # SOC-based connections (same prefix)
    nodes_with_soc <- nodes |> mutate(soc_prefix = str_sub(soc, 1, 5))
    for (prefix in unique(nodes_with_soc$soc_prefix)) {
      prefix_ids <- nodes_with_soc |> filter(soc_prefix == prefix) |> pull(id)
      if (length(prefix_ids) >= 2 && length(prefix_ids) <= 5) {
        # Fully connect small groups
        for (i in 1:(length(prefix_ids) - 1)) {
          for (j in (i + 1):length(prefix_ids)) {
            edge_list[[length(edge_list) + 1]] <- tibble(
              source = prefix_ids[i],
              target = prefix_ids[j],
              weight = 0.7
            )
          }
        }
      }
    }

    if (length(edge_list) > 0) {
      edges <- bind_rows(edge_list) |>
        distinct(source, target, .keep_all = TRUE)
    }
  }

  list(
    sector = sector_name,
    metadata = list(
      nodeCount = nrow(nodes),
      edgeCount = nrow(edges),
      generatedAt = format(Sys.time(), "%Y-%m-%dT%H:%M:%SZ")
    ),
    nodes = nodes,
    edges = edges
  )
}

sectors <- unique(role_data$sector)
networks_dir <- file.path(target_dir, "networks")

for (s in sectors) {
  network <- create_sector_network(s, role_data)
  filename <- str_to_lower(str_replace_all(s, "[^a-zA-Z0-9]+", "-"))
  filepath <- file.path(networks_dir, paste0(filename, ".json"))

  write_json(network, filepath, pretty = TRUE, auto_unbox = TRUE)
  cat("  -", s, ":", network$metadata$nodeCount, "nodes,", network$metadata$edgeCount, "edges\n")
}

# ---- Export Cascade Results ----
cat("\nExporting cascade.json...\n")

cascade_export <- cascade_raw |>
  transmute(
    strategy = Strategy,
    components_after = Components_After,
    fragmentation_increase = Fragmentation_Increase,
    giant_size_after = Giant_Size_After
  )

write_json(
  cascade_export,
  file.path(target_dir, "cascade.json"),
  pretty = TRUE,
  auto_unbox = TRUE
)
cat("  - Saved cascade.json:", nrow(cascade_export), "strategies\n")

# ---- Export Research Statistics ----
cat("\nExporting stats.json...\n")

ptr_nfc_cor <- cor(role_data$ptr, role_data$nfc, use = "complete.obs")

quadrant_dist <- role_data |>
  count(quadrant_code) |>
  mutate(share = n / sum(n))

hh_stats <- quadrant_dist |> filter(quadrant_code == "HH")

stats_export <- list(
  totalRoles = nrow(role_data),
  totalSectors = n_distinct(role_data$sector),
  ptrNfcCorrelation = round(ptr_nfc_cor, 3),
  hhRoles = hh_stats$n,
  hhShare = round(hh_stats$share, 3),
  quadrantDistribution = quadrant_dist |>
    select(quadrant = quadrant_code, count = n, share) |>
    mutate(share = round(share, 3))
)

write_json(
  stats_export,
  file.path(target_dir, "stats.json"),
  pretty = TRUE,
  auto_unbox = TRUE
)
cat("  - Saved stats.json\n")

# ---- Summary ----
cat("\n=====================================\n")
cat("Data preparation complete!\n")
cat("Files created:\n")
cat("  - roles.json\n")
cat("  - sectors.json\n")
cat("  - cascade.json\n")
cat("  - stats.json\n")
cat("  - networks/*.json (", length(sectors), " files)\n", sep = "")
