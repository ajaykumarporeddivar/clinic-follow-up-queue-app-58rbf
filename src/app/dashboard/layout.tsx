'use client';

import { AppSidebar } from '@/components/layout';
import { LayoutDashboard, PlusSquare, FileText } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  { icon: <PlusSquare size={16} />, label: 'New Follow-up', href: '/dashboard/intake' },
  { icon: <LayoutDashboard size={16} />, label: 'Queue Dashboard', href: '/dashboard/dashboard' },
  { icon: <FileText size={16} />, label: 'Client Reports', href: '/dashboard/reporting' },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AppSidebar items={navItems} projectName="Clinic Follow-up Queue" />
      <div className="flex-1 ml-64 flex flex-col min-h-full">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}