# Structural Vulnerability in AI-Affected Career Pathways

An interactive research report exploring how AI exposure and career network structure combine to create distinct vulnerability profiles for workers across 20 industry sectors.

**View the report:** [workforcefutures.net/reports/pathway-report](https://workforcefutures.net/reports/pathway-report/)

## About This Research

This analysis examines over 500,000 validated career transitions across 20 sectors to measure two independent dimensions of workforce vulnerability:

- **AI Pathway Risk (PTR)** -- How exposed is a role to AI, and how few promotion options does the worker have?
- **Career Network Constraint (NFC)** -- Are the roles a worker could move into also at risk?

These two dimensions are largely independent (r = 0.10), meaning a role's direct AI exposure tells you almost nothing about whether the worker has viable career alternatives. Together they define four vulnerability profiles.

## Data

This repository contains the data behind the report. All files are in JSON format.

| File | Description |
|------|-------------|
| [`public/data/roles.json`](public/data/roles.json) | 15,759 roles with PTR, NFC, quadrant assignment, and sector |
| [`public/data/sectors.json`](public/data/sectors.json) | 20 sector summaries with aggregate statistics |
| [`public/data/networks/`](public/data/networks/) | Per-sector career network graphs (nodes and edges) |
| [`public/data/cascade.json`](public/data/cascade.json) | Network fragmentation simulation results |
| [`public/data/stats.json`](public/data/stats.json) | Overall summary statistics |

### Data Sources

- **Career transitions:** [CMap database](https://www.nature.com/articles/s41597-025-05526-3) (*Nature Scientific Data*, 2025) -- 220M resumes, 546M professional experiences
- **AI exposure (task-level):** [Eloundou et al.](https://www.science.org/doi/10.1126/science.adj0998) (*Science*, 2024) -- GPT-4 task exposure ratings
- **AI applicability (usage-based):** [Microsoft Research](https://arxiv.org/abs/2507.07935) (2025) -- observed Copilot usage patterns

## Citation

```
Farach, A. (2026). Structural Vulnerability in AI Career Pathways:
A Network Analysis of Promotion Constraints. Working Paper.
```

## License

MIT
