// Anti-spam and lead verification utilities

const DUMMY_PHONE_NUMBERS = new Set([
  '000000000',
  '111111111',
  '222222222',
  '333333333',
  '444444444',
  '555555555',
  '666666666',
  '777777777',
  '888888888',
  '999999999',
  '123456789',
  '987654321',
  '123123123',
]);

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
  isSilentDrop?: boolean;
}

export function validatePhoneNumber(rawPhone: string): {
  isValid: boolean;
  error?: string;
  cleanPhone: string;
  formattedPhone: string;
} {
  // Strip spaces, dashes, parentheses, +48 country code
  let clean = rawPhone.replace(/\s+/g, '').replace(/[-().]/g, '');
  if (clean.startsWith('+48')) clean = clean.substring(3);
  if (clean.startsWith('0048')) clean = clean.substring(4);
  if (clean.startsWith('48') && clean.length === 11) clean = clean.substring(2);

  if (!/^\d{9}$/.test(clean)) {
    return {
      isValid: false,
      error: 'Numer telefonu musi składać się z 9 cyfr (np. 601 234 567).',
      cleanPhone: clean,
      formattedPhone: rawPhone,
    };
  }

  // Reject known dummy spam numbers or all same digits
  if (DUMMY_PHONE_NUMBERS.has(clean) || /^(\d)\1{8}$/.test(clean)) {
    return {
      isValid: false,
      error: 'Wprowadzony numer telefonu jest nieprawidłowy. Podaj prawdziwy numer do wyceny.',
      cleanPhone: clean,
      formattedPhone: rawPhone,
    };
  }

  // Check valid polish mobile/landline prefixes (starts with 2-8, not 0 or 1)
  const firstDigit = clean[0];
  if (firstDigit === '0' || firstDigit === '1') {
    return {
      isValid: false,
      error: 'Numer telefonu nie może zaczynać się od 0 lub 1.',
      cleanPhone: clean,
      formattedPhone: rawPhone,
    };
  }

  const formatted = `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 9)}`;
  return { isValid: true, cleanPhone: clean, formattedPhone: formatted };
}

// In-memory rate limiting map for API
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkIpRateLimit(ip: string, maxRequests = 5, windowMinutes = 15): boolean {
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;

  // Clean old entries
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }

  const current = rateLimitMap.get(ip);
  if (!current) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true; // allowed
  }

  if (current.count >= maxRequests) {
    return false; // rate limited!
  }

  current.count += 1;
  return true;
}
