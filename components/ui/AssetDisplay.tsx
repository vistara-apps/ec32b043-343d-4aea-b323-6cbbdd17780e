import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { Asset } from '@/lib/types';

interface AssetDisplayProps {
  asset: Asset;
  showBalance?: boolean;
  showApy?: boolean;
  mode?: 'supply' | 'borrow';
  className?: string;
}

export function AssetDisplay({ 
  asset, 
  showBalance = true, 
  showApy = true, 
  mode = 'supply',
  className 
}: AssetDisplayProps) {
  const apy = mode === 'supply' ? asset.supplyApy : asset.borrowApy;
  
  return (
    <div className={cn('flex items-center justify-between p-4 glass-card', className)}>
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{asset.icon}</div>
        <div>
          <h3 className="font-semibold text-white">{asset.symbol}</h3>
          <p className="text-sm text-white/60">{asset.name}</p>
        </div>
      </div>
      
      <div className="text-right">
        {showBalance && (
          <p className="font-semibold text-white">
            {asset.balance.toFixed(4)} {asset.symbol}
          </p>
        )}
        <p className="text-sm text-white/60">
          {formatCurrency(asset.price)}
        </p>
        {showApy && (
          <p className="text-sm font-medium text-accent">
            {formatPercentage(apy)} APY
          </p>
        )}
      </div>
    </div>
  );
}
