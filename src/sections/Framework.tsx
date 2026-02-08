import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { QuadrantDiagram, QuadrantLegend } from '../components/QuadrantLegend';
import { ExpandableDetail } from '../components/ExpandableDetail';

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
            The Vulnerability Framework
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            This analysis measures two things about each job role: (1) how directly AI threatens the
            role's tasks <em>and</em> how few promotion options the worker
            has (<strong>AI Pathway Risk</strong>) and (2) whether the role serves as an
            important bridge in career pathways that many workers depend
            on (<strong>Career Network Constraint</strong>). Together, these two
            independent measures create four vulnerability profiles.
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
            While valuable, this task-centric view may miss an important dimension of workforce
            vulnerability: the <em>outer loop</em> of career mobility.
          </p>
          <p className="leading-relaxed">
            Consider two workers with identical AI exposure scores. One occupies a position
            with multiple promotion pathways leading to diverse, less-exposed roles. The other
            sits in a career cul-de-sac, surrounded by equally vulnerable positions. These
            workers face meaningfully different prospects, yet traditional AI exposure metrics
            would classify them identically.
          </p>
          <p className="leading-relaxed">
            Our vulnerability framework addresses this gap by combining task-level AI applicability
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
                  AI Pathway Risk (PTR)
                </h3>
                <p className="mt-1 text-sm italic text-slate-500 dark:text-slate-400">
                  How exposed is this role to AI, and how few escape routes does it have?
                </p>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  AI Pathway Risk captures how vulnerable a role is by combining two factors:
                  the proportion of the role's tasks that AI can automate, and whether the
                  worker has good promotion options to move elsewhere. A role with high AI
                  exposure but many outbound promotion pathways has lower risk than one with
                  fewer escape routes. Mobility options provide a buffer against disruption.
                </p>
                <ExpandableDetail summary="Show formula and data sources">
                  <p>
                    PTR draws on Eloundou et al.'s GPT-4 exposure estimates and Microsoft
                    Research's occupational AI applicability scores for task-level exposure,
                    combined with the inverse of a role's out-degree in the promotion network
                    (lack of alternatives).
                  </p>
                  <div className="mt-2 font-mono bg-white/50 dark:bg-slate-800/50 p-2 rounded text-xs">
                    PTR = AI_Exposure × (1 − OutDegree / MaxOutDegree)
                  </div>
                </ExpandableDetail>
              </div>

              {/* NFC */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200/50 dark:border-purple-800/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  Career Network Constraint (NFC)
                </h3>
                <p className="mt-1 text-sm italic text-slate-500 dark:text-slate-400">
                  Is this AI-exposed role a bridge that many career paths depend on?
                </p>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  Career Network Constraint identifies roles that are both AI-exposed and
                  structurally important connectors in the career network. Some roles serve as
                  bridges between clusters of positions, meaning many workers' career paths
                  flow through them. When these bridge roles are also highly exposed to AI,
                  their disruption could limit career mobility for workers on either side,
                  including those who themselves face no direct AI threat.
                </p>
                <ExpandableDetail summary="Show formula and technical detail">
                  <p>
                    NFC combines a role's AI exposure rank with its betweenness centrality
                    rank in the sector-specific career network. Betweenness centrality measures
                    how many shortest paths between other roles pass through a given role,
                    identifying it as a bridge or chokepoint. The geometric mean ensures a
                    role must score high on both dimensions to register as highly constrained.
                  </p>
                  <div className="mt-2 font-mono bg-white/50 dark:bg-slate-800/50 p-2 rounded text-xs">
                    NFC = sqrt(Rank(AI_Exposure) × Rank(Betweenness))
                  </div>
                </ExpandableDetail>
              </div>

              {/* Independence insight */}
              <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/50">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  A Surprising Independence
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  These two metrics turn out to be largely independent of each other, and
                  the reason is structural: dead-end roles and bridge roles are
                  structurally distinct positions in a career network. A role with few outgoing connections
                  (high PTR) cannot, by definition, be a bridge that many career paths flow
                  through (high NFC). Consider a senior technical writer with limited
                  promotion options versus a project manager who connects multiple departments.
                  Both may face AI exposure, but they occupy completely different structural
                  positions. A single vulnerability score cannot capture both.
                </p>
                <ExpandableDetail summary="Show technical detail" className="mt-2 bg-blue-100/50 dark:bg-blue-900/30 border-blue-200/50 dark:border-blue-700/50">
                  <p>
                    AI Pathway Risk and Career Network Constraint correlate at only r ≈ 0.10
                    across our sample of 15,759 roles. This near-orthogonality is not a
                    statistical accident but a structural consequence of how career networks
                    work: roles penalized for lacking outbound connections (high PTR) have
                    near-zero betweenness centrality by construction, while bridge roles
                    (high NFC) necessarily have multiple connections. The two metrics capture
                    genuinely distinct dimensions of vulnerability.
                  </p>
                </ExpandableDetail>
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
            The intersection of AI Pathway Risk and Career Network Constraint creates four
            distinct vulnerability profiles, each with different implications for workforce
            policy and individual career strategy:
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
              These roles face compounding risk in our framework: high direct AI exposure
              combined with constrained escape routes. Workers here may not be able to
              simply "skill up" into adjacent positions if those positions are similarly
              vulnerable. This quadrant may warrant targeted intervention: retraining
              programs, credential pathways, or new career ladders.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">HL</div>
            <div className="mt-1 text-slate-900 dark:text-white font-semibold">
              Exposed but Mobile
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              High personal AI exposure, but the career network appears to provide viable
              alternatives. These workers may have options; the challenge is awareness and
              timing. Early intervention could facilitate transitions before displacement
              occurs. This is the quadrant where traditional upskilling programs seem most
              likely to be effective.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">LH</div>
            <div className="mt-1 text-slate-900 dark:text-white font-semibold">
              Network Trapped
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Currently safe from direct AI impact, but surrounded by constrained positions.
              These workers may feel secure today, but their future mobility could be compromised.
              If AI capabilities expand into adjacent areas, they could find themselves stuck with
              limited options. Proactive career diversification may be advisable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">LL</div>
            <div className="mt-1 text-slate-900 dark:text-white font-semibold">
              Structurally Resilient
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Low AI exposure and high network flexibility. These roles occupy favorable
              positions in the career landscape: not only are they currently insulated from
              automation, but their observed promotion pathways lead to similarly resilient positions.
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
            Roles are assigned to quadrants based on sector-specific median splits of AI
            Pathway Risk and Career Network Constraint. This within-sector normalization
            ensures that "high" and "low" are interpreted relative to the relevant labor
            market context. A financial analyst's
            vulnerability is compared to other finance roles, not to healthcare workers with
            very different career structures. This approach sacrifices some
            cross-sector comparability in exchange for more meaningful within-sector insights.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
