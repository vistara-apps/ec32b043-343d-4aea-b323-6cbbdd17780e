'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RiskIndicator } from '@/components/ui/RiskIndicator';
import { Modal } from '@/components/ui/Modal';
import { MOCK_YIELD_STRATEGIES } from '@/lib/constants';
import { YieldStrategy } from '@/lib/types';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils';

export function YieldStrategies() {
  const [selectedStrategy, setSelectedStrategy] = useState<YieldStrategy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);

  const handleInvest = async () => {
    if (!selectedStrategy) return;
    
    setIsInvesting(true);
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsModalOpen(false);
      setSelectedStrategy(null);
    } catch (error) {
      console.error('Investment failed:', error);
    } finally {
      setIsInvesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card variant="glass">
        <h2 className="text-xl font-semibold text-white mb-4">Yield Strategies</h2>
        <p className="text-white/60 mb-6">
          Automated strategies to maximize your returns with optimized risk management.
        </p>
      </Card>

      <div className="space-y-4">
        {MOCK_YIELD_STRATEGIES.map((strategy) => (
          <Card key={strategy.id} variant="glass" className="cursor-pointer transition-all duration-200 hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">{strategy.name}</h3>
                <p className="text-sm text-white/60 mb-2">{strategy.description}</p>
                <RiskIndicator risk={strategy.riskLevel} />
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-accent">
                  {formatPercentage(strategy.apy)}
                </p>
                <p className="text-xs text-white/60">APY</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div className="flex space-x-4 text-sm">
                <div>
                  <p className="text-white/60">TVL</p>
                  <p className="text-white font-medium">
                    {formatCurrency(strategy.tvl)}
                  </p>
                </div>
                <div>
                  <p className="text-white/60">Protocol</p>
                  <p className="text-white font-medium">{strategy.protocol}</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedStrategy(strategy);
                  setIsModalOpen(true);
                }}
              >
                Invest
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Invest in ${selectedStrategy?.name}`}
      >
        {selectedStrategy && (
          <div className="space-y-6">
            <Card variant="glass" className="bg-white/5">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-accent mb-1">
                  {formatPercentage(selectedStrategy.apy)}
                </p>
                <p className="text-white/60">Expected APY</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Strategy</span>
                  <span className="text-white">{selectedStrategy.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Risk Level</span>
                  <RiskIndicator risk={selectedStrategy.riskLevel} />
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Total Value Locked</span>
                  <span className="text-white">
                    {formatCurrency(selectedStrategy.tvl)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Protocol</span>
                  <span className="text-white">{selectedStrategy.protocol}</span>
                </div>
              </div>
            </Card>

            <div className="bg-warning/20 border border-warning/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">⚠️ Important Notice</h4>
              <p className="text-sm text-white/80">
                This strategy involves smart contract risks and potential impermanent loss. 
                Past performance does not guarantee future results.
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleInvest}
                loading={isInvesting}
                className="flex-1"
              >
                {isInvesting ? 'Investing...' : 'Invest Now'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
