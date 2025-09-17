'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { InputWithLabel } from '@/components/ui/InputWithLabel';
import { AssetDisplay } from '@/components/ui/AssetDisplay';
import { Modal } from '@/components/ui/Modal';
import { MOCK_ASSETS } from '@/lib/constants';
import { Asset } from '@/lib/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';

export function SupplyInterface() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSupplying, setIsSupplying] = useState(false);

  const handleSupply = async () => {
    if (!selectedAsset || !amount) return;
    
    setIsSupplying(true);
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsModalOpen(false);
      setAmount('');
      setSelectedAsset(null);
    } catch (error) {
      console.error('Supply failed:', error);
    } finally {
      setIsSupplying(false);
    }
  };

  const projectedEarnings = selectedAsset && amount ? 
    (parseFloat(amount) * selectedAsset.supplyApy / 100) : 0;

  return (
    <div className="space-y-6">
      <Card variant="glass">
        <h2 className="text-xl font-semibold text-white mb-4">Supply Assets</h2>
        <p className="text-white/60 mb-6">
          Supply your assets to earn yield. Your supplied assets serve as collateral for borrowing.
        </p>
        
        <div className="space-y-4">
          {MOCK_ASSETS.map((asset) => (
            <div
              key={asset.symbol}
              className="cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              onClick={() => {
                setSelectedAsset(asset);
                setIsModalOpen(true);
              }}
            >
              <AssetDisplay asset={asset} mode="supply" />
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Supply ${selectedAsset?.symbol}`}
      >
        {selectedAsset && (
          <div className="space-y-6">
            <AssetDisplay asset={selectedAsset} mode="supply" showBalance={true} />
            
            <InputWithLabel
              label="Amount to Supply"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              helperText={`Balance: ${selectedAsset.balance} ${selectedAsset.symbol}`}
            />

            {amount && (
              <Card variant="glass" className="bg-white/5">
                <h4 className="font-semibold text-white mb-3">Transaction Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Supply APY</span>
                    <span className="text-accent font-medium">
                      {formatPercentage(selectedAsset.supplyApy)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Projected Annual Earnings</span>
                    <span className="text-success font-medium">
                      {formatCurrency(projectedEarnings)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Transaction Fee</span>
                    <span className="text-white">~$2.50</span>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSupply}
                loading={isSupplying}
                disabled={!amount || parseFloat(amount) <= 0}
                className="flex-1"
              >
                {isSupplying ? 'Supplying...' : 'Supply'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
