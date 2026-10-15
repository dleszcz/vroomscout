import { NextRequest, NextResponse, after } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { checkIpRateLimit, validatePhoneNumber } from '@/lib/anti-spam';

export const maxDuration = 30;

function parseDeviceInfo(ua: string = '') {
  let deviceType = 'Komputer (Desktop)';
  let os = 'Nieznany';

  if (/ipad|tablet/i.test(ua)) deviceType = 'Tablet';
  else if (/mobile|iphone|android/i.test(ua)) deviceType = 'Smartfon (Mobile)';
  else deviceType = 'Komputer (Desktop)';

  if (/iphone/i.test(ua)) os = 'iPhone (iOS)';
  else if (/ipad/i.test(ua)) os = 'iPad (iPadOS)';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/macintosh|mac os x/i.test(ua)) os = 'Mac (macOS)';
  else if (/windows/i.test(ua)) os = 'PC (Windows)';
  else if (/linux/i.test(ua)) os = 'Linux';

  let browser = 'Przeglądarka';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua)) browser = 'Safari';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';

  return {
    deviceType,
    os,
    browser,
    summary: `${deviceType} • ${os} (${browser})`,
  };
}

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    // 1. IP Rate Limiting (max 5 leads per 10 minutes)
    if (!checkIpRateLimit(clientIp, 5, 10)) {
      console.warn(`[Anti-Spam] Rate limit exceeded for IP ${clientIp}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Zbyt wiele zgłoszeń z Twojego adresu IP. Ze względów bezpieczeństwa odczekaj 10 minut.',
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot check (hidden field only bots fill out)
    if (body.website || body.hp_token || body.company_fax) {
      console.warn(`[Anti-Spam] Bot blocked via honeypot from IP ${clientIp}`);
      return NextResponse.json({
        success: true,
        leadId: `scout-filtered-${Date.now()}`,
      });
    }

    // 3. Human duration check (< 2.5 seconds is impossible for a human on 4 steps)
    if (body.filledDurationMs && Number(body.filledDurationMs) < 2500) {
      console.warn(`[Anti-Spam] Fast bot blocked (${body.filledDurationMs}ms) from IP ${clientIp}`);
      return NextResponse.json({
        success: true,
        leadId: `scout-filtered-${Date.now()}`,
      });
    }

    const {
      sourceDomain,
      category,
      make,
      model,
      makeAndModel,
      year,
      fuel,
      condition,
      noInsurance,
      noMot,
      conditionNotes,
      expectedPriceAmount,
      isNegotiable,
      priceBracket,
      city,
      name,
      phone,
      consentDataSharing,
      consentPhoneContact,
      accessToken,
      photoUrls = [],
      userAgent,
    } = body;

    // 4. Validate phone number against spam sequences
    const phoneCheck = validatePhoneNumber(phone || '');
    if (!phoneCheck.isValid) {
      return NextResponse.json(
        { success: false, error: phoneCheck.error || 'Nieprawidłowy numer telefonu' },
        { status: 400 }
      );
    }

    // 5. Validate formal consents
    if (!consentPhoneContact || !consentDataSharing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Wymagane jest zaznaczenie zgód na kontakt i przekazanie danych.',
        },
        { status: 400 }
      );
    }

    const leadId = `scout-${Date.now()}`;

    const vehicleTitle = (
      makeAndModel ||
      `${make || ''} ${model || ''}`
    ).trim() || 'Pojazd';

    const priceDisplayString = expectedPriceAmount
      ? `${expectedPriceAmount} zł (${isNegotiable !== false ? 'do negocjacji' : 'sztywna'})`
      : priceBracket || 'Czeka na propozycję wyceny';

    const conditionNotesFormatted = [
      conditionNotes ? conditionNotes.trim() : '',
      noInsurance ? '⚠️ BRAK WAŻNEGO OC' : '',
      noMot ? '⚠️ BRAK WAŻNEGO PRZEGLĄDU' : '',
      expectedPriceAmount
        ? `Oczekiwana kwota: ${expectedPriceAmount} zł (${isNegotiable !== false ? 'do negocjacji' : 'bez negocjacji'})`
        : '',
    ]
      .filter(Boolean)
      .join(' | ');

    // 1. Server-side Supabase insert into dedicated scout_leads table (only if client insert wasn't done)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!body.directInsertDone && supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { error: scoutErr } = await supabase
          .from('scout_leads')
          .insert([
            {
              access_token: accessToken || crypto.randomUUID(),
              source_domain: sourceDomain || 'AutoZglowy.pl',
              category: category || 'osobowe',
              make_model: vehicleTitle,
              year: Number(year) || 2012,
              fuel: fuel || 'diesel',
              condition: condition || 'bardzo_dobry',
              condition_notes: conditionNotesFormatted || null,
              price_bracket: priceDisplayString,
              city: city || 'Polska',
              customer_name: name || 'Klient (Anonimowy)',
              customer_phone: phoneCheck.formattedPhone,
              photo_urls: photoUrls,
              consent_data_sharing: true,
              consent_phone_contact: true,
              accepted_terms_version: 'v1.0-2026-10',
              user_agent: userAgent || null,
              status: 'new',
            },
          ]);

        if (scoutErr) {
          console.warn('[Supabase scout_leads note]:', scoutErr.message);
        } else {
          console.log(`✅ [VroomScout] Lead pomyślnie zapisany w tabeli 'scout_leads'!`);
        }
      } catch (sbErr) {
        console.warn('[Server Supabase error]:', sbErr);
      }
    }

    // 2. Google Sheets / Google Drive Integration via Webhook (if configured)
    const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const rawUa = userAgent || req.headers.get('user-agent') || '';
    const deviceInfo = parseDeviceInfo(rawUa);
    const currentEnv =
      process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
        ? 'PROD'
        : 'DEV';
    const fillTimeSec = body.filledDurationMs
      ? `${Math.round(Number(body.filledDurationMs) / 1000)} s`
      : 'Brak';

    // Construct partner lead URL (localhost on dev, scout.vroomdealer.pl on prod)
    const host = req.headers.get('host') || 'localhost:3003';
    const isLocal = host.includes('localhost') || host.includes('127.0.0.1');

    const defaultLocalUrl = process.env.SCOUT_PARTNER_LOCAL_URL || 'http://localhost:3000';
    const defaultProdUrl = process.env.SCOUT_PARTNER_BASE_URL || 'https://scout.vroomdealer.pl';

    let partnerBaseUrl = isLocal ? defaultLocalUrl : defaultProdUrl;
    // Guarantee scout.vroomdealer.pl is used for partner verification card on production
    if (!isLocal && partnerBaseUrl.includes('vroomdealer.pl') && !partnerBaseUrl.includes('scout.')) {
      partnerBaseUrl = 'https://scout.vroomdealer.pl';
    }
    const partnerLeadUrl = accessToken ? `${partnerBaseUrl.replace(/\/$/, '')}/lead/${accessToken}` : '';

    // 2. Local persistent file backup (never lose a lead)
    try {
      const dataDir = path.join(process.cwd(), '.data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadEntry = {
        leadId,
        date: new Date().toISOString(),
        sourceDomain,
        vehicleTitle,
        year,
        fuel,
        condition,
        noInsurance: !!noInsurance,
        noMot: !!noMot,
        conditionNotes,
        expectedPrice: priceDisplayString,
        city,
        phone: phoneCheck.formattedPhone,
        name: name || '',
        photoUrls,
      };
      fs.appendFileSync(
        path.join(dataDir, 'leads_history.jsonl'),
        JSON.stringify(leadEntry) + '\n'
      );
    } catch {
      // ignore local file backup error on read-only environments
    }

    // 3. Prepare background payloads for Google Sheets and Resend Email
    const googleSheetsPayload = googleSheetsWebhookUrl
      ? {
          environment: currentEnv,
          leadId,
          timestamp: new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' }),
          sourceDomain: sourceDomain || 'AutoZglowy.pl',
          category: category || 'osobowe',
          make: make || '',
          model: model || '',
          vehicle: vehicleTitle,
          year: year || '',
          fuel: fuel || '',
          condition: condition || '',
          noInsurance: noInsurance ? 'TAK (brak OC - laweta)' : 'NIE (OC ważne)',
          noMot: noMot ? 'TAK (brak przeglądu)' : 'NIE (przegląd ważny)',
          expectedPrice: priceDisplayString,
          isNegotiable: isNegotiable !== false ? 'TAK' : 'NIE',
          conditionNotes: conditionNotes || '',
          city: city || '',
          phone: phoneCheck.formattedPhone,
          name: name || 'Brak',
          photosCount: photoUrls.length,
          photoUrls: photoUrls.join('\n'),
          deviceType: deviceInfo.deviceType,
          deviceSummary: deviceInfo.summary,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          fillTimeSec: fillTimeSec,
          tokenUrl: partnerLeadUrl || (accessToken ? `/lead/${accessToken}` : ''),
        }
      : null;

    // B. Resend Email notification
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'danielxleszczynski@gmail.com';

    if (resendApiKey) {
      const isZdajAuto = sourceDomain?.toLowerCase().includes('zdajauto');
      const brandBgColor = isZdajAuto ? '#7c3aed' : '#fdac04';
      const brandHeaderTextColor = isZdajAuto ? '#ffffff' : '#0f172a';
      const brandAccentColor = isZdajAuto ? '#7c3aed' : '#d97706';
      const brandLabel = isZdajAuto ? 'ZdajAuto.pl' : 'AutoZglowy.pl';

      const subject = `🔥 NOWY LEAD [${brandLabel}]: ${vehicleTitle} (${city || 'Polska'}) - ${priceDisplayString}`;

      const conditionLabelMap: Record<string, string> = {
        bardzo_dobry: '✨ Sprawny / do jazdy',
        drobne_poprawki: '🔧 Drobne poprawki (blacharka / kosmetyka)',
        wymaga_naprawy: '⚠️ Uszkodzony mechanicznie (silnik, skrzynia itp.)',
        niesprawny: '🛑 Powypadkowy / Po kolizji',
      };

      const emailHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:620px;margin:0 auto;padding:24px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;">
          <div style="background:${brandBgColor};padding:18px 24px;border-radius:12px;color:${brandHeaderTextColor};margin-bottom:20px;">
            <span style="background:${isZdajAuto ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)'};padding:4px 10px;border-radius:20px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;color:${brandHeaderTextColor};">
              VroomScout Engine
            </span>
            <h1 style="margin:10px 0 4px;font-size:22px;font-weight:900;color:${brandHeaderTextColor};">
              Nowy lead wyceny: ${vehicleTitle}
            </h1>
            <p style="margin:0;font-size:14px;color:${brandHeaderTextColor};opacity:0.95;">
              Źródło: <strong>${brandLabel}</strong> | Miasto: <strong>${city}</strong>
            </p>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px;margin-bottom:20px;">
            <h2 style="margin:0 0 12px;font-size:15px;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
              👤 Dane kontaktowe klienta
            </h2>
            <table style="width:100%;border-collapse:collapse;font-size:15px;color:#1e293b;">
              <tr>
                <td style="padding:6px 0;width:35%;color:#64748b;font-weight:600;">Imię:</td>
                <td style="padding:6px 0;font-weight:bold;color:#0f172a;">${name || 'Nie podano (opcjonalne)'}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;font-weight:600;">Telefon:</td>
                <td style="padding:6px 0;">
                  <a href="tel:${phoneCheck.cleanPhone}" style="color:${brandAccentColor};font-size:18px;font-weight:bold;text-decoration:none;">
                    📞 ${phoneCheck.formattedPhone}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;font-weight:600;">Miejscowość:</td>
                <td style="padding:6px 0;font-weight:bold;">${city}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;font-weight:600;">Urządzenie:</td>
                <td style="padding:6px 0;color:#0f172a;font-size:13px;font-weight:600;">${deviceInfo.summary}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;font-weight:600;">Środowisko:</td>
                <td style="padding:6px 0;color:#64748b;font-size:13px;">
                  <span style="display:inline-block;padding:2px 8px;border-radius:6px;font-weight:bold;font-size:11px;background:${currentEnv === 'PROD' ? '#dcfce7' : '#fef3c7'};color:${currentEnv === 'PROD' ? '#166534' : '#92400e'};">
                    ${currentEnv}
                  </span>
                  • Czas: ${fillTimeSec}
                </td>
              </tr>
            </table>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:18px;margin-bottom:20px;">
            <h2 style="margin:0 0 12px;font-size:15px;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
              🚗 Parametry pojazdu
            </h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#334155;">
              <tr>
                <td style="padding:6px 0;width:35%;color:#64748b;">Marka i model:</td>
                <td style="padding:6px 0;font-weight:bold;color:#0f172a;font-size:15px;">${vehicleTitle}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;">Rocznik:</td>
                <td style="padding:6px 0;font-weight:600;">${year}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;">Paliwo:</td>
                <td style="padding:6px 0;font-weight:600;text-transform:capitalize;">${fuel}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;">Stan techniczny:</td>
                <td style="padding:6px 0;font-weight:bold;color:#b45309;">${conditionLabelMap[condition] || condition}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;">Ubezpieczenie OC:</td>
                <td style="padding:6px 0;font-weight:bold;color:${noInsurance ? '#b91c1c' : '#15803d'};">
                  ${noInsurance ? '⚠️ BRAK WAŻNEGO OC (potrzebna laweta)' : '✅ Ważne'}
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;">Badanie techniczne:</td>
                <td style="padding:6px 0;font-weight:bold;color:${noMot ? '#b91c1c' : '#15803d'};">
                  ${noMot ? '⚠️ BRAK PRZEGLĄDU' : '✅ Ważny przegląd'}
                </td>
              </tr>
              ${
                conditionNotes
                  ? `<tr>
                      <td style="padding:6px 0;color:#64748b;">Uwagi / Usterki:</td>
                      <td style="padding:6px 0;color:#b91c1c;font-weight:600;">${conditionNotes}</td>
                    </tr>`
                  : ''
              }
              <tr>
                <td style="padding:6px 0;color:#64748b;">Oczekiwana kwota:</td>
                <td style="padding:6px 0;font-weight:bold;color:${brandAccentColor};font-size:16px;">
                  ${priceDisplayString}
                </td>
              </tr>
            </table>
          </div>

          ${
            photoUrls.length > 0
              ? `<div style="background:#f1f5f9;border-radius:12px;padding:16px;margin-bottom:20px;">
                  <p style="margin:0 0 10px;font-weight:bold;color:#0f172a;font-size:14px;">
                    📸 Zdjęcia pojazdu (${photoUrls.length} szt.):
                  </p>
                  <div style="display:flex;flex-wrap:wrap;gap:10px;">
                    ${photoUrls
                      .map(
                        (url: string, i: number) =>
                          `<a href="${url}" target="_blank" style="display:inline-block;padding:6px 12px;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;font-size:12px;color:#2563eb;text-decoration:none;font-weight:bold;">
                            Zdjęcie #${i + 1} ↗
                          </a>`
                      )
                      .join('')}
                  </div>
                </div>`
              : ''
          }

          ${
            partnerLeadUrl
              ? `<div style="text-align:center;margin:24px 0;padding:20px;background:#f8fafc;border:2px dashed #cbd5e1;border-radius:14px;">
                  <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;">
                    ⚡ Podgląd leada dla skupu / partnera:
                  </p>
                  <a href="${partnerLeadUrl}" target="_blank" style="display:inline-block;padding:14px 26px;background:#059669;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border-radius:10px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
                    👉 Otwórz mobilną kartę leada i zadzwoń ↗
                  </a>
                  <p style="margin:8px 0 0;font-size:11px;color:#94a3b8;word-break:break-all;">
                    Link do przekazania partnerowi: <a href="${partnerLeadUrl}" style="color:#0284c7;">${partnerLeadUrl}</a>
                  </p>
                </div>`
              : ''
          }

          <div style="text-align:center;padding:12px 0 0;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;">
            VroomScout – System pozyskiwania leadów samochodowych dla VroomDealer
          </div>
        </div>
      `;

      const resendFromEmail =
        process.env.RESEND_FROM_EMAIL || 'VroomScout Lead Engine <onboarding@resend.dev>';

      const resendPayload = {
        from: resendFromEmail,
        to: [notificationEmail],
        subject: subject,
        html: emailHtml,
      };

      // Resend payload ready for background dispatch
      const resendTask = () =>
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resendPayload),
          signal: AbortSignal.timeout(6000),
        })
          .then(async (res) => {
            if (!res.ok) {
              const errData = await res.json().catch(() => ({}));
              console.warn('[Resend API notice]:', errData);
            } else {
              console.log(`📧 [VroomScout] Powiadomienie e-mail wysłane do ${notificationEmail}`);
            }
          })
          .catch((mailErr) => console.warn('[Resend send failed]:', mailErr));

      after(async () => {
        const backgroundTasks: Promise<unknown>[] = [];

        if (googleSheetsWebhookUrl && googleSheetsPayload) {
          backgroundTasks.push(
            fetch(googleSheetsWebhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(googleSheetsPayload),
              signal: AbortSignal.timeout(6000),
            })
              .then(() => console.log('📊 [VroomScout] Lead pomyślnie zapisany w Google Sheets / Google Drive'))
              .catch((gErr) => console.warn('[Google Sheets webhook error]:', gErr))
          );
        }

        backgroundTasks.push(resendTask());
        await Promise.allSettled(backgroundTasks);
      });
    } else if (googleSheetsWebhookUrl && googleSheetsPayload) {
      after(async () => {
        try {
          await fetch(googleSheetsWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(googleSheetsPayload),
            signal: AbortSignal.timeout(6000),
          });
          console.log('📊 [VroomScout] Lead zapisany w Google Sheets');
        } catch (gErr) {
          console.warn('[Google Sheets error]:', gErr);
        }
      });
    }

    return NextResponse.json({
      success: true,
      leadId,
      accessToken,
    });
  } catch (err: unknown) {
    console.error('API /api/scout-lead error:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
