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
          className="text-center max-w-3xl mx-auto mb-8"
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

        {/* Methodology narrative */}
        <motion.div
          className="prose prose-slate dark:prose-invert max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <p className="leading-relaxed">
            This analysis combines approaches from two literatures that have developed largely
            in parallel: AI labor impact assessment and career mobility network analysis. Our
            approach involves constructing sector-specific career networks from validated
            promotion data, then enriching these networks with AI exposure estimates to
            create a unified vulnerability framework.
          </p>
          <p className="leading-relaxed">
            A key methodological choice is the <strong>within-sector normalization</strong> of
            both PTR and NFC metrics. Rather than applying a single threshold across the entire
            economy, we classify roles relative to their sector peers. A "high PTR" role in
            healthcare is high relative to other healthcare positions, not relative to financial
            analysts. This approach sacrifices some cross-sector comparability in exchange for
            more actionable within-sector insights, a tradeoff we believe is appropriate given
            that career mobility tends to occur within, not across, industry boundaries.
          </p>
          <p className="leading-relaxed">
            Transparency is essential for research of this nature. Below we detail our data
            sources, metric construction procedures, and acknowledged limitations. The complete
            analysis code and data files are available for download, enabling replication and
            extension of this work.
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
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Career Mobility Atlas (CMap)</h4>
                <p className="mt-2">
                  Career transition data comes from the CMap database published in{' '}
                  <em>Nature Scientific Data</em> (2025). The underlying resume corpus comprises{' '}
                  <strong>220 million publicly available CVs</strong> containing 546 million
                  professional experiences across 197 countries. Job titles were standardized
                  using NLP and large language models, reducing 5.2 million raw titles to
                  123,000 unique standardized titles.
                </p>
                <p className="mt-2">
                  <strong>Promotion transitions:</strong> The dataset includes 32,000 human-validated
                  promotions from the United States and United Kingdom, plus 61,000 model-inferred
                  promotions from global contexts. Validation was conducted via Prolific annotators
                  in January 2025.
                </p>
                <p className="mt-2 text-amber-700 dark:text-amber-400">
                  <strong>Important temporal note:</strong> The CMap paper does not specify the exact
                  date range of the underlying resume collection. The career pathways represented
                  reflect historical promotion patterns embedded in these resumes, not real-time
                  labor market flows. Users should interpret the network structure as representing
                  established career trajectories rather than current market conditions.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">AI Exposure: Eloundou et al. (2024)</h4>
                <p className="mt-2">
                  Task-level AI exposure estimates come from Eloundou, Manning, Mishkin, and Rock,
                  "GPTs are GPTs: Labor market impact potential of LLMs," published in{' '}
                  <em>Science</em> (June 2024, Vol. 384, Issue 6702, pp. 1306-1308).
                </p>
                <p className="mt-2">
                  <strong>Methodology:</strong> The authors developed a rubric to evaluate O*NET
                  tasks (using the 2023 O*NET database) for exposure to GPT-4-class capabilities.
                  Annotations combined human expert ratings with GPT-4 classifications, achieving
                  high inter-rater agreement. The framework assesses whether LLMs could help workers
                  complete tasks significantly faster at equivalent quality.
                </p>
                <p className="mt-2">
                  <strong>Key finding:</strong> ~80% of the U.S. workforce could have at least 10%
                  of work tasks affected by LLMs; ~19% may see 50%+ of tasks impacted.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">AI Applicability: Microsoft Research (2025)</h4>
                <p className="mt-2">
                  Complementary AI applicability scores come from Microsoft Research's analysis of
                  actual AI usage patterns, published as "Working with AI: Measuring the Applicability
                  of Generative AI to Occupations" (arXiv:2507.07935, July 2025).
                </p>
                <p className="mt-2">
                  <strong>Data collection period:</strong> January 1, 2024 to September 30, 2024.
                  The dataset comprises <strong>200,000 anonymized conversations</strong> with
                  Microsoft Bing Copilot, classified against O*NET's 332 Intermediate Work Activities (IWAs).
                </p>
                <p className="mt-2">
                  <strong>Score construction:</strong> The AI Applicability Score (0-1) combines
                  three factors: frequency of AI usage for specific work activities, task completion
                  rates, and scope of impact. This measures <em>observed</em> AI assistance rather
                  than theoretical exposure.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Supporting Data</h4>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>
                    <strong>O*NET:</strong> 2023 database providing Standard Occupational Classification
                    (SOC) crosswalks for linking job titles to official occupational definitions.
                  </li>
                  <li>
                    <strong>OEWS:</strong> Bureau of Labor Statistics Occupational Employment and
                    Wage Statistics (2024) for employment counts and wage validation.
                  </li>
                </ul>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Metric Construction"
            icon={Calculator}
            isOpen={openSection === 'metrics'}
            onToggle={() => toggleSection('metrics')}
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">AI Pathway Risk (PTR)</h4>
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
                <h4 className="font-semibold">Career Network Constraint (NFC)</h4>
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
                <strong>Temporal mismatch:</strong> The career network data (CMap) reflects
                historical promotion patterns from resumes collected prior to 2025, while
                AI exposure estimates reflect 2023-2024 capability assessments. Career
                pathways may have already shifted in response to AI adoption in ways not
                captured here. This analysis identifies structural vulnerability based on
                pre-AI career patterns meeting current AI capabilities.
              </p>
              <p>
                <strong>Sample coverage:</strong> CMap data derives from publicly available
                online resumes, which overrepresent white-collar professional careers and
                underrepresent trades, manual labor, gig economy, and workers who do not
                maintain public professional profiles. Healthcare and manufacturing floor
                roles may be particularly underrepresented.
              </p>
              <p>
                <strong>AI exposure measurement:</strong> Eloundou et al. assess theoretical
                task-level exposure to GPT-4 capabilities, while Microsoft scores measure
                observed Copilot usage patterns. Neither captures actual workplace adoption
                rates, employer decisions, or regulatory constraints that affect real-world
                AI deployment.
              </p>
              <p>
                <strong>Geographic scope:</strong> Validated promotions come primarily from
                US and UK labor markets. Career pathways in other countries may differ
                substantially due to different credentialing systems, labor regulations,
                and industry structures.
              </p>
              <p>
                <strong>Sector boundaries:</strong> Some roles span multiple sectors;
                sector assignment reflects primary classification in CMap. Cross-sector
                mobility is not captured in this analysis.
              </p>
              <p>
                <strong>Correlation ≠ causation:</strong> High PTR/NFC indicates structural
                vulnerability based on network position and AI exposure metrics. This does
                not predict individual outcomes, which depend on worker adaptability,
                employer decisions, policy interventions, and technology adoption timelines.
              </p>
              <p>
                <strong>Network visualization:</strong> The interactive network uses
                representative edges based on promotion data. Due to data density, not all
                validated transitions may be displayed for sectors with very large networks.
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
              href={`${import.meta.env.BASE_URL}data/roles.json`}
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
              href={`${import.meta.env.BASE_URL}data/sectors.json`}
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
                href="https://github.com/farach/pathway-report"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub Repository
              </a>
              <a
                href="https://farach.github.io/cmapr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                CMap R Package
              </a>
            </div>
          </div>
        </motion.div>

        {/* References */}
        <motion.div
          className="max-w-3xl mx-auto mt-8 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
            Key References
          </h4>
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              <strong>Career Mobility Data:</strong> CMap: a database for mapping job titles,
              sector specialization, and promotions across 24 sectors. <em>Nature Scientific Data</em> (2025).{' '}
              <a
                href="https://www.nature.com/articles/s41597-025-05526-3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                doi:10.1038/s41597-025-05526-3
              </a>
            </p>
            <p>
              <strong>AI Exposure (Task-level):</strong> Eloundou T, Manning S, Mishkin P, Rock D.
              GPTs are GPTs: Labor market impact potential of LLMs. <em>Science</em>. 2024 Jun 21;
              384(6702):1306-1308.{' '}
              <a
                href="https://www.science.org/doi/10.1126/science.adj0998"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                doi:10.1126/science.adj0998
              </a>
            </p>
            <p>
              <strong>AI Applicability (Usage-based):</strong> Working with AI: Measuring the
              Applicability of Generative AI to Occupations. Microsoft Research (2025).{' '}
              <a
                href="https://arxiv.org/abs/2507.07935"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                arXiv:2507.07935
              </a>
            </p>
          </div>

          <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-6 mb-2">
            Cite This Report
          </h4>
          <code className="block text-xs text-slate-600 dark:text-slate-300 font-mono bg-white dark:bg-slate-700 p-3 rounded">
            Farach, A. (2026). Structural Vulnerability in AI Career Pathways:
            A Network Analysis of Promotion Constraints. Working Paper.
          </code>
        </motion.div>
      </div>
    </section>
  );
}
