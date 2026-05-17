import { NextRequest } from 'next/server';
import {
  MOCK_CLINICS,
  MOCK_CLIENTS,
  MOCK_FOLLOW_UP_ITEMS,
  MOCK_REPORTS,
  Clinic,
  Client,
  FollowUpItem,
  Report,
} from '@/lib/data';

type SearchableItem = Clinic | Client | FollowUpItem | Report;

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get('q')?.toLowerCase() || '';
  const type = searchParams.get('type')?.toLowerCase(); // Optional: 'clinic', 'client', 'followupitem', 'report'

  let allResults: SearchableItem[] = [];

  if (!q) {
    // If query is empty, return first 5 items from MOCK_FOLLOW_UP_ITEMS
    const defaultResults = MOCK_FOLLOW_UP_ITEMS.slice(0, 5);
    return Response.json({
      ok: true,
      data: { results: defaultResults, total: defaultResults.length, query: q },
    });
  }

  const searchInEntity = (
    items: SearchableItem[],
    fields: string[]
  ): SearchableItem[] => {
    return items.filter(item =>
      fields.some(field => {
        const value = (item as any)[field];
        return typeof value === 'string' && value.toLowerCase().includes(q);
      })
    );
  };

  if (!type || type === 'clinic') {
    allResults = allResults.concat(searchInEntity(MOCK_CLINICS, ['name']));
  }
  if (!type || type === 'client') {
    allResults = allResults.concat(searchInEntity(MOCK_CLIENTS, ['name']));
  }
  if (!type || type === 'followupitem') {
    allResults = allResults.concat(
      searchInEntity(MOCK_FOLLOW_UP_ITEMS, ['clientName', 'notes'])
    );
  }
  if (!type || type === 'report') {
    allResults = allResults.concat(searchInEntity(MOCK_REPORTS, ['title']));
  }

  // Limit to max 20 results
  const limitedResults = allResults.slice(0, 20);

  return Response.json({
    ok: true,
    data: { results: limitedResults, total: limitedResults.length, query: q },
  });
}