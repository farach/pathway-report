# CLAUDE.md - Pathway Report (Interactive Research Report)

## Project Context

This is an interactive research report presenting AI Labor Networks research findings. Built with React/TypeScript/Vite, featuring an interactive network visualization as the centerpiece.

## Key Features

- **Hero Network Visualization**: D3.js force-directed graph showing career pathways
- **Quadrant Framework**: Visual explanation of PTR vs NFC metrics
- **Sector Explorer**: Interactive exploration across 20 sectors
- **Research Findings**: Scroll-driven presentation of key results

## Tech Stack

- **Framework**: React 18 + TypeScript (strict mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Visualization**: D3.js for network, Recharts for charts
- **Animation**: Framer Motion

## Quadrant Color System

```typescript
const quadrantColors = {
  HH: "#DC2626",  // red-600 - High PTR, High NFC (most vulnerable)
  HL: "#EA580C",  // orange-600 - High PTR, Low NFC
  LH: "#9333EA",  // purple-600 - Low PTR, High NFC
  LL: "#16A34A",  // green-600 - Low PTR, Low NFC (least vulnerable)
};
```

## Data Structure

Data lives in `src/data/`:
- `types.ts` - TypeScript interfaces
- `roles.json` - All roles with metrics
- `sectors.json` - Sector summaries
- `networks/*.json` - Per-sector network graphs

Network JSON format:
```json
{
  "sector": "Finance",
  "metadata": { "nodeCount": 245, "edgeCount": 512 },
  "nodes": [{ "id": "...", "label": "...", "ptr": 0.72, "nfc": 0.45, "quadrant": "HL" }],
  "edges": [{ "source": "...", "target": "...", "weight": 0.85 }]
}
```

## Commands

```bash
npm run dev      # Development server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```

## File Organization

```
src/
  main.tsx              # Entry point
  App.tsx               # Root component with routing
  index.css             # Tailwind + custom CSS
  components/           # Reusable components
    NetworkGraph.tsx    # D3 force-directed graph
    StatCard.tsx        # Animated statistics
    QuadrantLegend.tsx  # Color legend
  sections/             # Page sections
    Hero.tsx
    NetworkExplorer.tsx
    Findings.tsx
    Methodology.tsx
  hooks/                # Custom React hooks
    useNetworkData.ts
    useScrollAnimation.ts
  data/                 # Static data files
    types.ts
    networks/
  lib/
    utils.ts            # Utility functions (cn, colors)
```

## Development Guidelines

1. **TypeScript strict mode** - No `any` types
2. **Tailwind only** - No inline styles or separate CSS modules
3. **Memoization** - Use `useMemo`/`useCallback` for expensive operations
4. **Accessibility** - ARIA labels on all interactive elements
5. **Responsive** - Mobile-first design, test at 320px-1920px

## D3.js Patterns

Network visualization uses D3 for:
- Force simulation (positioning)
- Zoom/pan behavior
- Node/edge rendering

React owns the DOM; D3 calculates positions. Use refs to access SVG elements.

## Deployment

Static site deployment to Azure Static Web Apps:
```bash
npm run build
# Deploy dist/ folder
```

## Data Preparation

Data comes from the ai-labor-networks analysis. To regenerate:
```bash
cd scripts
Rscript prepare_data.R
```

This creates JSON files in both `src/data/` and `public/data/`.

## Related Projects

- **ai-labor-networks**: R analysis that produces the underlying data
- **Pathway_Dashboard**: Shiny dashboard (archived, superseded by this report)
- **ai-timescape-tales**: Design inspiration for this interactive report format

## Build Info

- Tailwind CSS v3.4.15 (v4 incompatible with current setup)
- Data auto-copied to `public/data/` for Vite to serve
