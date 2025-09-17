# Liquidity Nexus - Base Mini App

A decentralized platform for users to easily supply liquidity, borrow assets with optimized rates, and manage their crypto portfolios on Base.

## Features

- **Simplified Yield Optimization**: Automated strategies to maximize returns on supplied assets
- **Risk-Adjusted Return Transparency**: Clear display of potential risks alongside projected earnings
- **Dynamic Rate Discovery**: Finding the most competitive borrowing rates across different protocols
- **Intuitive Collateral Management**: Easy-to-use interface for managing positions and preventing liquidations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   └── globals.css        # Global styles and design tokens
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── features/          # Feature-specific components
├── lib/
│   ├── types.ts           # TypeScript type definitions
│   ├── utils.ts           # Utility functions
│   └── constants.ts       # App constants and mock data
```

## Design System

The app uses a custom design system with:
- **Primary Color**: Blue (`hsl(200, 80%, 50%)`)
- **Accent Color**: Gold (`hsl(40, 90%, 55%)`)
- **Glass morphism effects** for modern UI
- **Mobile-first responsive design**
- **Consistent spacing and typography**

## Key Components

- **Dashboard**: Portfolio overview and position management
- **Supply Interface**: Asset supply with APY optimization
- **Borrow Interface**: Collateralized borrowing with health factor monitoring
- **Yield Strategies**: Automated yield farming strategies
- **Wallet Connection**: MiniKit-powered wallet integration

## Development

This is a Base Mini App built with:
- MiniKit for Base App integration
- OnchainKit for wallet and identity features
- TypeScript for type safety
- Tailwind CSS for styling
- Mock data for demonstration (replace with real DeFi protocol integrations)

## License

MIT License - see LICENSE file for details
