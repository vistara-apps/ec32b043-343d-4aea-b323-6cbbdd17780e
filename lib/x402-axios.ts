import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * X402 Payment Flow Configuration
 * This implements the x402 payment protocol for handling micropayments
 */
export interface X402Config {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  paymentEndpoint?: string;
  walletClient?: any; // Will be provided by wagmi
}

export interface PaymentRequest {
  amount: string;
  currency: string;
  recipient: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  transactionHash: string;
  status: 'pending' | 'confirmed' | 'failed';
  amount: string;
  currency: string;
  timestamp: number;
  confirmations: number;
}

export class X402Axios {
  private axiosInstance: AxiosInstance;
  private walletClient: any;
  private paymentEndpoint: string;

  constructor(config: X402Config = {}) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL || process.env.NEXT_PUBLIC_X402_API_URL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.paymentEndpoint = config.paymentEndpoint || '/payments';
    this.walletClient = config.walletClient;

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for x402 payment authentication
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add x402 specific headers
        config.headers['X-Payment-Protocol'] = 'x402';
        config.headers['X-Payment-Version'] = '1.0';
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for payment flow handling
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 402) {
          // Payment required - handle x402 flow
          return this.handlePaymentRequired(error);
        }
        return Promise.reject(error);
      }
    );
  }

  private async handlePaymentRequired(error: any): Promise<AxiosResponse> {
    const paymentInfo = error.response?.headers['x-payment-info'];
    
    if (paymentInfo && this.walletClient) {
      try {
        // Parse payment information
        const payment = JSON.parse(paymentInfo);
        
        // Initiate payment through wallet
        const paymentResult = await this.processPayment(payment);
        
        // Retry original request with payment proof
        const originalConfig = error.config;
        originalConfig.headers['X-Payment-Proof'] = paymentResult.transactionHash;
        
        return this.axiosInstance.request(originalConfig);
      } catch (paymentError) {
        console.error('Payment processing failed:', paymentError);
        throw paymentError;
      }
    }
    
    throw error;
  }

  public setWalletClient(walletClient: any) {
    this.walletClient = walletClient;
  }

  public async processPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    if (!this.walletClient) {
      throw new Error('Wallet client not configured');
    }

    try {
      // For USDC on Base network
      const usdcContractAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
      
      // Prepare transaction
      const tx = {
        to: paymentRequest.recipient,
        value: paymentRequest.amount,
        data: '0x', // Additional data if needed
      };

      // Send transaction through wallet
      const hash = await this.walletClient.sendTransaction(tx);
      
      return {
        transactionHash: hash,
        status: 'pending',
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        timestamp: Date.now(),
        confirmations: 0,
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }

  public async checkTransactionStatus(transactionHash: string): Promise<PaymentResponse> {
    try {
      const response = await this.axiosInstance.get(`${this.paymentEndpoint}/${transactionHash}`);
      return response.data;
    } catch (error) {
      console.error('Error checking transaction status:', error);
      throw error;
    }
  }

  public async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.axiosInstance.get(url, config);
  }

  public async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.axiosInstance.post(url, data, config);
  }

  public async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.axiosInstance.put(url, data, config);
  }

  public async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.axiosInstance.delete(url, config);
  }
}

// Default instance
export const x402Client = new X402Axios();

export default X402Axios;