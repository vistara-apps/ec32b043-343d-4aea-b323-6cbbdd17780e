import { useState, useCallback } from 'react';
import { useWalletClient, useAccount, usePublicClient } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { x402Client, PaymentRequest, PaymentResponse } from '@/lib/x402-axios';
import { USDC_BASE_ADDRESS } from '@/lib/wagmi-config';

export interface UseX402PaymentOptions {
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: Error) => void;
  onPending?: (txHash: string) => void;
}

export interface PaymentStatus {
  isLoading: boolean;
  error: string | null;
  transactionHash: string | null;
  status: 'idle' | 'pending' | 'confirmed' | 'failed';
  confirmations: number;
}

export function useX402Payment(options: UseX402PaymentOptions = {}) {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    isLoading: false,
    error: null,
    transactionHash: null,
    status: 'idle',
    confirmations: 0,
  });

  const processPayment = useCallback(async (paymentRequest: PaymentRequest) => {
    if (!walletClient || !isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setPaymentStatus({
      isLoading: true,
      error: null,
      transactionHash: null,
      status: 'pending',
      confirmations: 0,
    });

    try {
      // Configure x402 client with current wallet
      x402Client.setWalletClient(walletClient);

      // Process payment through x402
      const response = await x402Client.processPayment(paymentRequest);
      
      setPaymentStatus(prev => ({
        ...prev,
        transactionHash: response.transactionHash,
      }));

      // Call onPending callback
      if (options.onPending) {
        options.onPending(response.transactionHash);
      }

      // Monitor transaction status
      await monitorTransaction(response.transactionHash);
      
      // Call onSuccess callback
      if (options.onSuccess) {
        options.onSuccess(response);
      }

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      
      setPaymentStatus(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        status: 'failed',
      }));

      // Call onError callback
      if (options.onError) {
        options.onError(error instanceof Error ? error : new Error(errorMessage));
      }

      throw error;
    }
  }, [walletClient, isConnected, address, options]);

  const monitorTransaction = useCallback(async (txHash: string) => {
    if (!publicClient) return;

    try {
      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash as `0x${string}`,
        confirmations: 1,
      });

      const isSuccess = receipt.status === 'success';
      
      setPaymentStatus(prev => ({
        ...prev,
        isLoading: false,
        status: isSuccess ? 'confirmed' : 'failed',
        error: isSuccess ? null : 'Transaction failed',
        confirmations: 1,
      }));

      // Continue monitoring for additional confirmations
      if (isSuccess) {
        monitorConfirmations(txHash);
      }
    } catch (error) {
      setPaymentStatus(prev => ({
        ...prev,
        isLoading: false,
        status: 'failed',
        error: 'Transaction monitoring failed',
      }));
    }
  }, [publicClient]);

  const monitorConfirmations = useCallback(async (txHash: string) => {
    if (!publicClient) return;

    try {
      // Get current block number
      const currentBlock = await publicClient.getBlockNumber();
      
      // Get transaction receipt
      const receipt = await publicClient.getTransactionReceipt({
        hash: txHash as `0x${string}`,
      });

      const confirmations = Number(currentBlock - receipt.blockNumber);
      
      setPaymentStatus(prev => ({
        ...prev,
        confirmations,
      }));

      // Continue monitoring if we need more confirmations
      if (confirmations < 3) {
        setTimeout(() => monitorConfirmations(txHash), 15000); // Check every 15 seconds
      }
    } catch (error) {
      console.warn('Failed to monitor confirmations:', error);
    }
  }, [publicClient]);

  const sendUSDCPayment = useCallback(async (
    recipient: string,
    amount: string, // Amount in USDC (e.g., "10.5")
    metadata?: Record<string, any>
  ) => {
    const paymentRequest: PaymentRequest = {
      amount: parseUnits(amount, 6).toString(), // USDC has 6 decimals
      currency: 'USDC',
      recipient,
      metadata,
    };

    return processPayment(paymentRequest);
  }, [processPayment]);

  const checkTransactionStatus = useCallback(async (txHash: string) => {
    try {
      return await x402Client.checkTransactionStatus(txHash);
    } catch (error) {
      console.error('Failed to check transaction status:', error);
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setPaymentStatus({
      isLoading: false,
      error: null,
      transactionHash: null,
      status: 'idle',
      confirmations: 0,
    });
  }, []);

  return {
    // State
    paymentStatus,
    
    // Actions
    processPayment,
    sendUSDCPayment,
    checkTransactionStatus,
    reset,
    
    // Utils
    isReady: isConnected && !!walletClient,
    usdcAddress: USDC_BASE_ADDRESS,
  };
}