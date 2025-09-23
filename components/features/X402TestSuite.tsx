'use client';

import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { InputWithLabel } from '@/components/ui/InputWithLabel';
import { NotificationBanner } from '@/components/ui/NotificationBanner';
import { useX402Payment } from '@/lib/hooks/useX402Payment';
import { formatCurrency } from '@/lib/utils';

export function X402TestSuite() {
  const [testAmount, setTestAmount] = useState('10');
  const [testRecipient, setTestRecipient] = useState('0x1234567890123456789012345678901234567890');
  const [testResults, setTestResults] = useState<string[]>([]);
  
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const { 
    paymentStatus, 
    sendUSDCPayment, 
    checkTransactionStatus,
    isReady,
    reset,
    usdcAddress 
  } = useX402Payment({
    onSuccess: (response) => {
      addTestResult(`✅ Payment successful: ${response.transactionHash}`);
    },
    onError: (error) => {
      addTestResult(`❌ Payment failed: ${error.message}`);
    },
    onPending: (txHash) => {
      addTestResult(`⏳ Payment pending: ${txHash}`);
    }
  });

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runBasicConnectivityTest = async () => {
    addTestResult('🔄 Running basic connectivity test...');
    
    if (!isConnected) {
      addTestResult('❌ Wallet not connected');
      return;
    }
    
    if (!walletClient) {
      addTestResult('❌ Wallet client not available');
      return;
    }
    
    if (!isReady) {
      addTestResult('❌ X402 payment system not ready');
      return;
    }
    
    addTestResult(`✅ Wallet connected: ${address}`);
    addTestResult(`✅ Wallet client available`);
    addTestResult(`✅ X402 payment system ready`);
    addTestResult(`ℹ️ USDC contract address: ${usdcAddress}`);
  };

  const runPaymentFlowTest = async () => {
    if (!isReady) {
      addTestResult('❌ X402 payment system not ready');
      return;
    }
    
    addTestResult('🔄 Running end-to-end payment flow test...');
    
    try {
      await sendUSDCPayment(testRecipient, testAmount, {
        test: true,
        timestamp: Date.now(),
        description: 'X402 Test Payment'
      });
    } catch (error) {
      addTestResult(`❌ Payment flow test failed: ${error}`);
    }
  };

  const runErrorHandlingTest = async () => {
    addTestResult('🔄 Running error handling test...');
    
    try {
      // Test with invalid recipient
      await sendUSDCPayment('invalid-address', testAmount, {
        test: true,
        description: 'Error handling test'
      });
    } catch (error) {
      addTestResult(`✅ Error handling working: ${error}`);
    }
  };

  const checkConfirmationStatus = async () => {
    if (!paymentStatus.transactionHash) {
      addTestResult('❌ No transaction hash available');
      return;
    }
    
    addTestResult('🔄 Checking transaction confirmation status...');
    
    try {
      const status = await checkTransactionStatus(paymentStatus.transactionHash);
      addTestResult(`ℹ️ Transaction status: ${JSON.stringify(status, null, 2)}`);
    } catch (error) {
      addTestResult(`❌ Failed to check status: ${error}`);
    }
  };

  const clearResults = () => {
    setTestResults([]);
    reset();
  };

  return (
    <div className="space-y-6">
      <Card variant="glass">
        <h2 className="text-xl font-semibold text-white mb-4">X402 Payment Test Suite</h2>
        <p className="text-white/60 mb-6">
          Test the x402 payment flow integration with wagmi and USDC on Base.
        </p>

        {!isConnected && (
          <NotificationBanner
            variant="warning"
            title="Wallet Required"
            message="Please connect your wallet to run tests."
            className="mb-4"
          />
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithLabel
              label="Test Amount (USDC)"
              type="number"
              value={testAmount}
              onChange={(e) => setTestAmount(e.target.value)}
              placeholder="10"
            />
            <InputWithLabel
              label="Test Recipient Address"
              type="text"
              value={testRecipient}
              onChange={(e) => setTestRecipient(e.target.value)}
              placeholder="0x..."
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="secondary"
              onClick={runBasicConnectivityTest}
              disabled={!isConnected}
              size="sm"
            >
              Test Connection
            </Button>
            
            <Button
              variant="primary"
              onClick={runPaymentFlowTest}
              disabled={!isReady || paymentStatus.isLoading}
              loading={paymentStatus.isLoading}
              size="sm"
            >
              Test Payment
            </Button>
            
            <Button
              variant="secondary"
              onClick={runErrorHandlingTest}
              disabled={!isReady}
              size="sm"
            >
              Test Errors
            </Button>
            
            <Button
              variant="outline"
              onClick={checkConfirmationStatus}
              disabled={!paymentStatus.transactionHash}
              size="sm"
            >
              Check Status
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={clearResults}
            className="w-full"
            size="sm"
          >
            Clear Results
          </Button>
        </div>
      </Card>

      {paymentStatus.transactionHash && (
        <Card variant="glass" className="bg-blue-500/10">
          <h3 className="font-semibold text-white mb-3">Current Transaction</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Hash:</span>
              <span className="text-white font-mono">
                {paymentStatus.transactionHash.slice(0, 20)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Status:</span>
              <span className={`font-medium ${
                paymentStatus.status === 'confirmed' ? 'text-green-400' :
                paymentStatus.status === 'failed' ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {paymentStatus.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Confirmations:</span>
              <span className="text-white">{paymentStatus.confirmations}</span>
            </div>
          </div>
        </Card>
      )}

      {testResults.length > 0 && (
        <Card variant="glass">
          <h3 className="font-semibold text-white mb-3">Test Results</h3>
          <div className="bg-black/20 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="text-xs text-white/80 whitespace-pre-wrap">
              {testResults.join('\n')}
            </pre>
          </div>
        </Card>
      )}

      <Card variant="glass" className="bg-green-500/10">
        <h3 className="font-semibold text-white mb-3">Implementation Checklist</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✅</span>
            <span className="text-white">wagmi useWalletClient integration</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✅</span>
            <span className="text-white">x402-axios implementation</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✅</span>
            <span className="text-white">USDC on Base integration</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✅</span>
            <span className="text-white">Transaction confirmation monitoring</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✅</span>
            <span className="text-white">Error handling implementation</span>
          </div>
        </div>
      </Card>
    </div>
  );
}