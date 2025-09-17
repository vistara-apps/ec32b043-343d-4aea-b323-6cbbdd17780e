import { Asset, YieldStrategy } from './types';

export const MOCK_ASSETS: Asset[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: '⟠',
    balance: 2.5,
    price: 2450.00,
    supplyApy: 4.2,
    borrowApy: 6.8,
    totalSupplied: 125000000,
    totalBorrowed: 89000000,
    utilizationRate: 71.2,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '💵',
    balance: 1250.00,
    price: 1.00,
    supplyApy: 5.8,
    borrowApy: 8.2,
    totalSupplied: 450000000,
    totalBorrowed: 320000000,
    utilizationRate: 71.1,
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    icon: '₿',
    balance: 0.15,
    price: 43200.00,
    supplyApy: 3.9,
    borrowApy: 7.1,
    totalSupplied: 25000000,
    totalBorrowed: 18000000,
    utilizationRate: 72.0,
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: '◈',
    balance: 850.00,
    price: 1.00,
    supplyApy: 6.1,
    borrowApy: 8.5,
    totalSupplied: 180000000,
    totalBorrowed: 125000000,
    utilizationRate: 69.4,
  },
];

export const MOCK_YIELD_STRATEGIES: YieldStrategy[] = [
  {
    id: '1',
    name: 'Stable Yield Plus',
    description: 'Low-risk strategy focusing on stablecoin yields',
    apy: 8.5,
    riskLevel: 'low',
    tvl: 45000000,
    protocol: 'Aave V3',
  },
  {
    id: '2',
    name: 'ETH Maximizer',
    description: 'Optimized ETH lending with automated rebalancing',
    apy: 12.3,
    riskLevel: 'medium',
    tvl: 28000000,
    protocol: 'Compound V3',
  },
  {
    id: '3',
    name: 'DeFi Arbitrage',
    description: 'Advanced strategy leveraging cross-protocol arbitrage',
    apy: 18.7,
    riskLevel: 'high',
    tvl: 15000000,
    protocol: 'Multi-Protocol',
  },
];

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'supply', label: 'Supply', icon: '💰' },
  { id: 'borrow', label: 'Borrow', icon: '🏦' },
  { id: 'strategies', label: 'Strategies', icon: '🎯' },
];
