export interface User {
  userId: string;
  connectedWalletAddress: string;
  notificationPreferences: NotificationPreferences;
  transactionHistoryId: string;
}

export interface NotificationPreferences {
  liquidationAlerts: boolean;
  rateChanges: boolean;
  positionUpdates: boolean;
}

export interface Position {
  positionId: string;
  userId: string;
  assetSupplied: string;
  assetBorrowed?: string;
  suppliedAmount: number;
  borrowedAmount?: number;
  apy: number;
  riskScore: 'low' | 'medium' | 'high';
  healthFactor: number;
  status: 'active' | 'liquidated' | 'closed';
}

export interface Transaction {
  transactionId: string;
  userId: string;
  type: 'supply' | 'borrow' | 'repay' | 'withdraw';
  asset: string;
  amount: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  fee: number;
}

export interface Asset {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
  price: number;
  supplyApy: number;
  borrowApy: number;
  totalSupplied: number;
  totalBorrowed: number;
  utilizationRate: number;
}

export interface YieldStrategy {
  id: string;
  name: string;
  description: string;
  apy: number;
  riskLevel: 'low' | 'medium' | 'high';
  tvl: number;
  protocol: string;
}
