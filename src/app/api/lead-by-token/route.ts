import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token || token.length < 5) {
    return NextResponse.json({ error: 'Nieprawidłowy token zgłoszenia' }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
    return NextResponse.json({ error: 'Supabase nie jest skonfigurowany w VroomScout' }, { status: 500 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Query by access_token
    let { data: lead } = await supabase
      .from('scout_leads')
      .select('*')
      .eq('access_token', token)
      .maybeSingle();

    // 2. Query by UUID id
    if (!lead) {
      const { data: leadById } = await supabase
        .from('scout_leads')
        .select('*')
        .eq('id', token)
        .maybeSingle();
      lead = leadById;
    }

    if (!lead) {
      return NextResponse.json({ error: 'Nie znaleziono leada w bazie' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, lead },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Wystąpił błąd podczas odczytu zgłoszenia' },
      { status: 500 }
    );
  }
}
