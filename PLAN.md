# Pathway Vulnerability - Interactive Research Report

## Overview

Create a modern, slick interactive research report presenting the AI Labor Networks research findings, inspired by [ai-timescape-tales](https://github.com/farach/ai-timescape-tales). This replaces the Shiny dashboard approach with a React/TypeScript web application featuring interactive network visualization as the centerpiece.

**Key Pivot Decision:** The Shiny dashboard was too similar to ASO_Dashboard. This approach creates a distinct, engaging research presentation format.

**User's Favorite Feature:** Interactive network visualization - this will be the hero element.

---

## Current Status (2026-01-31)

### Completed
- [x] Phase 0: Created react-developer and data-transformer agents
- [x] Phase 1: Project setup with Vite, React, TypeScript, Tailwind CSS v3
- [x] Phase 2: Data preparation script (R to JSON) - all 20 sectors exported
- [x] Phase 3: All sections built (Hero, Framework, NetworkExplorer, Findings, SectorDeepDive, Methodology)
- [x] Phase 4: Build succeeds, dev server runs

### Known Issues to Fix
- [ ] Review and fix UI issues visible on dev server (user noted problems)
- [ ] Test all interactive features (network zoom/pan, filtering, search)
- [ ] Verify mobile responsiveness
- [ ] Check dark mode styling
- [ ] Performance testing with full dataset

### Remaining Work
- [ ] Phase 5: Polish animations and transitions
- [ ] Phase 6: Deployment to Azure Static Web Apps
- [ ] Phase 7: Marketing campaign (run stakeholder-simulator first)

---

## Technical Architecture

### Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v3.4.15 (v4 incompatible)
- **Visualization:** D3.js for network graph
- **Animation:** Framer Motion
- **Deployment:** Static site (Azure Static Web Apps planned)

### Directory Structure
```
Pathway_Report/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── CLAUDE.md
├── PLAN.md (this file)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── NetworkGraph.tsx    # D3 force-directed graph
│   │   ├── QuadrantLegend.tsx  # Color legend
│   │   ├── StatCard.tsx        # Animated stats
│   │   └── Navigation.tsx      # Header + footer
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Framework.tsx
│   │   ├── NetworkExplorer.tsx # Main interactive feature
│   │   ├── Findings.tsx
│   │   ├── SectorDeepDive.tsx
│   │   └── Methodology.tsx
│   ├── hooks/
│   │   ├── useNetworkData.ts
│   │   └── useScrollAnimation.ts
│   ├── data/
│   │   └── types.ts
│   └── lib/
│       └── utils.ts
├── public/
│   └── data/                   # JSON data files
│       ├── roles.json
│       ├── sectors.json
│       ├── cascade.json
│       ├── stats.json
│       └── networks/*.json     # 20 sector files
└── scripts/
    └── prepare_data.R          # R to JSON converter
```

---

## Commands

```bash
# Development
cd "C:\Users\alexfarach\OneDrive - Microsoft\Documents\Pathway_Report"
npm run dev      # http://localhost:5173

# Build
npm run build    # Output to dist/

# Data regeneration (if R outputs change)
cd scripts
Rscript prepare_data.R
```

---

## Key Design Decisions

1. **React over Shiny** - Distinctly different from ASO_Dashboard
2. **D3.js for network** - Full control over visualization
3. **Lazy loading** - Heavy sections load on demand
4. **Tailwind v3** - v4 had compatibility issues with current Node version
5. **Static hosting** - No server-side computation needed

---

## Deployment Plan

### Azure Static Web Apps
```bash
npm run build
# Deploy dist/ folder to Azure
# Configure custom domain: pathway-report.workforcefutures.net
```

### Pre-deployment checklist
- [ ] Fix all UI issues
- [ ] Run stakeholder-simulator on messaging
- [ ] Create OG image for social sharing
- [ ] Test on mobile devices
- [ ] Accessibility audit

---

## Related Projects

- `ai-labor-networks/` - R analysis (source data)
- `Pathway_Dashboard/` - Shiny dashboard (archived)
- `ai-timescape-tales` - Design inspiration
