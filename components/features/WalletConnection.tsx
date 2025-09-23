'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useWalletClient } from 'wagmi';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { truncateAddress } from '@/lib/utils';
import { x402Client } from '@/lib/x402-axios';

export function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);

  // Update x402 client with wallet client when available
  useEffect(() => {
    if (walletClient) {
      x402Client.setWalletClient(walletClient);
    }
  }, [walletClient]);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Connect to the first available connector (usually Coinbase Wallet or Injected)
      const connector = connectors[0];
      if (connector) {
        connect({ connector });
      }
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (isConnected) {
    return (
      <Card variant="glass" className="text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">
              Wallet Connected
            </h3>
            <p className="text-sm text-white/60">
              {address ? truncateAddress(address) : 'Loading...'}
            </p>
            {walletClient && (
              <p className="text-xs text-green-400 mt-1">
                ✓ X402 Payment Ready
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm" className="flex-1">
              Profile
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleDisconnect}
            >
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
            Connect your Base wallet to start earning yields and enable x402 payments.
          </p>
        </div>
        <Button 
          onClick={handleConnect} 
          loading={isConnecting || isPending}
          className="w-full"
        >
          {(isConnecting || isPending) ? 'Connecting...' : 'Connect Wallet'}
        </Button>
        {connectors.length > 1 && (
          <div className="mt-2">
            <p className="text-xs text-white/40 mb-2">Available connectors:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {connectors.map((connector) => (
                <Button
                  key={connector.uid}
                  variant="outline"
                  size="sm"
                  onClick={() => connect({ connector })}
                  disabled={isPending}
                >
                  {connector.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
