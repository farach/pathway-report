import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, GitBranch, Target } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCascadeResults, useStats } from '../hooks/useNetworkData';
import { cn, formatPercent } from '../lib/utils';

const findings = [
  {
    icon: GitBranch,
    title: 'Orthogonal Dimensions',
    description:
      'PTR and NFC are nearly independent (r ≈ 0.10), meaning task-level AI exposure and network-level career constraints capture fundamentally different vulnerabilities.',
    color: 'blue',
    stat: 'r = 0.10',
    statLabel: 'Correlation',
  },
  {
    icon: AlertTriangle,
    title: 'Double Jeopardy Roles',
    description:
      'High-High (HH) quadrant roles face compounding risk: they are both directly exposed to AI automation AND surrounded by other constrained roles in their career network.',
    color: 'red',
    stat: '40%+',
    statLabel: 'HH Share',
  },
  {
    icon: Target,
    title: 'Cascade Validation',
    description:
      'Removing top PTR roles fragments the career network 3x more than random removal, confirming that high-PTR positions are structurally critical chokepoints.',
    color: 'orange',
    stat: '3×',
    statLabel: 'Fragmentation',
  },
  {
    icon: TrendingUp,
    title: 'Sector Variation',
    description:
      'HH role concentration varies dramatically across sectors—from 35% in Non-Profit to 45% in Manufacturing—suggesting sector-specific intervention strategies.',
    color: 'purple',
    stat: '35-45%',
    statLabel: 'Range',
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
  },
};

export function Findings() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { results: cascadeResults } = useCascadeResults();
  const { stats } = useStats();

  return (
    <section
      id="findings"
      ref={sectionRef}
      className="section-padding bg-slate-50 dark:bg-slate-950"
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
            Key Research Findings
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Four critical insights from analyzing {stats?.totalRoles.toLocaleString() || '15,759'} roles
            across {stats?.totalSectors || 20} sectors.
          </p>
        </motion.div>

        {/* Research findings narrative */}
        <motion.div
          className="prose prose-slate dark:prose-invert max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="leading-relaxed">
            Our analysis yields four principal findings about how AI exposure intersects with
            career network structure. These results suggest that traditional policy
            approaches—which focus exclusively on task-level exposure—miss a substantial
            portion of structural vulnerability in the labor market.
          </p>
          <p className="leading-relaxed">
            A central finding is the <strong>near-orthogonality</strong> of our two
            vulnerability dimensions. The near-zero correlation between PTR and NFC means that
            knowing a worker's direct AI exposure tells us almost nothing about their career
            mobility constraints, and vice versa. This independence implies that single-metric
            approaches to identifying "at-risk" workers will systematically overlook roughly
            half of the vulnerability landscape. Policy interventions must account for both
            dimensions simultaneously.
          </p>
          <p className="leading-relaxed">
            The <strong>cascade validation</strong> results provide clear evidence that high-PTR
            roles occupy structurally important positions. When we simulate removing high-PTR roles from the career
            network—a rough proxy for what would happen if AI displaced workers in these
            positions—the network fragments at three times the rate of random removal. This
            confirms that high-PTR positions aren't just individually vulnerable; they serve
            as critical connectors in the career mobility infrastructure. Their disruption
            would ripple through adjacent positions, potentially stranding workers who themselves
            face no direct AI exposure.
          </p>
        </motion.div>

        {/* Findings grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {findings.map((finding, index) => {
            const colors = colorClasses[finding.color as keyof typeof colorClasses];
            const Icon = finding.icon;

            return (
              <motion.div
                key={finding.title}
                className={cn(
                  'p-6 rounded-2xl border-2 transition-shadow hover:shadow-lg',
                  colors.bg,
                  colors.border
                )}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <div className="flex items-start gap-4">
                  <div className={cn('p-3 rounded-xl', colors.bg)}>
                    <Icon className={cn('w-6 h-6', colors.text)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {finding.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                      {finding.description}
                    </p>
                  </div>
                </div>

                {/* Stat badge */}
                <div className="mt-4 flex items-center justify-end gap-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {finding.statLabel}:
                  </span>
                  <span className={cn('text-lg font-bold', colors.text)}>{finding.stat}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cascade validation chart placeholder */}
        {cascadeResults.length > 0 && (
          <motion.div
            className="mt-12 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Cascade Validation Results
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Network fragmentation after removing top roles by different strategies:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cascadeResults.map((result) => (
                <div
                  key={result.strategy}
                  className={cn(
                    'p-4 rounded-xl text-center',
                    result.strategy === 'Top PTR'
                      ? 'bg-orange-100 dark:bg-orange-900/30'
                      : result.strategy === 'Top NFC'
                      ? 'bg-purple-100 dark:bg-purple-900/30'
                      : 'bg-slate-100 dark:bg-slate-700/50'
                  )}
                >
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {result.components_after}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {result.strategy}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    +{formatPercent(result.fragmentation_increase)} fragmentation
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
