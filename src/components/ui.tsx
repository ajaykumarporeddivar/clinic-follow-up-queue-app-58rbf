'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Info,
  TriangleAlert,
  X,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

export function cn(...inputs: Parameters<typeof clsx>): string {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  href?: string;
  children: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className,
  href,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-lg';

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  };

  const variantStyles = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
    outline: 'border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
    ghost: 'hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const loadingStyles = 'pointer-events-none';

  const content = (
    <>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </>
  );

  const classes = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    (disabled || loading) && disabledStyles,
    loading && loadingStyles,
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('bg-white border border-zinc-200 rounded-xl shadow-sm', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={cn('font-bold text-zinc-900 tracking-tight text-lg', className)}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variantStyles = {
    default: 'bg-zinc-100 text-zinc-700',
    success: 'text-emerald-600 bg-emerald-50 border-emerald-200 border',
    warning: 'text-amber-600 bg-amber-50 border-amber-200 border',
    error: 'text-red-600 bg-red-50 border-red-200 border',
    info: 'bg-blue-50 text-blue-600 border border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border border-purple-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className, id, ...props }: InputProps) {
  const inputId = id || props.name || `input-${Math.random().toString(36).substring(2, 9)}`;
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-10',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn('h-4 w-4 animate-spin text-zinc-400', className)} />;
}

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();

  const colors = [
    'bg-red-200 text-red-800', 'bg-blue-200 text-blue-800', 'bg-green-200 text-green-800',
    'bg-yellow-200 text-yellow-800', 'bg-purple-200 text-purple-800', 'bg-indigo-200 text-indigo-800'
  ];
  const colorIndex = initials.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full font-medium',
        sizeClasses[size],
        bgColor,
        className
      )}
    >
      {initials}
    </div>
  );
}

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

// Re-declare Sparkline here from charts.tsx for StatCard to use directly
// This avoids a circular dependency or needing to import a client component into another client component's file.
// In a real app, this would be a separate shared file or direct import.
export function Sparkline({ data, color = '#6366f1', width = 80, height = 28 }: SparklineProps) {
  if (!data || data.length < 2) {
    return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} />;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    let y = 0;
    if (max === min) {
      y = height / 2; // All values are the same, draw a flat line
    } else {
      y = height - ((d - min) / (max - min)) * height;
    }
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  sparkline?: number[];
  className?: string;
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, sparkline, className }: StatCardProps) {
  const changeColor = {
    up: 'text-emerald-600',
    down: 'text-red-500',
    neutral: 'text-zinc-500',
  }[changeType];

  return (
    <Card className={cn('p-4 flex flex-col', className)}>
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-zinc-500">{title}</p>
        {icon && <div className="text-zinc-400">{icon}</div>}
      </div>
      <div className="flex items-end justify-between mt-1">
        <p className="text-3xl font-bold text-zinc-900 tracking-tight">{value}</p>
        {sparkline && <Sparkline data={sparkline} width={80} height={28} color="#818cf8" />}
      </div>
      {change && (
        <div className="mt-2 flex items-center text-sm">
          {changeType === 'up' && <ArrowUp className={cn('h-4 w-4 mr-1', changeColor)} />}
          {changeType === 'down' && <ArrowDown className={cn('h-4 w-4 mr-1', changeColor)} />}
          <span className={cn('font-medium', changeColor)}>{change}</span>
          <span className="text-zinc-500 ml-1">since last month</span>
        </div>
      )}
    </Card>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fadein">
      <div
        ref={modalRef}
        className={cn(
          'relative w-full bg-white rounded-2xl shadow-xl animate-slideup',
          sizeClasses[size]
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h3 id="modal-title" className="text-xl font-bold text-zinc-900 tracking-tight">
            {title}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="h-5 w-5 text-zinc-400" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-zinc-200">
      <div className="p-3 bg-zinc-100 rounded-lg text-zinc-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-2">{title}</h3>
      <p className="text-zinc-600 mb-4 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

interface TableProps<T> {
  columns: Array<{ key: string; label: string; render?: (row: T) => React.ReactNode }>;
  data: T[];
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T extends { id?: string | number }>({ columns, data, onRowClick, className }: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-zinc-500">
                  No data to display.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={cn(
                    'transition-colors',
                    onRowClick && 'cursor-pointer hover:bg-zinc-50'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={`${String(row.id || rowIndex)}-${column.key}`}
                      className="whitespace-nowrap px-6 py-4 text-sm text-zinc-600"
                    >
                      {column.render ? column.render(row) : (row as any)[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Utility for Select component (can be added if needed, kept compact to respect token budget)
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const selectId = id || props.name || `select-${Math.random().toString(36).substring(2, 9)}`;
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            'block w-full h-10 rounded-md border border-zinc-200 bg-white py-2 pl-3 pr-8 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-zinc-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

// Utility for Textarea (can be added if needed)
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const textareaId = id || props.name || `textarea-${Math.random().toString(36).substring(2, 9)}`;
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}