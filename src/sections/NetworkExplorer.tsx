import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ZoomIn, ZoomOut, Maximize2, Loader2 } from 'lucide-react';
import { NetworkGraph, NetworkTooltip } from '../components/NetworkGraph';
import { QuadrantLegend } from '../components/QuadrantLegend';
import { useNetworkData, useSectors, preloadNetworks } from '../hooks/useNetworkData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { NetworkNode, QuadrantCode } from '../data/types';
import { cn, quadrantColors } from '../lib/utils';

export function NetworkExplorer() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const { sectors, loading: sectorsLoading } = useSectors();

  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantCode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  // Set initial sector when loaded
  useEffect(() => {
    if (sectors.length > 0 && !selectedSector) {
      setSelectedSector(sectors[0].sector);
      // Preload top 5 sectors
      preloadNetworks(sectors.slice(0, 5).map((s) => s.sector));
    }
  }, [sectors, selectedSector]);

  const { data: networkData, loading: networkLoading, error } = useNetworkData(selectedSector);

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node === selectedNode ? null : node);
  };

  const handleSectorChange = (sector: string) => {
    setSelectedSector(sector);
    setSelectedNode(null);
    setHoveredNode(null);
  };

  return (
    <section
      id="network"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white">
            Explore Career Networks
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Interactive visualization of promotion pathways within each sector
          </p>
        </motion.div>

        {/* Visual Key: What you're seeing */}
        <motion.div
          className="max-w-3xl mx-auto mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-slate-400 shrink-0" />
              <div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Dots</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Each dot is a job role in this sector</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="mt-0.5 flex gap-0.5 shrink-0">
                <span className="w-2 h-4 rounded-sm" style={{ backgroundColor: quadrantColors.HH }} />
                <span className="w-2 h-4 rounded-sm" style={{ backgroundColor: quadrantColors.HL }} />
                <span className="w-2 h-4 rounded-sm" style={{ backgroundColor: quadrantColors.LH }} />
                <span className="w-2 h-4 rounded-sm" style={{ backgroundColor: quadrantColors.LL }} />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Colors</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Vulnerability category (see legend below)</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="mt-0.5 flex items-end gap-0.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="w-3 h-3 rounded-full bg-slate-400" />
                <span className="w-4 h-4 rounded-full bg-slate-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Size</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Bigger = more career paths flow through that role</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="mt-1 w-6 shrink-0">
                <div className="h-0.5 bg-slate-400 rounded" />
                <div className="h-1 bg-slate-400 rounded mt-1" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Lines</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Observed promotions between roles; thicker = more common</p>
              </div>
            </div>
          </div>

          {/* Collapsible reading guide */}
          <details className="mt-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 group">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm font-medium text-amber-800 dark:text-amber-200 list-none flex items-center gap-1.5">
              <svg
                className="w-4 h-4 shrink-0 transition-transform group-open:rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              How to read this chart
            </summary>
            <div className="px-4 pb-4 space-y-3 text-sm text-amber-900 dark:text-amber-100">
              <div>
                <strong>Understanding the layout:</strong>
                <ul className="mt-1 ml-4 list-disc space-y-1 text-amber-800 dark:text-amber-200">
                  <li>Clusters of connected dots = groups of roles with many promotion paths between them</li>
                  <li>Isolated dots at the edges = roles with few connections (potential career dead-ends)</li>
                  <li>Large red dots near the center = high-traffic, high-risk roles that may serve as important connectors</li>
                </ul>
              </div>
              <div>
                <strong>Important note:</strong> The position of dots is determined by how they connect to each other
                (a physics simulation), <em>not</em> by their risk scores. Unlike a scatterplot, the x/y position on
                screen does not correspond to a data axis. Instead, roles that share many promotion connections are
                pulled closer together.
              </div>
              <div>
                <strong>Interacting:</strong> Hover over any dot to see role details. Click and drag to
                reposition nodes. Scroll or pinch to zoom. Use the quadrant filter below to isolate
                vulnerability categories, or search for specific job titles.
              </div>
            </div>
          </details>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-wrap gap-4 mb-6 items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Sector selector */}
          <div className="flex items-center gap-3">
            <label htmlFor="sector-select" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Sector:
            </label>
            <select
              id="sector-select"
              value={selectedSector}
              onChange={(e) => handleSectorChange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={sectorsLoading}
            >
              {sectors.map((s) => (
                <option key={s.sector} value={s.sector}>
                  {s.sector} ({s.total_roles} roles)
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Quadrant filter */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <QuadrantLegend
            selected={selectedQuadrant}
            onSelect={setSelectedQuadrant}
          />
        </motion.div>

        {/* Network visualization */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="card p-4 overflow-hidden">
            {networkLoading ? (
              <div className="flex items-center justify-center h-[500px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-3 text-slate-600 dark:text-slate-400">Loading network...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-[500px] text-red-500">
                Failed to load network data
              </div>
            ) : networkData ? (
              <>
                <NetworkGraph
                  nodes={networkData.nodes}
                  edges={networkData.edges}
                  selectedQuadrant={selectedQuadrant}
                  searchTerm={searchTerm}
                  onNodeClick={handleNodeClick}
                  onNodeHover={setHoveredNode}
                />

                {/* Tooltip */}
                <NetworkTooltip node={hoveredNode || selectedNode} />

                {/* Stats overlay */}
                <div className="absolute bottom-6 left-6 text-sm text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {networkData.metadata.nodeCount} roles · {networkData.metadata.edgeCount} connections
                </div>
              </>
            ) : null}
          </div>

          {/* Controls overlay */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button
              type="button"
              className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            <button
              type="button"
              className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            <button
              type="button"
              className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              title="Fit to view"
              aria-label="Fit to view"
            >
              <Maximize2 className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </motion.div>

        {/* Sector summary cards */}
        {networkData && (
          <motion.div
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SummaryCard
              label="Total Roles"
              value={networkData.nodes.length}
              className="bg-blue-50 dark:bg-blue-950/30"
            />
            <SummaryCard
              label="High-High (HH)"
              value={networkData.nodes.filter((n) => n.quadrant === 'HH').length}
              color="red"
              className="bg-red-50 dark:bg-red-950/30"
            />
            <SummaryCard
              label="Avg Pathway Risk"
              value={`${(
                (networkData.nodes.reduce((sum, n) => sum + n.ptr, 0) /
                  networkData.nodes.length) *
                100
              ).toFixed(1)}%`}
              className="bg-orange-50 dark:bg-orange-950/30"
            />
            <SummaryCard
              label="Avg Net. Constraint"
              value={`${(
                (networkData.nodes.reduce((sum, n) => sum + n.nfc, 0) /
                  networkData.nodes.length) *
                100
              ).toFixed(1)}%`}
              className="bg-purple-50 dark:bg-purple-950/30"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function SummaryCard({
  label,
  value,
  color,
  className,
}: {
  label: string;
  value: number | string;
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn('p-4 rounded-xl border border-slate-200 dark:border-slate-700', className)}>
      <div
        className={cn(
          'text-2xl font-bold',
          color === 'red' ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'
        )}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{label}</div>
    </div>
  );
}
