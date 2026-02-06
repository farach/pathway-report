import { cn, quadrantColors, quadrantLabels, quadrantDescriptions, quadrantNames } from '../lib/utils';
import type { QuadrantCode } from '../data/types';

interface QuadrantLegendProps {
  orientation?: 'horizontal' | 'vertical';
  showDescriptions?: boolean;
  selected?: QuadrantCode | null;
  onSelect?: (quadrant: QuadrantCode | null) => void;
  className?: string;
}

const quadrants: QuadrantCode[] = ['HH', 'HL', 'LH', 'LL'];

export function QuadrantLegend({
  orientation = 'horizontal',
  showDescriptions = false,
  selected,
  onSelect,
  className,
}: QuadrantLegendProps) {
  const isInteractive = !!onSelect;

  return (
    <div
      className={cn(
        'flex gap-3',
        orientation === 'vertical' ? 'flex-col' : 'flex-wrap justify-center',
        className
      )}
    >
      {quadrants.map((q) => (
        <button
          key={q}
          type="button"
          disabled={!isInteractive}
          onClick={() => onSelect?.(selected === q ? null : q)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-lg transition-all',
            isInteractive
              ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800'
              : 'cursor-default',
            selected === q && 'ring-2 ring-offset-2 ring-slate-400 dark:ring-slate-500',
            selected && selected !== q && 'opacity-50'
          )}
        >
          <span
            className="w-4 h-4 rounded-full shrink-0"
            style={{ backgroundColor: quadrantColors[q] }}
          />
          <div className={cn('text-left', showDescriptions ? 'flex flex-col gap-0.5' : 'flex items-center gap-2')}>
            <span className="font-semibold text-sm text-slate-900 dark:text-white">
              {q}: {quadrantNames[q]}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {showDescriptions ? quadrantDescriptions[q] : quadrantLabels[q]}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export function QuadrantDiagram({ className }: { className?: string }) {
  return (
    <div className={cn('relative max-w-md mx-auto', className)}>
      {/* Container with space for axis labels */}
      <div className="ml-16 mb-10">
        {/* Grid */}
        <div className="aspect-square grid grid-cols-2 grid-rows-2 gap-1">
          {/* Low-High (top-left) */}
          <div className="bg-purple-100 dark:bg-purple-900/30 rounded-tl-2xl p-3 flex flex-col justify-center items-center">
            <span className="font-bold text-purple-700 dark:text-purple-400 text-xl">LH</span>
            <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 text-center mt-1">
              {quadrantNames.LH}
            </span>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 text-center mt-0.5 hidden md:block">
              Low Risk, High Constraint
            </span>
          </div>

          {/* High-High (top-right) */}
          <div className="bg-red-100 dark:bg-red-900/30 rounded-tr-2xl p-3 flex flex-col justify-center items-center">
            <span className="font-bold text-red-700 dark:text-red-400 text-xl">HH</span>
            <span className="text-xs font-semibold text-red-700 dark:text-red-300 text-center mt-1">
              {quadrantNames.HH}
            </span>
            <span className="text-[10px] text-red-600 dark:text-red-400 text-center mt-0.5 hidden md:block">
              High Risk, High Constraint
            </span>
          </div>

          {/* Low-Low (bottom-left) */}
          <div className="bg-green-100 dark:bg-green-900/30 rounded-bl-2xl p-3 flex flex-col justify-center items-center">
            <span className="font-bold text-green-700 dark:text-green-400 text-xl">LL</span>
            <span className="text-xs font-semibold text-green-700 dark:text-green-300 text-center mt-1">
              {quadrantNames.LL}
            </span>
            <span className="text-[10px] text-green-600 dark:text-green-400 text-center mt-0.5 hidden md:block">
              Low Risk, Low Constraint
            </span>
          </div>

          {/* High-Low (bottom-right) */}
          <div className="bg-orange-100 dark:bg-orange-900/30 rounded-br-2xl p-3 flex flex-col justify-center items-center">
            <span className="font-bold text-orange-700 dark:text-orange-400 text-xl">HL</span>
            <span className="text-xs font-semibold text-orange-700 dark:text-orange-300 text-center mt-1">
              {quadrantNames.HL}
            </span>
            <span className="text-[10px] text-orange-600 dark:text-orange-400 text-center mt-0.5 hidden md:block">
              High Risk, Low Constraint
            </span>
          </div>
        </div>

        {/* X-axis label (bottom) */}
        <div className="mt-3 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
          AI Pathway Risk (PTR) →
        </div>
      </div>

      {/* Y-axis label (left side, outside the grid) */}
      <div className="absolute left-0 top-0 bottom-10 w-14 flex items-center justify-center">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 transform -rotate-90 whitespace-nowrap origin-center">
          Career Network Constraint (NFC) →
        </span>
      </div>
    </div>
  );
}
