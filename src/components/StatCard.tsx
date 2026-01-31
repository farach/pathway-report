import { useAnimatedCounter } from '../hooks/useScrollAnimation';
import { cn } from '../lib/utils';

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

export function StatCard({
  value,
  label,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
}: StatCardProps) {
  const { ref, count } = useAnimatedCounter(value, 2000);

  const displayValue = decimals > 0
    ? (count / Math.pow(10, decimals)).toFixed(decimals)
    : count.toLocaleString();

  return (
    <div className={cn('stat-card text-center', className)}>
      <span
        ref={ref}
        className="block text-4xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white"
      >
        {prefix}{displayValue}{suffix}
      </span>
      <span className="block mt-2 text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

interface QuadrantBadgeProps {
  quadrant: 'HH' | 'HL' | 'LH' | 'LL';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const quadrantLabels = {
  HH: 'High-High',
  HL: 'High-Low',
  LH: 'Low-High',
  LL: 'Low-Low',
};

export function QuadrantBadge({ quadrant, size = 'md', showLabel = false }: QuadrantBadgeProps) {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'quadrant-badge inline-flex items-center gap-1 font-semibold rounded-full',
        sizeClasses[size],
        {
          'bg-red-600 text-white': quadrant === 'HH',
          'bg-orange-600 text-white': quadrant === 'HL',
          'bg-purple-600 text-white': quadrant === 'LH',
          'bg-green-600 text-white': quadrant === 'LL',
        }
      )}
    >
      {quadrant}
      {showLabel && <span className="font-normal">({quadrantLabels[quadrant]})</span>}
    </span>
  );
}
