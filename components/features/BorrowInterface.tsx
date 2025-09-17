'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { InputWithLabel } from '@/components/ui/InputWithLabel';
import { AssetDisplay } from '@/components/ui/AssetDisplay';
import { Modal } from '@/components/ui/Modal';
import { NotificationBanner } from '@/components/ui/NotificationBanner';
import { MOCK_ASSETS } from '@/lib/constants';
import { Asset } from '@/lib/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';

export function BorrowInterface() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!selectedAsset || !amount) return;
    
    setIsBorrowing(true);
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsModalOpen(false);
      setAmount('');
      setSelectedAsset(null);
    } catch (error) {
      console.error('Borrow failed:', error);
    } finally {
      setIsBorrowing(false);
    }
  };

  const borrowValue = selectedAsset && amount ? 
    parseFloat(amount) * selectedAsset.price : 0;
  const requiredCollateral = borrowValue * 1.5; // 150% collateralization
  const annualInterest = selectedAsset && amount ? 
    (parseFloat(amount) * selectedAsset.borrowApy / 100) : 0;

  return (
    <div className="space-y-6">
      <NotificationBanner
        variant="info"
        title="Collateral Required"
        message="You need to supply collateral before borrowing. Make sure your health factor stays above 1.0."
      />

      <Card variant="glass">
        <h2 className="text-xl font-semibold text-white mb-4">Borrow Assets</h2>
        <p className="text-white/60 mb-6">
          Borrow assets against your supplied collateral. Monitor your health factor to avoid liquidation.
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
              <AssetDisplay asset={asset} mode="borrow" showBalance={false} />
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Borrow ${selectedAsset?.symbol}`}
      >
        {selectedAsset && (
          <div className="space-y-6">
            <AssetDisplay asset={selectedAsset} mode="borrow" showBalance={false} />
            
            <InputWithLabel
              label="Amount to Borrow"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              helperText={`Available to borrow: 1,250 ${selectedAsset.symbol}`}
            />

            {amount && (
              <Card variant="glass" className="bg-white/5">
                <h4 className="font-semibold text-white mb-3">Borrow Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Borrow APY</span>
                    <span className="text-warning font-medium">
                      {formatPercentage(selectedAsset.borrowApy)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Annual Interest</span>
                    <span className="text-warning font-medium">
                      {formatCurrency(annualInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Required Collateral</span>
                    <span className="text-white">
                      {formatCurrency(requiredCollateral)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Health Factor (After)</span>
                    <span className="text-success font-medium">2.1</span>
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
                onClick={handleBorrow}
                loading={isBorrowing}
                disabled={!amount || parseFloat(amount) <= 0}
                className="flex-1"
              >
                {isBorrowing ? 'Borrowing...' : 'Borrow'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
