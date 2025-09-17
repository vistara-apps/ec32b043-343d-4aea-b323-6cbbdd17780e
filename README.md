# Liquidity Nexus - Base Mini App

## 🎯 Overview

**Liquidity Nexus** is a decentralized platform for users to easily supply liquidity, borrow assets with optimized rates, and manage their crypto portfolios on Base.

**Tagline**: Supercharge Your Crypto Yields: Supply, Borrow, and Earn with Confidence.

## ✨ Features

### Core DeFi Features
- **Supply Assets**: Supply tokens to earn yield through Aave V3 protocol
- **Borrow Assets**: Borrow against collateral with real-time health factor monitoring
- **Yield Strategies**: Automated strategies with different risk profiles
- **Portfolio Dashboard**: Real-time balance and position tracking
- **Risk Management**: Health factor calculations and liquidation alerts

### Technical Features
- **Base Network Integration**: Full blockchain integration with Base network
- **Coinbase Wallet**: Seamless wallet connection and transaction handling
- **Farcaster Frames**: Embeddable in Farcaster for social DeFi
- **Real-time Data**: Live APY rates and market data
- **Mobile Optimized**: Perfect mobile-first DeFi experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Coinbase Wallet or compatible Web3 wallet

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vistara-apps/ec32b043-343d-4aea-b323-6cbbdd17780e.git
   cd ec32b043-343d-4aea-b323-6cbbdd17780e
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your configuration:
   ```env
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
   NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
   NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
   ```

4. **Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base Network with viem/wagmi
- **Wallet**: Coinbase Wallet SDK
- **UI Components**: Custom component library

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # API routes (Farcaster frames)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Main page
│   └── providers.tsx     # Context providers
├── components/            # React components
│   ├── features/         # Feature components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                  # Utilities and services
│   ├── constants.ts      # App constants
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 📊 Data Model

### User
```typescript
interface User {
  userId: string;
  connectedWalletAddress: string;
  notificationPreferences: NotificationPreferences;
  transactionHistoryId: string;
}
```

### Position
```typescript
interface Position {
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
```

### Transaction
```typescript
interface Transaction {
  transactionId: string;
  userId: string;
  type: 'supply' | 'borrow' | 'repay' | 'withdraw';
  asset: string;
  amount: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  fee: number;
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (hsl(200, 80%, 50%))
- **Accent**: Golden yellow (hsl(40, 90%, 55%))
- **Background**: Dark gradient
- **Surface**: Glass morphism cards
- **Text**: White with opacity variants

### Components
- **AppShell**: Main layout with navigation
- **Card**: Glass morphism container
- **Button**: Primary, secondary, outline variants
- **InputWithLabel**: Form input with validation
- **AssetDisplay**: Token information display
- **RiskIndicator**: Risk level visualization
- **Modal**: Transaction confirmation dialogs

## 🔗 API Integration

### Base Network RPC
- **Purpose**: Real-time on-chain data fetching
- **Endpoint**: Alchemy/Infura RPC providers
- **Data**: Prices, balances, APYs, pool data

### ERC-20 Token ABI
- **Purpose**: Token balance and approval management
- **Integration**: viem contract interactions
- **Features**: Balance fetching, approval flows

### Aave V3 Protocol
- **Purpose**: Lending and borrowing operations
- **Contracts**: Supply, borrow, repay, withdraw
- **Features**: Real APY calculations, health factors

### Farcaster Frames
- **Purpose**: Social media embeddability
- **Endpoint**: `/api/frame`
- **Features**: Interactive buttons, image generation

## 📱 User Flows

### 1. Wallet Connection
1. User clicks "Connect Wallet"
2. Coinbase Wallet prompts for authorization
3. Wallet address displayed
4. User presented with app intro

### 2. Supplying Liquidity
1. Navigate to Supply section
2. Select asset and amount
3. Review APY and risk indicators
4. Confirm transaction in wallet
5. Position created and displayed

### 3. Borrowing Assets
1. Navigate to Borrow section
2. Select asset and amount
3. Review collateral requirements
4. Confirm transaction in wallet
5. Borrowed assets received

### 4. Managing Positions
1. View active positions in Dashboard
2. Monitor health factors and APYs
3. Execute repay/withdraw actions
4. Real-time position updates

## 🚀 Deployment

### Environment Variables
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
```

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start
```

### Farcaster Frame Deployment
The app includes Farcaster frame support at `/api/frame` for embedding in Farcaster posts.

## 🔒 Security

- **Input Validation**: All user inputs validated
- **Transaction Safety**: Gas estimation and error handling
- **Wallet Security**: Secure wallet connection flows
- **Contract Interactions**: Safe contract ABIs and error handling

## 📈 Performance

- **Optimized Builds**: Next.js production optimizations
- **Lazy Loading**: Component and route lazy loading
- **Caching**: Efficient data caching strategies
- **Mobile First**: Optimized for mobile DeFi usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API specifications

---

**Built with ❤️ for the Base ecosystem**

