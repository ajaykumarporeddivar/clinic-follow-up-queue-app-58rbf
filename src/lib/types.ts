export type Status = 'pending' | 'active' | 'completed' | 'on-hold' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type FollowUpType = 'call' | 'email' | 'in-person' | 'report' | 'other';
export type ClientRisk = 'low' | 'medium' | 'high';
export type ActivityType = 'note' | 'call' | 'email' | 'report_generated' | 'status_change';
export type ChartPeriod = 'week' | 'month' | 'quarter' | 'year';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  avatar: string;
  joinedAt: string; // ISO date string
}

export interface Clinic {
  id: string;
  userId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Client {
  id: string;
  clinicId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lastVisit: string; // ISO date string
  nextFollowUp: string | null; // ISO date string
  status: Status;
  risk: ClientRisk;
  notes: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface FollowUpItem {
  id: string;
  clinicId: string;
  clientId: string;
  title: string;
  description: string;
  type: FollowUpType;
  priority: Priority;
  status: Status;
  dueDate: string; // ISO date string
  assignedTo: string; // User ID or Name
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  notes: ActivityItem[];
}

export interface Report {
  id: string;
  clinicId: string;
  clientId: string;
  title: string;
  description: string;
  type: 'client_summary' | 'performance_overview' | 'followup_status';
  generatedAt: string; // ISO date string
  content: string; // Markdown or plain text
  status: 'draft' | 'generated' | 'sent';
  filePath?: string; // Mock path for download
}

export interface ActivityItem {
  id: string;
  followUpId: string;
  timestamp: string; // ISO date string
  actor: string; // User ID or Name
  type: ActivityType;
  details: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartData {
  id: string;
  title: string;
  data: ChartDataPoint[];
  period: ChartPeriod;
}

export interface SparklineData {
  id: string;
  label: string;
  value: number;
  data: number[];
  change: number; // percentage change
  trend: 'up' | 'down' | 'flat';
}