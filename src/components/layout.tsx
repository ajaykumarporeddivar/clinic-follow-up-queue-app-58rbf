'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, Button, Avatar } from '@/components/ui';
import { LayoutDashboard, PlusSquare, FileText } from 'lucide-react';

interface AppHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export function AppHeader({ title, subtitle, actions }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between p-6 bg-white border-b border-zinc-200">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">{title}</h1>
        <p className="text-zinc-600 text-sm">{subtitle}</p>
      </div>
      {actions && <div>{actions}</div>}
    </header>
  );
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface AppSidebarProps {
  projectName: string;
  items: NavItem[];
}

export function AppSidebar({ projectName, items }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-zinc-900 text-zinc-100 p-4 pt-16 flex flex-col z-40">
      <div className="mb-8 mt-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-50">{projectName}</h2>
        <p className="text-zinc-400 text-sm">Clinic Admin</p>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  'hover:bg-zinc-700 hover:text-white',
                  pathname === item.href ? 'bg-zinc-700 text-white' : 'text-zinc-300'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-zinc-700">
        <div className="flex items-center gap-3 text-zinc-300">
          <Avatar name="EV" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Eleanor Vance</span>
            <span className="text-xs text-zinc-400">Clinic Owner</span>
          </div>
        </div>
      </div>
    </aside>
  );
}