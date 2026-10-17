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
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token);

    // 1. Query by access_token
    let lead = null;
    try {
      const { data } = await supabase
        .from('scout_leads')
        .select('*')
        .eq('access_token', token)
        .maybeSingle();
      if (data) lead = data;
    } catch {
      // ignore
    }

    // 2. Short prefix match for old 36-char leads (e.g. token '3f450a84' matches '3f450a84-2517-4d9b...')
    if (!lead && token.length >= 6 && token.length <= 12) {
      try {
        const { data } = await supabase
          .from('scout_leads')
          .select('*')
          .ilike('access_token', `${token}%`)
          .limit(1)
          .maybeSingle();
        if (data) lead = data;
      } catch {
        // ignore
      }
    }

    // 3. Backward match: if someone clicks old 36-char link after DB was shortened to 8 chars
    if (!lead && isUuid) {
      try {
        const shortPart = token.substring(0, 8);
        const { data } = await supabase
          .from('scout_leads')
          .select('*')
          .eq('access_token', shortPart)
          .maybeSingle();
        if (data) lead = data;
      } catch {
        // ignore
      }
    }

    // 4. Query by UUID id (only if token is a valid UUID)
    if (!lead && isUuid) {
      try {
        const { data: leadById } = await supabase
          .from('scout_leads')
          .select('*')
          .eq('id', token)
          .maybeSingle();
        lead = leadById;
      } catch {
        // ignore
      }
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
