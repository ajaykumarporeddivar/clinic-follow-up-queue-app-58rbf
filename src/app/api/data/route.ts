import { NextRequest } from 'next/server';
import {
  MOCK_CLINICS,
  MOCK_CLIENTS,
  MOCK_FOLLOW_UP_ITEMS,
  MOCK_REPORTS,
  STATS,
} from '@/lib/data';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(): Promise<Response> {
  return Response.json(
    {
      ok: true,
      data: {
        clinics: MOCK_CLINICS,
        clients: MOCK_CLIENTS,
        followUpItems: MOCK_FOLLOW_UP_ITEMS,
        reports: MOCK_REPORTS,
        stats: STATS,
      },
      // Using the length of the primary entity (FollowUpItem) for the main 'total' field
      total: MOCK_FOLLOW_UP_ITEMS.length,
    },
    { headers: corsHeaders }
  );
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    return Response.json(
      {
        ok: true,
        message: 'Demo mode — data not persisted',
        received: body,
      },
      { headers: corsHeaders, status: 200 }
    );
  } catch (error) {
    console.error('Failed to parse POST body:', error);
    return Response.json(
      { ok: false, message: 'Invalid JSON body' },
      { headers: corsHeaders, status: 400 }
    );
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}