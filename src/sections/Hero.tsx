import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ExpandableDetail } from '../components/ExpandableDetail';
import { DISPLAY_STATS } from '../data/types';

export function Hero() {
  const scrollToContent = () => {
    document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/20 -z-10" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl -z-10" />

      <div className="section-container max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 rounded-full">
            Interactive Research Report
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-slate-900 dark:text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Structural Vulnerability in
          <span className="gradient-text block mt-2">AI Career Pathways</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Mapping how AI-exposed positions sit within career mobility networks
          to identify potential structural risks to workforce development.
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <StatCard
            value={DISPLAY_STATS.totalRoles}
            label="Roles Analyzed"
          />
          <StatCard
            value={DISPLAY_STATS.totalSectors}
            label="Sectors"
          />
          <StatCard
            value={500}
            suffix="K+"
            label="Career Transitions Analyzed"
          />
        </motion.div>

        {/* Key Insight */}
        <motion.div
          className="mt-12 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Key Finding
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            The two types of risk we measure, <strong className="text-blue-600 dark:text-blue-400">AI Pathway Risk</strong> and{' '}
            <strong className="text-blue-600 dark:text-blue-400">Career Network Constraint</strong>, appear
            to be largely independent of each other in our data. Knowing that a role is exposed to AI tells you almost
            nothing about whether the worker has good career options, and vice versa. This means we
            need to measure both to understand the full picture.
          </p>
          <ExpandableDetail summary="Show technical detail">
            <p>
              Formally, AI Pathway Risk (PTR) and Career Network Constraint (NFC) correlate at only
              r ≈ 0.10 across 15,759 roles. This near-orthogonality indicates they capture genuinely
              distinct vulnerability dimensions. This independence justifies treating them as
              complementary axes in a two-dimensional vulnerability space.
            </p>
          </ExpandableDetail>
        </motion.div>

        {/* Research Context */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="prose prose-slate dark:prose-invert">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              The debate over AI's labor market impact has largely focused on{" "}
              <em>which jobs</em> are susceptible to automation, a question of task-level
              exposure. Yet this framing may miss an important dimension: workers don't simply
              occupy static positions. They move through <strong>career networks</strong>,
              the web of promotion pathways that connect one role to another, over time.
              A role's vulnerability depends not only on what tasks it contains, but on where
              it sits within the broader landscape of professional advancement.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
              This analysis applies a framework for characterizing <strong>structural
              vulnerability</strong>: the degree to which AI-exposed positions are embedded
              in constrained career pathways. By analyzing over 500,000 validated promotion
              transitions across 20 industry sectors, we map the career networks that workers
              actually navigate and identify positions where AI exposure coincides with
              limited mobility options.
            </p>
          </div>
        </motion.div>

        {/* Key Terms Glossary */}
        <motion.div
          className="mt-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Career Network
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A map of how workers actually move between jobs within a sector, built from real
                promotion data. Each job is a node; each observed promotion is a connection.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Promotion Transitions
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Documented cases where a person moved from one job to another as a promotion,
                extracted from resume data. Our analysis uses over 500,000 of these across 20 sectors.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Structural Vulnerability
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The idea that a job's risk from AI depends not just on whether AI can do its tasks,
                but on whether the worker has viable options to move elsewhere if disrupted.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
