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
  const base64PhotosForEmail: string[] = [];

  // 1. Prepare photos & upload to Supabase Storage if available
  for (const photo of photos) {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
    const filePath = `leads/${fileName}`;

    if (supabase) {
      try {
        const { error: uploadError } = await supabase.storage
          .from('scout-photos')
          .upload(filePath, photo.blob, {
            contentType: 'image/webp',
            upsert: false,
          });

        if (!uploadError) {
          const { data } = supabase.storage.from('scout-photos').getPublicUrl(filePath);
          if (data?.publicUrl) {
            uploadedPhotoUrls.push(data.publicUrl);
          }
        } else {
          console.warn('[Storage upload notice]:', uploadError.message);
        }
      } catch (uploadErr) {
        console.warn('[Storage upload caught]:', uploadErr);
      }
    }

    // Convert blob to base64 preview for email attachment / server fallback if needed
    try {
      const base64 = await blobToBase64(photo.blob);
      base64PhotosForEmail.push(base64);
    } catch (e) {
      console.warn('Could not read photo to base64:', e);
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

      const { data, error } = await supabase
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

      if (!error && data) {
        directInsertSuccess = true;
        finalLeadId = data.id;
      } else if (error) {
        console.warn('[Supabase client insert notice]:', error.message);
      }
    } catch (err) {
      console.warn('[Supabase client insert failed]:', err);
    }
  }

  // 3. Trigger Server Action / API Route to handle notifications (Resend email, alerts, backup insert)
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
        base64Photos: base64PhotosForEmail.slice(0, 4), // max 4 for email safety
        userAgent,
        directInsertDone: directInsertSuccess,
        company_fax: options?.honeypot || '',
        filledDurationMs: options?.filledDurationMs,
      }),
    });

    if (response.ok) {
      const serverResult = await response.json();
      if (serverResult.leadId) finalLeadId = serverResult.leadId;
    }
  } catch (apiErr) {
    console.warn('[Server lead API notice]:', apiErr);
  }

  return {
    success: true,
    leadId: finalLeadId,
    accessToken: generatedToken,
    photoUrls: uploadedPhotoUrls,
  };
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
