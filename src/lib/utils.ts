import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind classes with clsx for conditional classes and twMerge for resolving conflicts.
 * @param inputs Class values to combine.
 * @returns A single, merged string of class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency (e.g., "$1,234.56").
 * @param amount The number to format.
 * @param currency The currency code (e.g., "USD").
 * @param locale The locale (e.g., "en-US").
 * @returns Formatted currency string.
 */
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats an ISO date string into a more readable format (e.g., "Jan 1, 2023").
 * @param isoString The ISO date string to format.
 * @returns Formatted date string or "N/A" if invalid.
 */
export function formatDate(isoString: string): string {
  if (!isoString) return 'N/A';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}

/**
 * Formats an ISO date string into a full date and time format (e.g., "Jan 1, 2023, 10:30 AM").
 * @param isoString The ISO date string to format.
 * @returns Formatted date-time string.
 */
export function formatDateTime(isoString: string): string {
  if (!isoString) return 'N/A';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  } catch (error) {
    console.error('Error formatting date-time:', error);
    return 'Invalid Date';
  }
}

/**
 * Formats an ISO date string into a relative time string (e.g., "2 hours ago", "3 days from now").
 * @param isoString The ISO date string to format.
 * @param locale The locale (e.g., "en-US").
 * @returns Relative time string.
 */
export function formatRelativeTime(isoString: string, locale: string = 'en-US'): string {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  const now = new Date();
  const diffSeconds = Math.round((date.getTime() - now.getTime()) / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffSeconds) < 60) return rtf.format(0, 'second');
  if (Math.abs(diffSeconds) < 3600) return rtf.format(Math.round(diffSeconds / 60), 'minute');
  if (Math.abs(diffSeconds) < 86400) return rtf.format(Math.round(diffSeconds / 3600), 'hour');
  if (Math.abs(diffSeconds) < 2592000) return rtf.format(Math.round(diffSeconds / 86400), 'day'); // 30 days
  if (Math.abs(diffSeconds) < 31536000) return rtf.format(Math.round(diffSeconds / 2592000), 'month'); // 12 months
  return rtf.format(Math.round(diffSeconds / 31536000), 'year');
}

/**
 * Truncates a string to a specified length and appends "..." if it's longer.
 * @param str The string to truncate.
 * @param len The maximum length.
 * @returns The truncated string.
 */
export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + '...';
}

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to a URL-friendly slug.
 * @param str The string to slugify.
 * @returns The slugified string.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates a unique ID. Prefers crypto.randomUUID for modern browsers, falls back to Math.random.
 * @returns A unique ID string.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param num The number to clamp.
 * @param min The minimum allowed value.
 * @param max The maximum allowed value.
 * @returns The clamped number.
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Formats a number with thousands separators (e.g., "1,234,567").
 * @param value The number to format.
 * @param locale The locale (e.g., "en-US").
 * @returns Formatted number string.
 */
export function formatNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Groups an array of objects by a common property.
 * @param array The array of objects to group.
 * @param key The key to group by.
 * @returns An object where keys are the grouped values and values are arrays of objects.
 */
export function groupBy<T extends Record<string, any>>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Sorts an array of objects by a specified property.
 * @param array The array of objects to sort.
 * @param key The key to sort by.
 * @param order 'asc' for ascending, 'desc' for descending.
 * @returns The sorted array.
 */
export function sortBy<T extends Record<string, any>>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === 'asc' ? aVal - bVal : bVal - aVal;
    }
    // Fallback for other types, or if one is null/undefined
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}