import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

interface LeadPageProps {
  params: Promise<{
    token: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function LeadRedirectPage({ params }: LeadPageProps) {
  const { token } = await params;
  const headerList = await headers();
  const host = headerList.get('host') || '';
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1');

  const partnerBase = isLocal
    ? (process.env.SCOUT_PARTNER_LOCAL_URL || 'http://localhost:3000')
    : (process.env.SCOUT_PARTNER_BASE_URL || 'https://scout.vroomdealer.pl');

  redirect(`${partnerBase.replace(/\/$/, '')}/lead/${token}`);
}
