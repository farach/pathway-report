import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { QuadrantDiagram, QuadrantLegend } from '../components/QuadrantLegend';

export function Framework() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section
      id="framework"
      ref={sectionRef}
      className="section-padding bg-white dark:bg-slate-900"
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white">
            The PTR-NFC Framework
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Two complementary dimensions for understanding AI's structural impact on careers.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Definitions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* PTR */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200/50 dark:border-orange-800/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500" />
                  Personal Transition Risk (PTR)
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  <strong>The "inner loop"</strong> — measures how AI-exposed a role's tasks
                  are and how few promotion pathways lead away from it.
                </p>
                <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-mono bg-white/50 dark:bg-slate-800/50 p-2 rounded">
                  PTR = AI Exposure × Lack of Alternatives
                </div>
              </div>

              {/* NFC */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200/50 dark:border-purple-800/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  Network Flexibility Constraint (NFC)
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  <strong>The "outer loop"</strong> — captures whether a role's neighbors in
                  the career network are themselves constrained.
                </p>
                <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-mono bg-white/50 dark:bg-slate-800/50 p-2 rounded">
                  NFC = Avg. Neighbor PTR × Neighborhood Density
                </div>
              </div>

              {/* Insight */}
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/50">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Key Insight:</strong> PTR and NFC are nearly orthogonal (r ≈ 0.10),
                  meaning high task-level exposure doesn't necessarily imply constrained
                  career mobility—and vice versa.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Quadrant Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <QuadrantDiagram className="w-full max-w-sm mb-8" />

            <div className="w-full max-w-md mt-8">
              <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4 text-center">
                Vulnerability Categories
              </h4>
              <QuadrantLegend orientation="vertical" showDescriptions />
            </div>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div
          className="mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-850 border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">HH</div>
              <div className="mt-1 text-slate-600 dark:text-slate-300 font-medium">
                Double Jeopardy
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Roles with both high AI exposure AND constrained network mobility.
                Priority targets for intervention.
              </p>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">HL</div>
              <div className="mt-1 text-slate-600 dark:text-slate-300 font-medium">
                Exposed but Mobile
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                High personal risk, but career network offers escape routes.
                Skill-building opportunities exist.
              </p>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">LH</div>
              <div className="mt-1 text-slate-600 dark:text-slate-300 font-medium">
                Network Trapped
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Low current exposure, but neighboring roles are constrained.
                Future mobility concerns.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
