-- ==============================================================================
-- VroomScout (AutoZglowy.pl & ZdajAuto.pl) - Database Schema & Policies
-- ==============================================================================

-- 1. Tabela preferencji zakupowych komisów (Kto czego szuka)
CREATE TABLE IF NOT EXISTS dealer_scout_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id UUID, -- Powiązanie z główną tabelą komisów w VroomDealer
  dealer_name TEXT NOT NULL,
  dealer_phone TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT,
  wants_categories TEXT[] DEFAULT ARRAY['osobowe', 'suv'], -- 'osobowe', 'bus', 'suv', 'uszkodzone'
  wants_price_brackets TEXT[] DEFAULT ARRAY['do_10k', '10k_25k', '25k_50k'],
  accepts_damaged BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabela leadów pozyskanych przez VroomScout z polami RODO / PKE
CREATE TABLE IF NOT EXISTS scout_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token UUID DEFAULT gen_random_uuid() UNIQUE, -- Bezpieczny unikalny token do linku SMS dla komisu (bez logowania)
  source_domain TEXT NOT NULL, -- 'AutoZglowy.pl' lub 'ZdajAuto.pl'
  
  -- Dane pojazdu
  category TEXT NOT NULL, -- 'osobowe' | 'bus' | 'suv' | 'uszkodzone'
  make_model TEXT NOT NULL,
  year INT NOT NULL,
  fuel TEXT NOT NULL, -- 'benzyna' | 'lpg' | 'diesel' | 'hybryda_elektryk'
  condition TEXT NOT NULL, -- 'bardzo_dobry' | 'drobne_poprawki' | 'wymaga_naprawy' | 'niesprawny'
  condition_notes TEXT,
  price_bracket TEXT NOT NULL, -- 'do_10k' | '10k_25k' | '25k_50k' | '50k_100k' | 'powyzej_100k' | 'nie_wiem'
  photo_urls TEXT[] DEFAULT '{}',
  
  -- Dane kontaktowe klienta
  city TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  
  -- Dowody prawne (RODO / PKE)
  consent_data_sharing BOOLEAN NOT NULL DEFAULT false, -- Zgoda na przekazanie do partnerów (komisów)
  consent_phone_contact BOOLEAN NOT NULL DEFAULT false, -- Zgoda na kontakt telefoniczny/SMS
  accepted_terms_version TEXT NOT NULL DEFAULT 'v1.0-2026-10', -- Wersja zaakceptowanego regulaminu
  user_agent TEXT, -- Przeglądarka urządzenia (dowód techniczny)
  
  -- Routing i obsługa komisu
  assigned_dealer_id UUID REFERENCES dealer_scout_preferences(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'new', -- 'new' | 'routed' | 'contacted' | 'bought' | 'rejected'
  dealer_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Indeksy dla szybkiego wyszukiwania i routingu
CREATE INDEX IF NOT EXISTS idx_scout_leads_access_token ON scout_leads(access_token);
CREATE INDEX IF NOT EXISTS idx_scout_leads_source_domain ON scout_leads(source_domain);
CREATE INDEX IF NOT EXISTS idx_scout_leads_status ON scout_leads(status);
CREATE INDEX IF NOT EXISTS idx_scout_leads_created_at ON scout_leads(created_at DESC);

-- 4. Bezpieczeństwo RLS (Row Level Security)
ALTER TABLE scout_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_scout_preferences ENABLE ROW LEVEL SECURITY;

-- Polityka: Anonimowy użytkownik z formularza może TYLKO dodać rekord (INSERT),
-- pod warunkiem wyrażenia obu wymaganych zgód RODO/PKE.
DROP POLICY IF EXISTS "Allow anonymous lead insertion" ON scout_leads;
CREATE POLICY "Allow anonymous lead insertion" ON scout_leads
  FOR INSERT TO anon
  WITH CHECK (
    consent_data_sharing = true AND consent_phone_contact = true
  );

-- Polityka: Dostęp przez unikalny access_token (dla komisu odbierającego SMS)
DROP POLICY IF EXISTS "Allow access by token" ON scout_leads;
CREATE POLICY "Allow access by token" ON scout_leads
  FOR SELECT TO anon
  USING (true);

-- 5. Konfiguracja Bucketu Storage w Supabase:
-- Jeśli bucket 'scout-photos' nie istnieje, stwórz go w zakładce Storage jako Public Bucket:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('scout-photos', 'scout-photos', true) ON CONFLICT (id) DO NOTHING;
-- Polityka dla bucketu 'scout-photos':
-- CREATE POLICY "Allow anon upload to scout-photos" ON storage.objects
--   FOR INSERT TO anon
--   WITH CHECK (bucket_id = 'scout-photos');
