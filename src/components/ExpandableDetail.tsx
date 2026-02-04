import { cn } from '../lib/utils';

interface ExpandableDetailProps {
  summary: string;
  children: React.ReactNode;
  className?: string;
}

export function ExpandableDetail({ summary, children, className }: ExpandableDetailProps) {
  return (
    <details
      className={cn(
        'group mt-3 rounded-lg bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50',
        className
      )}
    >
      <summary className="cursor-pointer select-none px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 list-none flex items-center gap-1.5">
        <svg
          className="w-4 h-4 shrink-0 transition-transform group-open:rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {summary}
      </summary>
      <div className="px-4 pb-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {children}
      </div>
    </details>
  );
}
