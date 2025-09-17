'use client';

import { Card } from '@/components/ui/Card';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Position } from '@/lib/types';
import { RiskIndicator } from '@/components/ui/RiskIndicator';

// Mock data for demonstration
const mockPositions: Position[] = [
  {
    positionId: '1',
    userId: 'user1',
    assetSupplied: 'USDC',
    assetBorrowed: 'ETH',
    suppliedAmount: 5000,
    borrowedAmount: 2.1,
    apy: 8.5,
    riskScore: 'low',
    healthFactor: 2.3,
    status: 'active',
  },
  {
    positionId: '2',
    userId: 'user1',
    assetSupplied: 'ETH',
    suppliedAmount: 1.5,
    apy: 12.3,
    riskScore: 'medium',
    healthFactor: 1.8,
    status: 'active',
  },
];

export function Dashboard() {
  const totalSupplied = mockPositions.reduce((acc, pos) => acc + (pos.suppliedAmount * (pos.assetSupplied === 'ETH' ? 2450 : 1)), 0);
  const totalBorrowed = mockPositions.reduce((acc, pos) => acc + (pos.borrowedAmount ? pos.borrowedAmount * 2450 : 0), 0);
  const netWorth = totalSupplied - totalBorrowed;
  const avgApy = mockPositions.reduce((acc, pos) => acc + pos.apy, 0) / mockPositions.length;

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <Card variant="glass">
        <h2 className="text-xl font-semibold text-white mb-4">Portfolio Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-white/60">Net Worth</p>
            <p className="text-2xl font-bold gradient-text">
              {formatCurrency(netWorth)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-white/60">Avg APY</p>
            <p className="text-2xl font-bold text-accent">
              {formatPercentage(avgApy)}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-sm text-white/60">Total Supplied</p>
            <p className="text-lg font-semibold text-success">
              {formatCurrency(totalSupplied)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-white/60">Total Borrowed</p>
            <p className="text-lg font-semibold text-warning">
              {formatCurrency(totalBorrowed)}
            </p>
          </div>
        </div>
      </Card>

      {/* Active Positions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Active Positions</h2>
        {mockPositions.map((position) => (
          <Card key={position.positionId} variant="glass">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-white">
                  {position.assetSupplied} Supply
                  {position.assetBorrowed && ` / ${position.assetBorrowed} Borrow`}
                </h3>
                <RiskIndicator risk={position.riskScore} className="mt-1" />
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-accent">
                  {formatPercentage(position.apy)}
                </p>
                <p className="text-xs text-white/60">APY</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-white/60">Supplied</span>
                <span className="text-sm text-white">
                  {position.suppliedAmount} {position.assetSupplied}
                </span>
              </div>
              {position.borrowedAmount && (
                <div className="flex justify-between">
                  <span className="text-sm text-white/60">Borrowed</span>
                  <span className="text-sm text-white">
                    {position.borrowedAmount} {position.assetBorrowed}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-white/60">Health Factor</span>
                <span className={`text-sm font-medium ${
                  position.healthFactor >= 2 ? 'text-success' : 
                  position.healthFactor >= 1.5 ? 'text-warning' : 'text-danger'
                }`}>
                  {position.healthFactor.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
