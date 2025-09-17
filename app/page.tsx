'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { WalletConnection } from '@/components/features/WalletConnection';
import { Dashboard } from '@/components/features/Dashboard';
import { SupplyInterface } from '@/components/features/SupplyInterface';
import { BorrowInterface } from '@/components/features/BorrowInterface';
import { YieldStrategies } from '@/components/features/YieldStrategies';

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
