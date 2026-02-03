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
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white">
            The PTR-NFC Framework
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            A two-dimensional approach to understanding structural vulnerability in career networks
          </p>
        </motion.div>

        {/* Research context prose */}
        <motion.div
          className="prose prose-slate dark:prose-invert max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-lg leading-relaxed">
            Most analyses of AI's labor market impact focus on what might be called the <em>inner loop</em>:
            the degree to which specific job tasks can be automated or augmented by AI systems.
            While valuable, this task-centric view misses a critical dimension of workforce
            vulnerability—the <em>outer loop</em> of career mobility.
          </p>
          <p className="leading-relaxed">
            Consider two workers with identical AI exposure scores. One occupies a position
            with multiple promotion pathways leading to diverse, less-exposed roles. The other
            sits in a career cul-de-sac, surrounded by equally vulnerable positions. These
            workers face fundamentally different prospects, yet traditional AI exposure metrics
            would classify them identically.
          </p>
          <p className="leading-relaxed">
            The PTR-NFC framework addresses this gap by combining task-level AI applicability
            with network-level career mobility constraints. Drawing on validated promotion data
            from over 500,000 career transitions, we construct sector-specific career networks
            and compute two complementary indices that together characterize a role's structural
            vulnerability to AI-driven labor market changes.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
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
                  PTR captures an individual role's direct vulnerability by combining two factors:
                  the proportion of the role's tasks susceptible to AI automation (drawing on
                  Eloundou et al.'s GPT-4 exposure estimates and Microsoft Research's occupational
                  AI applicability scores), and the role's <em>lack of alternatives</em>—the
                  inverse of its out-degree in the promotion network.
                </p>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  A role with high AI exposure but many outbound promotion pathways has lower PTR
                  than one with fewer escape routes. This reflects the intuition that mobility
                  options provide a buffer against task-level disruption.
                </p>
                <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-mono bg-white/50 dark:bg-slate-800/50 p-3 rounded">
                  PTR = AI_Exposure × (1 − OutDegree / MaxOutDegree)
                </div>
              </div>

              {/* NFC */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200/50 dark:border-purple-800/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  Network Flexibility Constraint (NFC)
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  NFC extends the analysis beyond individual roles to their network neighborhood.
                  It measures whether a role's potential destination positions are themselves
                  constrained, capturing the phenomenon of being surrounded by vulnerability.
                </p>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  The metric combines the average PTR of neighboring roles (weighted by edge
                  frequency) with local network density. High NFC indicates that even if a
                  worker can transition out of their current role, they may find themselves
                  in an equally precarious position—a form of structural entrapment.
                </p>
                <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-mono bg-white/50 dark:bg-slate-800/50 p-3 rounded">
                  NFC = AvgNeighborPTR × LocalClusteringCoefficient
                </div>
              </div>

              {/* Orthogonality insight */}
              <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/50">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  The Orthogonality Finding
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  A notable empirical result: PTR and NFC correlate at only r ≈ 0.10 across
                  our sample of 15,759 roles. This near-orthogonality means the two metrics
                  capture genuinely distinct dimensions of vulnerability. High task-level AI
                  exposure does not mechanically imply constrained career mobility, nor does
                  network entrapment require current AI susceptibility. This independence
                  justifies treating them as complementary axes in a two-dimensional
                  vulnerability space.
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

            <div className="w-full max-w-md mt-4">
              <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4 text-center">
                Vulnerability Categories
              </h4>
              <QuadrantLegend orientation="vertical" showDescriptions />
            </div>
          </motion.div>
        </div>

        {/* Quadrant interpretation prose */}
        <motion.div
          className="mt-16 prose prose-slate dark:prose-invert max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Interpreting the Quadrants</h3>
          <p>
            The intersection of PTR and NFC creates four distinct vulnerability profiles,
            each with different implications for workforce policy and individual career strategy:
          </p>
        </motion.div>

        {/* Bottom callout - quadrant details */}
        <motion.div
          className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">HH</div>
            <div className="mt-1 text-slate-900 dark:text-white font-semibold">
              Double Jeopardy
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              These roles face compounding risk: high direct AI exposure combined with
              constrained escape routes. Workers here cannot simply "skill up" into adjacent
              positions because those positions are similarly vulnerable. This quadrant
              demands systemic intervention—retraining programs, credential pathways, and
              potentially new career ladders that don't currently exist.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">HL</div>
            <div className="mt-1 text-slate-900 dark:text-white font-semibold">
              Exposed but Mobile
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              High personal AI exposure, but the career network provides viable alternatives.
              These workers have options—the challenge is awareness and timing. Early
              intervention can facilitate transitions before displacement occurs. This is
              the quadrant where traditional upskilling programs are most likely to succeed.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">LH</div>
            <div className="mt-1 text-slate-900 dark:text-white font-semibold">
              Network Trapped
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Currently safe from direct AI impact, but surrounded by constrained positions.
              These workers may feel secure today, but their future mobility is compromised.
              As AI capabilities expand, they risk finding themselves stuck with nowhere to
              go. Proactive career diversification is advisable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">LL</div>
            <div className="mt-1 text-slate-900 dark:text-white font-semibold">
              Structurally Resilient
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Low AI exposure and high network flexibility. These roles occupy favorable
              positions in the career landscape—not only are they currently insulated from
              automation, but their promotion pathways lead to similarly resilient positions.
              This is the benchmark against which vulnerability should be assessed.
            </p>
          </div>
        </motion.div>

        {/* Methodological note */}
        <motion.div
          className="mt-12 p-6 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
            A Note on Quadrant Assignment
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Roles are assigned to quadrants based on sector-specific median splits of PTR
            and NFC. This within-sector normalization ensures that "high" and "low" are
            interpreted relative to the relevant labor market context. A financial analyst's
            vulnerability is compared to other finance roles, not to healthcare workers with
            fundamentally different career structures. This approach sacrifices some
            cross-sector comparability in exchange for more meaningful within-sector insights.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
