export type QuadrantCode = "HH" | "HL" | "LH" | "LL";

export interface Role {
  id: string;
  title: string;
  sector: string;
  soc: string;
  ptr: number;
  nfc: number;
  quadrant_code: QuadrantCode;
  ai_exposure_eloundou: number;
  ai_exposure_microsoft: number;
  betweenness: number;
}

export interface NetworkNode {
  id: string;
  label: string;
  soc: string;
  ptr: number;
  nfc: number;
  quadrant: QuadrantCode;
  size: number;
  aiExposure: number;
  betweenness?: number;
  // D3 simulation properties (added during rendering)
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
}

export interface NetworkEdge {
  source: string | NetworkNode;
  target: string | NetworkNode;
  weight: number;
}

export interface NetworkMetadata {
  nodeCount: number;
  edgeCount: number;
  generatedAt: string;
}

export interface SectorNetwork {
  sector: string;
  metadata: NetworkMetadata;
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

export interface SectorSummary {
  sector: string;
  total_roles: number;
  roles_with_indices: number;
  avg_ptr: number;
  avg_nfc: number;
  avg_ai_exposure: number;
  hh_count: number;
  hh_share: number;
  high_ptr_count: number;
  high_nfc_count: number;
}

export interface QuadrantDistribution {
  quadrant: QuadrantCode;
  count: number;
  share: number;
}

export interface ResearchStats {
  totalRoles: number;
  totalSectors: number;
  ptrNfcCorrelation: number;
  hhRoles: number;
  hhShare: number;
  quadrantDistribution: QuadrantDistribution[];
}

export interface CascadeResult {
  strategy: string;
  components_after: number;
  fragmentation_increase: number;
  giant_size_after: number;
}

// Constants for display (from paper)
export const DISPLAY_STATS = {
  totalRoles: 15759,
  totalSectors: 20,
  // Note: Paper reports PTR-NFC correlation of ~0.10 for within-network
  // The overall correlation is higher due to between-sector variation
  ptrNfcCorrelation: 0.10,
};
