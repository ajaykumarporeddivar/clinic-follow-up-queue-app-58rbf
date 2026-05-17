'use client';

import React from 'react';

// Re-using cn utility from ui.tsx
import { cn } from '@/components/ui';

interface BarChartProps {
  labels: string[];
  data: number[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function BarChart({ labels, data, title, subtitle, className }: BarChartProps) {
  if (data.length === 0 || labels.length === 0) {
    return (
      <div className={cn("flex flex-col h-full justify-center items-center text-zinc-500", className)}>
        No data available for chart.
      </div>
    );
  }

  const maxValue = Math.max(...data);
  const barWidth = 100 / data.length; // Percentage width for each bar

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-bold text-zinc-900 tracking-tight">{title}</h3>}
          {subtitle && <p className="text-zinc-600 text-sm">{subtitle}</p>}
        </div>
      )}
      <div className="flex-1 min-h-[150px] relative">
        <div className="absolute inset-0 flex items-end">
          {data.map((value, index) => (
            <div
              key={labels[index] || index}
              className="group relative flex flex-col justify-end items-center"
              style={{ width: `${barWidth}%` }}
            >
              <div
                className="w-3/5 bg-zinc-700 hover:bg-zinc-900 rounded-t-sm transition-all duration-200"
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
              <span className="absolute -top-6 text-xs text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-zinc-500">
        {labels.map((label, index) => (
          <span key={index} className="flex-1 text-center whitespace-nowrap overflow-hidden text-ellipsis">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
  className?: string;
}

export function Sparkline({
  data,
  width = 100,
  height = 30,
  strokeColor = '#52525B', // zinc-700
  fillColor = 'none',
  className,
}: SparklineProps) {
  if (!data || data.length < 2) {
    return <div className={cn("text-xs text-zinc-400", className)} style={{ width, height }}>N/A</div>;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min === 0 ? 1 : max - min; // Avoid division by zero if all values are same

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height; // Invert Y for SVG coordinates
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
    >
      <polyline
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1"
        points={points}
      />
    </svg>
  );
}