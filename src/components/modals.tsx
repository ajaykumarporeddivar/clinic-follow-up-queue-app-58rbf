'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarDays,
  CircleCheck,
  Archive,
  Trash2,
  AlertTriangle,
  Info,
  Search,
  ChevronDown,
} from 'lucide-react';
import {
  Modal,
  Button,
  Badge,
  Avatar,
  Input,
  Command as CommandUI,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  cn,
} from '@/components/ui';
import { useDemoToast } from '@/hooks/useApp';

// Utility to format values for display
const formatDetailValue = (key: string, value: unknown): React.ReactNode => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'string' && key.toLowerCase().includes('date') && !isNaN(new Date(value as string).getTime())) {
    return new Date(value as string).toLocaleString();
  }
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value);
};

// Utility to determine badge variant for status
const getStatusBadgeVariant = (status: string | undefined): 'default' | 'info' | 'success' | 'warning' | 'danger' | 'secondary' => {
  switch (status?.toLowerCase()) {
    case 'pending':
    case 'draft':
      return 'info';
    case 'active':
    case 'completed':
    case 'generated':
    case 'sent':
      return 'success';
    case 'inactive':
    case 'archived':
      return 'secondary';
    case 'critical':
    case 'high':
      return 'danger';
    case 'medium':
      return 'warning';
    default:
      return 'default';
  }
};

interface EntityDetailModalProps {
  item: Record<string, unknown> | null;
  open: boolean;
  onClose: () => void;
  title: string;
}

export function EntityDetailModal({ item, open, onClose, title }: EntityDetailModalProps) {
  const { show: showToast } = useDemoToast();

  if (!item) return null;

  const itemStatus = item.status as string | undefined;

  const handleAction = (action: string) => {
    showToast(`${action} action triggered for ${item.clientName || item.title || item.name || 'item'}`, 'info');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="p-4 sm:p-6 space-y-4">
        {itemStatus && (
          <div className="flex justify-end -mt-2 -mr-2 mb-2">
            <Badge variant={getStatusBadgeVariant(itemStatus)}>{itemStatus}</Badge>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          {Object.entries(item).map(([key, value]) => {
            if (key === 'id' || key.toLowerCase().includes('clinicid') || key.toLowerCase().includes('userid')) return null;
            return (
              <div key={key} className="flex flex-col">
                <span className="font-medium text-zinc-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-zinc-900 break-words">
                  {formatDetailValue(key, value)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleAction('Delete')}>
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
          <Button variant="secondary" onClick={() => handleAction('Archive')}>
            <Archive className="h-4 w-4 mr-2" /> Archive
          </Button>
          <Button variant="primary" onClick={() => handleAction('Approve')}>
            <CircleCheck className="h-4 w-4 mr-2" /> Approve
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  variant?: 'danger' | 'info';
}

export function ConfirmModal({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel = 'Confirm',
  variant = 'info',
}: ConfirmModalProps) {
  const confirmButtonVariant = variant === 'danger' ? 'danger' : 'primary';
  const Icon = variant === 'danger' ? AlertTriangle : Info;

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="p-4 sm:p-6 flex items-start space-x-4">
        <Icon
          className={cn(
            'h-6 w-6 flex-shrink-0',
            variant === 'danger' ? 'text-red-500' : 'text-blue-500'
          )}
        />
        <div>
          <p className="text-sm text-zinc-700">{message}</p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant={confirmButtonVariant} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

interface CommandPaletteItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandPaletteItem[];
}

export function CommandPalette({ open, onClose, items }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  useEffect(() => {
    if (open) {
      setSearch('');
      setSelectedIndex(0);
      // Timeout to ensure modal is rendered before attempting focus
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (filteredItems[selectedIndex]) {
          router.push(filteredItems[selectedIndex].href);
          onClose();
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredItems, selectedIndex, router, onClose]);

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} title="Command Palette" showCloseButton={false} className="max-w-xl">
      <CommandUI className="rounded-xl shadow-md border border-zinc-200 bg-white">
        <CommandInput
          ref={inputRef}
          value={search}
          onValueChange={setSearch}
          placeholder="Search commands and navigate..."
          className="h-12 border-0 focus:ring-0 text-base"
        />
        <CommandList className="max-h-[300px]">
          {filteredItems.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
          <CommandGroup heading="Suggestions">
            {filteredItems.map((item, index) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => {
                  router.push(item.href);
                  onClose();
                }}
                className={cn(
                  'flex items-center gap-2 cursor-pointer',
                  selectedIndex === index && 'bg-zinc-100'
                )}
              >
                {item.icon && <span className="text-zinc-500">{item.icon}</span>}
                <div>
                  <div className="font-medium text-zinc-800">{item.label}</div>
                  {item.description && <div className="text-sm text-zinc-500">{item.description}</div>}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandUI>
    </Modal>
  );
}