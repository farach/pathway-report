import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import type { NetworkNode, NetworkEdge, QuadrantCode } from '../data/types';
import { quadrantColors, quadrantNames } from '../lib/utils';

interface NetworkGraphProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  width?: number;
  height?: number;
  selectedQuadrant?: QuadrantCode | null;
  onNodeClick?: (node: NetworkNode) => void;
  onNodeHover?: (node: NetworkNode | null) => void;
  searchTerm?: string;
}

interface SimulationNode extends NetworkNode {
  x: number;
  y: number;
  fx?: number | null;
  fy?: number | null;
}

interface SimulationEdge {
  source: SimulationNode;
  target: SimulationNode;
  weight: number;
}

export function NetworkGraph({
  nodes,
  edges,
  width = 800,
  height = 600,
  selectedQuadrant,
  onNodeClick,
  onNodeHover,
  searchTerm = '',
}: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width, height });
  const simulationRef = useRef<d3.Simulation<SimulationNode, SimulationEdge> | null>(null);

  // Store callbacks in refs to avoid re-creating the visualization on hover
  const onNodeHoverRef = useRef(onNodeHover);
  const onNodeClickRef = useRef(onNodeClick);

  // Keep refs updated
  useEffect(() => {
    onNodeHoverRef.current = onNodeHover;
    onNodeClickRef.current = onNodeClick;
  }, [onNodeHover, onNodeClick]);

  // Responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width: containerWidth } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: containerWidth,
          height: Math.min(containerWidth * 0.75, 700),
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Filter nodes based on search and quadrant
  const getNodeOpacity = useCallback(
    (node: NetworkNode) => {
      const matchesQuadrant = !selectedQuadrant || node.quadrant === selectedQuadrant;
      const matchesSearch =
        !searchTerm ||
        node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.soc.includes(searchTerm);

      if (selectedQuadrant && searchTerm) {
        return matchesQuadrant && matchesSearch ? 1 : 0.1;
      }
      if (selectedQuadrant) {
        return matchesQuadrant ? 1 : 0.15;
      }
      if (searchTerm) {
        return matchesSearch ? 1 : 0.15;
      }
      return 1;
    },
    [selectedQuadrant, searchTerm]
  );

  // D3 visualization
  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width: w, height: h } = dimensions;

    // Add definitions for filters and markers
    const defs = svg.append('defs');

    // Glow filters for each quadrant color
    const glowColors: Record<string, string> = {
      HH: quadrantColors.HH,
      HL: quadrantColors.HL,
      LH: quadrantColors.LH,
      LL: quadrantColors.LL,
    };

    Object.entries(glowColors).forEach(([quadrant, color]) => {
      const filter = defs.append('filter')
        .attr('id', `glow-${quadrant}`)
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%');

      filter.append('feGaussianBlur')
        .attr('stdDeviation', '3')
        .attr('result', 'coloredBlur');

      filter.append('feFlood')
        .attr('flood-color', color)
        .attr('flood-opacity', '0.4')
        .attr('result', 'glowColor');

      filter.append('feComposite')
        .attr('in', 'glowColor')
        .attr('in2', 'coloredBlur')
        .attr('operator', 'in')
        .attr('result', 'softGlow');

      const feMerge = filter.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'softGlow');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    });

    // Arrow markers for each quadrant color
    Object.entries(glowColors).forEach(([quadrant, color]) => {
      defs.append('marker')
        .attr('id', `arrowhead-${quadrant}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20)
        .attr('refY', 0)
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-4L10,0L0,4')
        .attr('fill', color)
        .attr('opacity', 0.6);
    });

    // Default arrow marker (fallback)
    defs.append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-4L10,0L0,4')
      .attr('fill', '#94a3b8')
      .attr('opacity', 0.5);

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Container for zoom/pan
    const container = svg.append('g').attr('class', 'zoom-container');

    // Prepare data for simulation
    const simNodes: SimulationNode[] = nodes.map((n) => ({
      ...n,
      x: w / 2 + (Math.random() - 0.5) * 100,
      y: h / 2 + (Math.random() - 0.5) * 100,
    }));

    const nodeById = new Map(simNodes.map((n) => [n.id, n]));

    const simEdges: SimulationEdge[] = edges
      .map((e) => {
        const source = nodeById.get(typeof e.source === 'string' ? e.source : e.source.id);
        const target = nodeById.get(typeof e.target === 'string' ? e.target : e.target.id);
        if (source && target) {
          return { source, target, weight: e.weight };
        }
        return null;
      })
      .filter((e): e is SimulationEdge => e !== null);

    // Create simulation - runs once then stops completely
    const simulation = d3
      .forceSimulation(simNodes)
      .force(
        'link',
        d3
          .forceLink<SimulationNode, SimulationEdge>(simEdges)
          .id((d) => d.id)
          .distance(120)
          .strength(0.3)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(w / 2, h / 2))
      .force('collision', d3.forceCollide<SimulationNode>().radius((d) => d.size + 10))
      .alphaDecay(0.05) // Even faster stabilization
      .velocityDecay(0.6); // More damping

    simulationRef.current = simulation;

    // Helper function to generate curved path
    const linkArc = (d: SimulationEdge) => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const dr = Math.sqrt(dx * dx + dy * dy) * 1.2; // Curve radius
      return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
    };

    // Draw edges FIRST (so they appear behind nodes) - curved paths with quadrant colors
    const links = container
      .append('g')
      .attr('class', 'links')
      .selectAll('path')
      .data(simEdges)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', (d) => quadrantColors[d.source.quadrant])
      .attr('stroke-opacity', 0.35)
      .attr('stroke-width', (d) => Math.max(1, d.weight * 1.5))
      .attr('marker-end', (d) => `url(#arrowhead-${d.source.quadrant})`)
      .attr('d', linkArc);

    // Draw nodes
    const nodeGroup = container
      .append('g')
      .attr('class', 'nodes')
      .selectAll<SVGGElement, SimulationNode>('g')
      .data(simNodes)
      .join('g')
      .attr('class', 'node-group')
      .style('cursor', 'grab');

    // Drag behavior - only for explicit dragging, simulation stays stopped
    const dragBehavior = d3
      .drag<SVGGElement, SimulationNode>()
      .on('start', function (_event, d) {
        d3.select(this).style('cursor', 'grabbing');
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', function (event, d) {
        d.fx = event.x;
        d.fy = event.y;
        d.x = event.x;
        d.y = event.y;
        // Update this node's position immediately
        d3.select(this).attr('transform', `translate(${event.x},${event.y})`);
        // Update connected edges with curved paths
        links
          .filter((l) => l.source === d || l.target === d)
          .attr('d', linkArc);
      })
      .on('end', function (_event, d) {
        d3.select(this).style('cursor', 'grab');
        // Keep node fixed where user dropped it
        d.fx = d.x;
        d.fy = d.y;
      });

    // Apply drag to node groups
    nodeGroup.call(dragBehavior);

    // Node circles with glow effect
    nodeGroup
      .append('circle')
      .attr('r', (d) => d.size)
      .attr('fill', (d) => quadrantColors[d.quadrant])
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', (d) => getNodeOpacity(d))
      .attr('filter', (d) => `url(#glow-${d.quadrant})`)
      .style('transition', 'transform 150ms ease-out');

    // Node labels (only for larger nodes)
    nodeGroup
      .filter((d) => d.size > 12)
      .append('text')
      .attr('dy', (d) => d.size + 12)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xs pointer-events-none')
      .attr('fill', '#475569')
      .text((d) => d.label.length > 20 ? d.label.slice(0, 18) + '...' : d.label);

    // Hover and click handlers with animation - use refs to avoid re-render issues
    nodeGroup
      .on('mouseenter', function (_event, d) {
        const circle = d3.select(this).select('circle');
        circle
          .transition()
          .duration(150)
          .attr('stroke', '#1e293b')
          .attr('stroke-width', 3)
          .attr('r', d.size * 1.15); // Scale up
        onNodeHoverRef.current?.(d);
      })
      .on('mouseleave', function (_event, d) {
        const circle = d3.select(this).select('circle');
        circle
          .transition()
          .duration(150)
          .attr('stroke', '#fff')
          .attr('stroke-width', 2)
          .attr('r', d.size); // Scale back
        onNodeHoverRef.current?.(null);
      })
      .on('click', function (event, d) {
        event.stopPropagation();
        onNodeClickRef.current?.(d);
      });

    // Update positions on tick during initial layout
    simulation.on('tick', () => {
      links.attr('d', linkArc);
      nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Stop simulation completely after it stabilizes
    simulation.on('end', () => {
      // Fix all nodes in place so no more physics
      simNodes.forEach((n) => {
        n.fx = n.x;
        n.fy = n.y;
      });
      console.log('Network layout stabilized - simulation stopped');
    });

    // Initial zoom to fit
    const initialScale = 0.8;
    svg.call(
      zoom.transform,
      d3.zoomIdentity.translate(w * 0.1, h * 0.1).scale(initialScale)
    );

    return () => {
      simulation.stop();
    };
  }, [nodes, edges, dimensions, getNodeOpacity]);

  // Update opacities when filters change
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg
      .selectAll<SVGGElement, SimulationNode>('.node-group')
      .each(function (d) {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(300)
          .attr('opacity', getNodeOpacity(d));
      });
  }, [selectedQuadrant, searchTerm, getNodeOpacity]);

  return (
    <div ref={containerRef} className="network-container w-full">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full bg-slate-50/50 dark:bg-slate-800/30 rounded-xl"
        role="img"
        aria-label={`Career network showing ${nodes.length} roles`}
      />
    </div>
  );
}

// Tooltip component
interface NetworkTooltipProps {
  node: NetworkNode | null;
  x?: number;
  y?: number;
}

export function NetworkTooltip({ node }: NetworkTooltipProps) {
  if (!node) return null;

  return (
    <div className="absolute top-4 right-4 z-50 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 max-w-xs">
      <h4 className="font-semibold text-slate-900 dark:text-white">{node.label}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">SOC: {node.soc}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-slate-500 dark:text-slate-400">Pathway Risk:</span>
          <span className="ml-1 font-medium text-slate-900 dark:text-white">
            {(node.ptr * 100).toFixed(1)}%
          </span>
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400">Net. Constraint:</span>
          <span className="ml-1 font-medium text-slate-900 dark:text-white">
            {(node.nfc * 100).toFixed(1)}%
          </span>
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400">AI Exposure:</span>
          <span className="ml-1 font-medium text-slate-900 dark:text-white">
            {(node.aiExposure * 100).toFixed(1)}%
          </span>
        </div>
        <div>
          <span
            className="inline-block px-1.5 py-0.5 text-xs font-semibold rounded text-white"
            style={{ backgroundColor: quadrantColors[node.quadrant] }}
          >
            {node.quadrant} — {quadrantNames[node.quadrant]}
          </span>
        </div>
      </div>
    </div>
  );
}
