'use client';

import { useState } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { truncateAddress } from '@/lib/utils';

export function WalletConnection() {
  const { context } = useMiniKit();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // In a real app, this would trigger wallet connection
      // For now, we'll simulate the connection process
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Mock connected state for demo
  const isConnected = context?.user?.displayName || false;
  const address = '0x1234...5678'; // Mock address

  if (isConnected) {
    return (
      <Card variant="glass" className="text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {context?.user?.displayName || 'Connected'}
            </h3>
            <p className="text-sm text-white/60">
              {truncateAddress(address)}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm" className="flex-1">
              Profile
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Disconnect
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="text-center">
      <div className="space-y-4">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">🔗</span>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-sm text-white/60 mb-4">
            Connect your Base wallet to start earning yields on your crypto assets.
          </p>
        </div>
        <Button 
          onClick={handleConnect} 
          loading={isConnecting}
          className="w-full"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </div>
    </Card>
  );
}
