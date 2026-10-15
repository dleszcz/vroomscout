import { LeadFormState, CompressedPhoto } from '@/types/scout';
import { getSupabaseClient } from './supabase-client';

export interface SubmitLeadResult {
  success: boolean;
  leadId?: string;
  accessToken?: string;
  photoUrls?: string[];
  error?: string;
}

export async function submitScoutLead(
  formData: LeadFormState,
  domainName: string,
  photos: CompressedPhoto[],
  options?: {
    honeypot?: string;
    filledDurationMs?: number;
  }
): Promise<SubmitLeadResult> {
  const supabase = getSupabaseClient();
  const uploadedPhotoUrls: string[] = [];

  // 1. Parallel high-speed upload to Supabase Storage
  if (supabase && photos.length > 0) {
    try {
      const uploadSinglePhoto = async (photo: CompressedPhoto): Promise<string | null> => {
        const contentType = photo.blob.type || 'image/jpeg';
        const ext = contentType.includes('png')
          ? 'png'
          : contentType.includes('webp')
          ? 'webp'
          : 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
        const filePath = `leads/${fileName}`;

        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2500));
        const uploadAction = (async (): Promise<string | null> => {
          try {
            const { error: uploadError } = await supabase.storage
              .from('scout-photos')
              .upload(filePath, photo.blob, {
                contentType,
                upsert: false,
              });

            if (!uploadError) {
              const { data } = supabase.storage.from('scout-photos').getPublicUrl(filePath);
              return data?.publicUrl || null;
            }
          } catch (err) {
            console.warn('[Storage upload notice]:', err);
          }
          return null;
        })();

        return await Promise.race([uploadAction, timeoutPromise]);
      };

      const results = await Promise.all(photos.map((p) => uploadSinglePhoto(p)));
      for (const url of results) {
        if (url) uploadedPhotoUrls.push(url);
      }
    } catch (uploadErr) {
      console.warn('[Storage upload caught]:', uploadErr);
    }
  }

  const generatedToken = crypto.randomUUID();
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown Browser';

  // 2. Direct client insert into Supabase if configured with RLS
  let directInsertSuccess = false;
  let finalLeadId = `lead-${Date.now()}`;

  if (supabase) {
    try {
      const vehicleTitle = (
        formData.makeAndModel ||
        `${formData.make} ${formData.model}`
      ).trim() || 'Pojazd';

      const conditionNotesFormatted = [
        formData.conditionNotes.trim(),
        formData.noInsurance ? '⚠️ BRAK WAŻNEGO OC' : '',
        formData.noMot ? '⚠️ BRAK WAŻNEGO PRZEGLĄDU' : '',
        formData.expectedPriceAmount
          ? `Oczekiwana kwota: ${formData.expectedPriceAmount} zł (${formData.isNegotiable ? 'do negocjacji' : 'bez negocjacji'})`
          : '',
      ]
        .filter(Boolean)
        .join(' | ');

      const calculatedPriceString = formData.expectedPriceAmount
        ? `${formData.expectedPriceAmount} zł (${formData.isNegotiable ? 'do negocjacji' : 'bez negocjacji'})`
        : formData.priceBracket || 'Czeka na propozycję wyceny';

      const insertAction = supabase
        .from('scout_leads')
        .insert([
          {
            access_token: generatedToken,
            source_domain: domainName,
            category: formData.category || 'osobowe',
            make_model: vehicleTitle,
            year: Number(formData.year) || 2012,
            fuel: formData.fuel || 'diesel',
            condition: formData.condition || 'bardzo_dobry',
            condition_notes: conditionNotesFormatted || null,
            price_bracket: calculatedPriceString,
            city: formData.city.trim() || 'Polska',
            customer_name: formData.name.trim() || 'Klient (Anonimowy)',
            customer_phone: formData.phone.trim(),
            photo_urls: uploadedPhotoUrls,
            consent_data_sharing: formData.consentDataSharing,
            consent_phone_contact: formData.consentPhoneContact,
            accepted_terms_version: 'v1.0-2026-10',
            user_agent: userAgent,
            status: 'new',
          },
        ])
        .select('id, access_token')
        .single();

      const insertTimeout = new Promise<{ data: null; error: { message: string } }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: { message: 'Client insert timeout' } }), 2000)
      );

      const { data, error } = await Promise.race([insertAction, insertTimeout]);

      if (!error && data) {
        directInsertSuccess = true;
        finalLeadId = (data as any).id;
      } else if (error) {
        console.warn('[Supabase client insert notice]:', error.message);
      }
    } catch (err) {
      console.warn('[Supabase client insert failed]:', err);
    }
  }

  // 3. Trigger Server API Route to handle notifications (Resend email, Google Sheets, backup insert)
  // Payload is tiny (< 2 KB) because photos are already stored and referenced as URLs!
  try {
    const response = await fetch('/api/scout-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        sourceDomain: domainName,
        accessToken: generatedToken,
        photoUrls: uploadedPhotoUrls,
        userAgent,
        directInsertDone: directInsertSuccess,
        company_fax: options?.honeypot || '',
        filledDurationMs: options?.filledDurationMs,
      }),
    });

    const serverResult = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('[Server lead API error]:', serverResult);
      // If direct client insert didn't succeed AND server failed, report error
      if (!directInsertSuccess) {
        return {
          success: false,
          error: serverResult.error || `Wystąpił błąd podczas wysyłania (${response.status})`,
        };
      }
    } else {
      if (serverResult.leadId) finalLeadId = serverResult.leadId;
    }
  } catch (apiErr) {
    console.error('[Server lead API fetch caught]:', apiErr);
    if (!directInsertSuccess) {
      return {
        success: false,
        error: 'Problem z połączeniem internetowym podczas wysyłania formularza. Spróbuj ponownie.',
      };
    }
  }

  return {
    success: true,
    leadId: finalLeadId,
    accessToken: generatedToken,
    photoUrls: uploadedPhotoUrls,
  };
}
