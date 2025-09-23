'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { WalletConnection } from '@/components/features/WalletConnection';
import { Dashboard } from '@/components/features/Dashboard';
import { SupplyInterface } from '@/components/features/SupplyInterface';
import { BorrowInterface } from '@/components/features/BorrowInterface';
import { YieldStrategies } from '@/components/features/YieldStrategies';
import { X402TestSuite } from '@/components/features/X402TestSuite';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <WalletConnection />
            <Dashboard />
          </div>
        );
      case 'supply':
        return <SupplyInterface />;
      case 'borrow':
        return <BorrowInterface />;
      case 'strategies':
        return <YieldStrategies />;
      case 'x402-test':
        return <X402TestSuite />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AppShell>
  );
}
