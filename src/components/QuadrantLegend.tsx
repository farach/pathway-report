import { cn, quadrantColors, quadrantLabels, quadrantDescriptions } from '../lib/utils';
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
          <div className={cn('text-left', showDescriptions ? '' : 'flex items-center gap-2')}>
            <span className="font-semibold text-sm text-slate-900 dark:text-white">
              {q}
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
    <div className={cn('relative aspect-square max-w-md mx-auto', className)}>
      {/* Grid */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
        {/* High-High (top-right) */}
        <div className="order-2 bg-red-100 dark:bg-red-900/30 rounded-tr-2xl p-4 flex flex-col justify-center items-center">
          <span className="font-bold text-red-700 dark:text-red-400 text-xl">HH</span>
          <span className="text-xs text-red-600 dark:text-red-400 text-center mt-1">
            High PTR<br />High NFC
          </span>
        </div>

        {/* Low-High (top-left) */}
        <div className="order-1 bg-purple-100 dark:bg-purple-900/30 rounded-tl-2xl p-4 flex flex-col justify-center items-center">
          <span className="font-bold text-purple-700 dark:text-purple-400 text-xl">LH</span>
          <span className="text-xs text-purple-600 dark:text-purple-400 text-center mt-1">
            Low PTR<br />High NFC
          </span>
        </div>

        {/* High-Low (bottom-right) */}
        <div className="order-4 bg-orange-100 dark:bg-orange-900/30 rounded-br-2xl p-4 flex flex-col justify-center items-center">
          <span className="font-bold text-orange-700 dark:text-orange-400 text-xl">HL</span>
          <span className="text-xs text-orange-600 dark:text-orange-400 text-center mt-1">
            High PTR<br />Low NFC
          </span>
        </div>

        {/* Low-Low (bottom-left) */}
        <div className="order-3 bg-green-100 dark:bg-green-900/30 rounded-bl-2xl p-4 flex flex-col justify-center items-center">
          <span className="font-bold text-green-700 dark:text-green-400 text-xl">LL</span>
          <span className="text-xs text-green-600 dark:text-green-400 text-center mt-1">
            Low PTR<br />Low NFC
          </span>
        </div>
      </div>

      {/* Axis labels */}
      <div className="absolute -bottom-8 left-0 right-0 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
        Personal Transition Risk (PTR) →
      </div>
      <div className="absolute -left-8 top-0 bottom-0 flex items-center justify-center">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 transform -rotate-90 whitespace-nowrap">
          ← Network Flexibility Constraint (NFC)
        </span>
      </div>
    </div>
  );
}
