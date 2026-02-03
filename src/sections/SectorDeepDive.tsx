import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { useSectors } from '../hooks/useNetworkData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn, formatPercent } from '../lib/utils';
import type { SectorSummary } from '../data/types';

type SortKey = 'sector' | 'total_roles' | 'hh_share' | 'avg_ptr' | 'avg_nfc' | 'avg_ai_exposure';
type SortDirection = 'asc' | 'desc';

export function SectorDeepDive() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { sectors, loading } = useSectors();
  const [sortKey, setSortKey] = useState<SortKey>('hh_share');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedSector, setExpandedSector] = useState<string | null>(null);

  const sortedSectors = useMemo(() => {
    return [...sectors].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [sectors, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const SortButton = ({ column, label }: { column: SortKey; label: string }) => (
    <button
      type="button"
      onClick={() => handleSort(column)}
      className={cn(
        'flex items-center gap-1 text-xs font-medium uppercase tracking-wide',
        sortKey === column
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
      )}
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  return (
    <section
      id="sectors"
      ref={sectionRef}
      className="section-padding bg-white dark:bg-slate-900"
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
            Sector Comparison
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Vulnerability metrics vary significantly across sectors, suggesting the need for
            targeted intervention strategies.
          </p>
        </motion.div>

        {/* Sector narrative prose */}
        <motion.div
          className="prose prose-slate dark:prose-invert max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <p className="leading-relaxed">
            One of the clearest patterns from this analysis is the <strong>substantial heterogeneity</strong>{" "}
            across industry sectors. The proportion of "double jeopardy" (HH) roles—those facing both
            high AI exposure and constrained career mobility—ranges from roughly 35% in some sectors
            to over 45% in others. This 10+ percentage point spread represents meaningful variation
            that should inform sector-specific workforce development strategies.
          </p>
          <p className="leading-relaxed">
            The table below is sorted by HH share by default, highlighting the sectors with the
            highest concentrations of structurally vulnerable positions. However, raw HH percentage
            is not the only relevant dimension. A sector with moderate HH share but extremely high
            average PTR may face different challenges than one with high HH share but lower typical
            exposure. Click any row to see additional detail on the role composition within each sector.
          </p>
          <p className="leading-relaxed">
            <strong>Policy implication:</strong> Workforce interventions should not apply uniformly
            across industries. Sectors with high HH concentration may require systematic career pathway
            redesign, while those with high PTR but low NFC may benefit more from traditional upskilling
            programs that help workers leverage existing mobility options.
          </p>
        </motion.div>

        {/* Top 3 highlight cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {sortedSectors.slice(0, 3).map((sector, index) => (
            <HighlightCard
              key={sector.sector}
              sector={sector}
              rank={index + 1}
            />
          ))}
        </motion.div>

        {/* Full table */}
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 text-left">
                  <SortButton column="sector" label="Sector" />
                </th>
                <th className="py-3 px-4 text-right">
                  <SortButton column="total_roles" label="Roles" />
                </th>
                <th className="py-3 px-4 text-right">
                  <SortButton column="hh_share" label="HH %" />
                </th>
                <th className="py-3 px-4 text-right hidden md:table-cell">
                  <SortButton column="avg_ptr" label="Avg PTR" />
                </th>
                <th className="py-3 px-4 text-right hidden md:table-cell">
                  <SortButton column="avg_nfc" label="Avg NFC" />
                </th>
                <th className="py-3 px-4 text-right hidden lg:table-cell">
                  <SortButton column="avg_ai_exposure" label="AI Exp" />
                </th>
                <th className="py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    Loading sectors...
                  </td>
                </tr>
              ) : (
                sortedSectors.map((sector) => (
                  <SectorRow
                    key={sector.sector}
                    sector={sector}
                    isExpanded={expandedSector === sector.sector}
                    onToggle={() =>
                      setExpandedSector(
                        expandedSector === sector.sector ? null : sector.sector
                      )
                    }
                    maxHHShare={Math.max(...sectors.map((s) => s.hh_share))}
                  />
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

function HighlightCard({
  sector,
  rank,
}: {
  sector: SectorSummary;
  rank: number;
}) {
  const rankColors = {
    1: 'from-red-500 to-orange-500',
    2: 'from-orange-500 to-yellow-500',
    3: 'from-yellow-500 to-amber-500',
  };

  return (
    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Rank badge */}
      <div
        className={cn(
          'absolute top-0 right-0 w-16 h-16 flex items-start justify-end',
          'bg-gradient-to-bl rounded-bl-3xl',
          rankColors[rank as keyof typeof rankColors]
        )}
      >
        <span className="text-white font-bold text-lg mr-3 mt-1">#{rank}</span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white pr-12">
        {sector.sector}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {formatPercent(sector.hh_share)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">HH Share</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {sector.total_roles.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Roles</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
            style={{ width: `${sector.hh_share * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function SectorRow({
  sector,
  isExpanded,
  onToggle,
  maxHHShare,
}: {
  sector: SectorSummary;
  isExpanded: boolean;
  onToggle: () => void;
  maxHHShare: number;
}) {
  return (
    <>
      <tr
        className={cn(
          'border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors',
          isExpanded && 'bg-slate-50 dark:bg-slate-800/50'
        )}
        onClick={onToggle}
      >
        <td className="py-4 px-4">
          <span className="font-medium text-slate-900 dark:text-white">{sector.sector}</span>
        </td>
        <td className="py-4 px-4 text-right text-slate-600 dark:text-slate-300">
          {sector.total_roles.toLocaleString()}
        </td>
        <td className="py-4 px-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${(sector.hh_share / maxHHShare) * 100}%` }}
              />
            </div>
            <span className="font-medium text-red-600 dark:text-red-400 w-12 text-right">
              {formatPercent(sector.hh_share)}
            </span>
          </div>
        </td>
        <td className="py-4 px-4 text-right text-slate-600 dark:text-slate-300 hidden md:table-cell">
          {formatPercent(sector.avg_ptr)}
        </td>
        <td className="py-4 px-4 text-right text-slate-600 dark:text-slate-300 hidden md:table-cell">
          {formatPercent(sector.avg_nfc)}
        </td>
        <td className="py-4 px-4 text-right text-slate-600 dark:text-slate-300 hidden lg:table-cell">
          {formatPercent(sector.avg_ai_exposure)}
        </td>
        <td className="py-4 px-4">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-slate-50 dark:bg-slate-800/30">
          <td colSpan={7} className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DetailStat label="High PTR Roles" value={sector.high_ptr_count} />
              <DetailStat label="High NFC Roles" value={sector.high_nfc_count} />
              <DetailStat label="HH Count" value={sector.hh_count} />
              <DetailStat label="Indexed Roles" value={sector.roles_with_indices} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function DetailStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div className="text-lg font-bold text-slate-900 dark:text-white">
        {value.toLocaleString()}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}
