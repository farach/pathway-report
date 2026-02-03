import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StatCard } from '../components/StatCard';
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
          to understand the systemic risks to workforce development.
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
            value={10}
            suffix="%"
            label="PTR-NFC Correlation"
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
            Personal Transition Risk (PTR) and Network Flexibility Constraint (NFC) are
            <strong className="text-blue-600 dark:text-blue-400"> orthogonal dimensions</strong>
            {" "}(r = 0.10), revealing that task-level AI exposure and network-level
            career constraints capture distinct vulnerabilities.
          </p>
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
              <em>which jobs</em> are susceptible to automation—a question of task-level
              exposure. Yet this framing misses a crucial dimension: workers don't simply
              occupy static positions, they move through career networks over time. A role's
              vulnerability depends not only on what tasks it contains, but on where it sits
              within the broader landscape of professional advancement.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
              This analysis applies a framework for understanding <strong>structural
              vulnerability</strong>: the degree to which AI-exposed positions are embedded
              in constrained career pathways. By analyzing over 500,000 validated promotion
              transitions across 20 industry sectors, we map the career networks that workers
              actually navigate—and identify the positions where AI exposure combines with
              limited mobility options to create compounding risk.
            </p>
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
