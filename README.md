# Structural Vulnerability in AI-Affected Career Pathways

An interactive research report exploring how AI exposure and career network structure combine to create distinct vulnerability profiles for workers across 20 industry sectors.

**Live report:** [workforcefutures.net/reports/pathway-report](https://workforcefutures.net/reports/pathway-report/)

## What This Report Covers

This visualization presents findings from an analysis of over 500,000 validated career transitions across 20 sectors. It introduces two independent measures of workforce vulnerability:

- **AI Pathway Risk (PTR)** -- How exposed is a role to AI, and how few promotion options does the worker have?
- **Career Network Constraint (NFC)** -- Are the roles a worker could move into also at risk?

These two dimensions are largely independent (r = 0.10), meaning a role's direct AI exposure tells you almost nothing about whether the worker has viable career alternatives. Together they define four vulnerability profiles, visualized through interactive network graphs.

## Features

- Interactive force-directed network visualization of career pathways per sector
- Quadrant framework mapping roles across two risk dimensions
- Sector-by-sector exploration of 15,759 roles across 20 industries
- Cascade fragmentation analysis showing network resilience under targeted disruption

## Tech Stack

React, TypeScript, Vite, D3.js, Tailwind CSS, Framer Motion

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build in dist/
```

## Related Research

This report accompanies the working paper *Structural Vulnerability in AI-Affected Career Pathways: A Network Analysis of Promotion Transitions Across 20 Sectors*. The underlying analysis is available at [github.com/farach/ai-labor-networks](https://github.com/farach/ai-labor-networks).

## License

MIT
