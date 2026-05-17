'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Input, Select, Textarea } from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { formatDate } from '@/lib/utils'
import { MOCK_FOLLOW_UP_ITEMS, MOCK_REPORTS } from '@/lib/data'
import { Search, Plus, Download, Eye, Check, Archive, XCircle, CheckCircle } from 'lucide-react'
import type { FollowUpItem, Report } from '@/lib/types' // Import types for strict typing

export default function FeaturePage() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''

  // Common state for highlighting selected rows (if applicable)
  const [selected, setSelected] = useState<string | null>(null)

  // ── Feature 1: Client Follow-up Intake (/dashboard/intake) ──────────────────────
  if (slug === 'intake') {
    const [clientName, setClientName] = useState<string>('')
    const [clientContact, setClientContact] = useState<string>('')
    const [followUpType, setFollowUpType] = useState<'Reminder' | 'Check-in' | 'Re-booking' | 'Consultation' | 'Other'>('Reminder')
    const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium')
    const [dueDate, setDueDate] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [submissionMessage, setSubmissionMessage] = useState<string>('')

    const handleIntakeSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!clientName.trim() || !followUpType) {
        setSubmissionStatus('error')
        setSubmissionMessage('Client Name and Follow-up Type are required.')
        setTimeout(() => setSubmissionStatus('idle'), 3000)
        return
      }

      // Simulate adding a new FollowUpItem.
      // In a real application, this would involve an API call and likely updating a global state store.
      // For this mock data setup, we just simulate the UI feedback.
      const newItem: FollowUpItem = {
        id: `fui_${Date.now()}`,
        clinicId: 'cln_001', // Example clinic ID
        clientId: `cli_new_${Date.now()}`, // Placeholder for a new client
        userId: 'usr_12345', // Example user ID
        clientName: clientName.trim(),
        clientContact: clientContact.trim() || undefined,
        followUpType,
        urgency,
        dueDate: dueDate || undefined,
        notes: notes.trim() || undefined,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      // Although MOCK_FOLLOW_UP_ITEMS is a constant, conceptually a new item is "created".
      // We don't modify it here to avoid direct manipulation of imported constants.
      // The dashboard page will fetch MOCK_FOLLOW_UP_ITEMS afresh on reload.

      setSubmissionStatus('success')
      setSubmissionMessage('Follow-up created successfully!')
      setClientName('')
      setClientContact('')
      setFollowUpType('Reminder')
      setUrgency('Medium')
      setDueDate('')
      setNotes('')
      setTimeout(() => setSubmissionStatus('idle'), 3000)
    }

    return (
      <div className="space-y-6">
        <AppHeader
          title="Client Follow-up Intake"
          subtitle="Quickly capture new client follow-up needs from various sources."
        />
        <Card className="max-w-2xl mx-auto p-6">
          <CardTitle className="mb-4">New Follow-up Item</CardTitle>
          <form onSubmit={handleIntakeSubmit} className="space-y-4">
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-zinc-700 mb-1">Client Name <span className="text-red-500">*</span></label>
              <Input
                id="clientName"
                type="text"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="e.g., Jane Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="clientContact" className="block text-sm font-medium text-zinc-700 mb-1">Client Contact (Email/Phone)</label>
              <Input
                id="clientContact"
                type="text"
                value={clientContact}
                onChange={e => setClientContact(e.target.value)}
                placeholder="e.g., jane@example.com or (555) 123-4567"
              />
            </div>
            <div>
              <label htmlFor="followUpType" className="block text-sm font-medium text-zinc-700 mb-1">Follow-up Type <span className="text-red-500">*</span></label>
              <Select
                id="followUpType"
                value={followUpType}
                onChange={e => setFollowUpType(e.target.value as 'Reminder' | 'Check-in' | 'Re-booking' | 'Consultation' | 'Other')}
                required
              >
                <option value="Reminder">Reminder</option>
                <option value="Check-in">Check-in</option>
                <option value="Re-booking">Re-booking</option>
                <option value="Consultation">Consultation</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-zinc-700 mb-1">Urgency</label>
              <Select
                id="urgency"
                value={urgency}
                onChange={e => setUrgency(e.target.value as 'Low' | 'Medium' | 'High' | 'Critical')}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </Select>
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-zinc-700 mb-1">Due Date</label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-zinc-700 mb-1">Notes</label>
              <Textarea
                id="notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add any relevant notes for this follow-up..."
                rows={3}
              />
            </div>
            {submissionStatus === 'success' && (
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md px-4 py-2 text-sm">
                <CheckCircle size={16} /> {submissionMessage}
              </div>
            )}
            {submissionStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2 text-sm">
                <XCircle size={16} /> {submissionMessage}
              </div>
            )}
            <Button type="submit" className="w-full">
              <Plus size={16} className="mr-1" /> Create Follow-up
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  // ── Feature 2: Follow-up Queue Dashboard (/dashboard/dashboard) ──────────────────────
  if (slug === 'dashboard') {
    const [