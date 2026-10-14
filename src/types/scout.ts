export type BrandKey = 'autozglowy' | 'zdajauto';

export type VehicleCategory = 'osobowe' | 'bus' | 'suv' | 'uszkodzone';
export type FuelType = 'benzyna' | 'lpg' | 'diesel' | 'hybryda_elektryk';
export type VehicleCondition = 'bardzo_dobry' | 'drobne_poprawki' | 'wymaga_naprawy' | 'niesprawny';
export type PriceBracket = 'do_10k' | '10k_25k' | '25k_50k' | '50k_100k' | 'powyzej_100k' | 'nie_wiem';

export interface LeadFormState {
  category: VehicleCategory | '';
  make: string;
  model: string;
  makeAndModel: string;
  year: string;
  fuel: FuelType | '';
  condition: VehicleCondition | '';
  noInsurance: boolean;
  noMot: boolean;
  conditionNotes: string;
  expectedPriceAmount: string;
  isNegotiable: boolean;
  priceBracket: PriceBracket | '';
  city: string;
  name: string;
  phone: string;
  consentDataSharing: boolean;
  consentPhoneContact: boolean;
}

export interface CompressedPhoto {
  id: string;
  blob: Blob;
  previewUrl: string;
  originalSizeKb: number;
  compressedSizeKb: number;
  fileName: string;
}

export interface BrandConfig {
  id: BrandKey;
  domainName: string;
  tagline: string;
  badge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  primaryColorHex: string;
  primaryBgClass: string;
  primaryHoverClass: string;
  primaryTextClass: string;
  primaryBorderClass: string;
  primaryRingClass: string;
  primaryBtnTextClass?: string;
  lightBgClass: string;
  accentBadgeClass: string;
  trustPoints: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  comparisonTitle: string;
  comparisonSubtitle: string;
  testimonials: Array<{
    quote: string;
    author: string;
    car: string;
    city: string;
    payout: string;
    rating: number;
  }>;
  faqList: Array<{
    question: string;
    answer: string;
  }>;
}

export interface ScoutLeadRecord {
  id?: string;
  access_token?: string;
  source_domain: string;
  category: string;
  make_model: string;
  year: number;
  fuel: string;
  condition: string;
  condition_notes?: string | null;
  price_bracket: string;
  city: string;
  customer_name: string;
  customer_phone: string;
  photo_urls?: string[];
  consent_data_sharing: boolean;
  consent_phone_contact: boolean;
  accepted_terms_version: string;
  user_agent?: string | null;
  assigned_dealer_id?: string | null;
  status?: string;
  created_at?: string;
}
