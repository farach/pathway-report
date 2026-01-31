import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, ExternalLink, Database, Calculator, Network, AlertTriangle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../lib/utils';

interface AccordionItemProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, icon: Icon, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-slate-900 dark:text-white">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-slate-400 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2 prose prose-slate dark:prose-invert max-w-none text-sm">
          {children}
        </div>
      )}
    </div>
  );
}

export function Methodology() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const [openSection, setOpenSection] = useState<string | null>('data');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section
      id="methodology"
      ref={sectionRef}
      className="section-padding bg-slate-50 dark:bg-slate-950"
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white">
            Methodology & Data
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Technical details on data sources, metric construction, and validation.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AccordionItem
            title="Data Sources"
            icon={Database}
            isOpen={openSection === 'data'}
            onToggle={() => toggleSection('data')}
          >
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong>Career Mobility (CMap):</strong> ~500K validated promotion edges from
                resume data, covering 15,759 unique job titles across 20 sectors.
              </li>
              <li>
                <strong>AI Exposure:</strong> Two independent measures—Eloundou et al. (2023)
                task-level scores and Microsoft Research occupational estimates.
              </li>
              <li>
                <strong>O*NET:</strong> Standard Occupational Classification (SOC) crosswalks
                for linking job titles to official occupational definitions.
              </li>
              <li>
                <strong>OEWS:</strong> Bureau of Labor Statistics wage and employment data
                for validation purposes.
              </li>
            </ul>
          </AccordionItem>

          <AccordionItem
            title="Metric Construction"
            icon={Calculator}
            isOpen={openSection === 'metrics'}
            onToggle={() => toggleSection('metrics')}
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Personal Transition Risk (PTR)</h4>
                <p>
                  Combines AI exposure with "lack of alternatives" (1 - normalized out-degree).
                  Higher values indicate roles that are both AI-exposed and have few
                  promotion pathways leading away.
                </p>
                <code className="block mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded text-xs">
                  PTR = AI_Exposure × (1 - out_degree / max_out_degree)
                </code>
              </div>
              <div>
                <h4 className="font-semibold">Network Flexibility Constraint (NFC)</h4>
                <p>
                  Captures neighborhood-level constraints: average PTR of neighboring roles
                  weighted by local clustering. High NFC indicates being surrounded by
                  other constrained positions.
                </p>
                <code className="block mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded text-xs">
                  NFC = avg_neighbor_PTR × neighborhood_density
                </code>
              </div>
              <div>
                <h4 className="font-semibold">Quadrant Assignment</h4>
                <p>
                  Roles are assigned to quadrants based on sector-specific median splits
                  of PTR and NFC, producing four categories: HH, HL, LH, LL.
                </p>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Network Analysis"
            icon={Network}
            isOpen={openSection === 'network'}
            onToggle={() => toggleSection('network')}
          >
            <div className="space-y-4">
              <p>
                Career networks are constructed per-sector from validated promotion edges.
                Key network metrics include:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>Betweenness centrality:</strong> Identifies "chokepoint" roles
                  that many career paths flow through.
                </li>
                <li>
                  <strong>Out-degree:</strong> Number of promotion pathways leading away
                  from a role.
                </li>
                <li>
                  <strong>Local clustering:</strong> Density of connections among a role's
                  immediate neighbors.
                </li>
              </ul>
              <p>
                Network visualization uses force-directed layout with node sizes proportional
                to betweenness centrality.
              </p>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Limitations"
            icon={AlertTriangle}
            isOpen={openSection === 'limitations'}
            onToggle={() => toggleSection('limitations')}
          >
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                <strong>Sample coverage:</strong> CMap data captures primarily white-collar
                career paths; trades and gig economy are underrepresented.
              </p>
              <p>
                <strong>Temporal lag:</strong> AI exposure estimates are based on current
                capabilities; actual adoption timelines vary significantly.
              </p>
              <p>
                <strong>Sector boundaries:</strong> Some roles span multiple sectors;
                sector assignment reflects primary classification.
              </p>
              <p>
                <strong>Synthetic edges:</strong> The network visualization uses
                synthetic edges for demonstration; actual analysis uses validated
                promotion data.
              </p>
              <p>
                <strong>Correlation ≠ causation:</strong> High PTR/NFC indicates
                structural vulnerability, not deterministic outcomes.
              </p>
            </div>
          </AccordionItem>
        </motion.div>

        {/* Download section */}
        <motion.div
          className="max-w-3xl mx-auto mt-12 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Downloads & Resources
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="/data/roles.json"
              download
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-medium text-slate-900 dark:text-white">Role Data (JSON)</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  15,759 roles with PTR/NFC metrics
                </div>
              </div>
            </a>
            <a
              href="/data/sectors.json"
              download
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-medium text-slate-900 dark:text-white">
                  Sector Summary (JSON)
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  20 sectors with aggregate stats
                </div>
              </div>
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              Related Links
            </h4>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/farach/ai-labor-networks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub Repository
              </a>
              <a
                href="https://cmap.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                CMap Dataset
              </a>
            </div>
          </div>
        </motion.div>

        {/* Citation */}
        <motion.div
          className="max-w-3xl mx-auto mt-8 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
            Citation
          </h4>
          <code className="block text-xs text-slate-600 dark:text-slate-300 font-mono">
            Farach, A. (2026). Structural Vulnerability in AI Career Pathways:
            A Network Analysis of Promotion Constraints. Working Paper.
          </code>
        </motion.div>
      </div>
    </section>
  );
}
