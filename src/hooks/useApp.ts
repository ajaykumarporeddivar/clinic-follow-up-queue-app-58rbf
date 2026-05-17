'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// SSR-safe localStorage hook
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initial;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initial;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// Filtering and searching hook
export function useFilter<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T)[]
): { filtered: T[]; search: string; setSearch: (s: string) => void; status: string; setStatus: (s: string) => void } {
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>(''); // For filtering by an item's status property

  const filtered = items.filter((item) => {
    const matchesSearch = search.trim() === '' || fields.some((field) => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(search.toLowerCase());
    });

    const matchesStatus = status.trim() === '' || (item as { status?: string }).status === status;

    return matchesSearch && matchesStatus;
  });

  return { filtered, search, setSearch, status, setStatus };
}

// Generic modal control hook
export function useModal<T = unknown>(): {
  isOpen: boolean;
  open: (item?: T) => void;
  close: () => void;
  activeItem: T | null;
} {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const open = useCallback((item?: T) => {
    setIsOpen(true);
    if (item) {
      setActiveItem(item);
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveItem(null);
  }, []);

  return { isOpen, open, close, activeItem };
}

// Demo toast notification hook
export function useDemoToast(): {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
  show: (msg: string, type?: 'success' | 'error' | 'info') => void;
} {
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const [visible, setVisible] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const show = useCallback((msg: string, toastType: 'success' | 'error' | 'info' = 'info') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setMessage(msg);
    setType(toastType);
    setVisible(true);
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setMessage('');
    }, 2500); // Auto-hides after 2.5 seconds
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { message, type, visible, show };
}