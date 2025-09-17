'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS } from '@/lib/constants';

interface AppShellProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppShell({ children, activeTab, onTabChange }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="glass-card m-4 mb-0 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold gradient-text">
            Liquidity Nexus
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Supercharge Your Crypto Yields
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="glass-card m-4 mt-0 p-2">
        <div className="flex justify-around">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'flex flex-col items-center space-y-1 p-3 rounded-lg transition-all duration-200',
                activeTab === item.id
                  ? 'bg-primary/20 text-primary'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
