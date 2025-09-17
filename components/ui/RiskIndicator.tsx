import { cn, getRiskColor } from '@/lib/utils';

interface RiskIndicatorProps {
  risk: 'low' | 'medium' | 'high';
  className?: string;
}

export function RiskIndicator({ risk, className }: RiskIndicatorProps) {
  const riskLabels = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
  };

  const riskIcons = {
    low: '🟢',
    medium: '🟡',
    high: '🔴',
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <span className="text-sm">{riskIcons[risk]}</span>
      <span className={cn('text-sm font-medium', getRiskColor(risk))}>
        {riskLabels[risk]}
      </span>
    </div>
  );
}
