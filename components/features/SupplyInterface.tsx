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
import { useX402Payment } from '@/lib/hooks/useX402Payment';
import { useAccount } from 'wagmi';

export function SupplyInterface() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { isConnected } = useAccount();
  const { 
    paymentStatus, 
    sendUSDCPayment, 
    isReady,
    reset 
  } = useX402Payment({
    onSuccess: (response) => {
      console.log('Supply transaction successful:', response);
      setIsModalOpen(false);
      setAmount('');
      setSelectedAsset(null);
      reset();
    },
    onError: (error) => {
      console.error('Supply transaction failed:', error);
    },
    onPending: (txHash) => {
      console.log('Supply transaction pending:', txHash);
    }
  });

  const handleSupply = async () => {
    if (!selectedAsset || !amount || !isReady) return;
    
    try {
      // For USDC transactions on Base
      if (selectedAsset.symbol === 'USDC') {
        await sendUSDCPayment(
          '0x1234567890123456789012345678901234567890', // Mock protocol address
          amount,
          {
            action: 'supply',
            asset: selectedAsset.symbol,
            protocol: 'liquidity-nexus'
          }
        );
      } else {
        // For other assets, simulate the transaction for now
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsModalOpen(false);
        setAmount('');
        setSelectedAsset(null);
      }
    } catch (error) {
      console.error('Supply failed:', error);
    }
  };

  const projectedEarnings = selectedAsset && amount ? 
    (parseFloat(amount) * selectedAsset.supplyApy / 100) : 0;

  return (
    <div className="space-y-6">
      {!isConnected && (
        <NotificationBanner
          variant="warning"
          title="Wallet Not Connected"
          message="Please connect your wallet to supply assets and use x402 payments."
        />
      )}
      
      {paymentStatus.error && (
        <NotificationBanner
          variant="error"
          title="Transaction Failed"
          message={paymentStatus.error}
        />
      )}

      {paymentStatus.transactionHash && (
        <NotificationBanner
          variant="info"
          title="Transaction Status"
          message={`Status: ${paymentStatus.status} | Confirmations: ${paymentStatus.confirmations} | Hash: ${paymentStatus.transactionHash.slice(0, 10)}...`}
        />
      )}

      <Card variant="glass">
        <h2 className="text-xl font-semibold text-white mb-4">Supply Assets</h2>
        <p className="text-white/60 mb-6">
          Supply your assets to earn yield. X402 payments enabled for USDC transactions.
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
                disabled={paymentStatus.isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSupply}
                loading={paymentStatus.isLoading}
                disabled={
                  !amount || 
                  parseFloat(amount) <= 0 || 
                  !isConnected || 
                  (selectedAsset?.symbol === 'USDC' && !isReady)
                }
                className="flex-1"
              >
                {paymentStatus.isLoading 
                  ? (selectedAsset?.symbol === 'USDC' ? 'Processing X402 Payment...' : 'Supplying...') 
                  : 'Supply'
                }
              </Button>
            </div>
            
            {selectedAsset?.symbol === 'USDC' && (
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-400 font-medium">
                  ⚡ X402 Payment Enabled
                </p>
                <p className="text-xs text-blue-300/80 mt-1">
                  This transaction will use the x402 payment protocol for USDC on Base network.
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
