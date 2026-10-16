'use client';

import React from 'react';
import Script from 'next/script';

export const MetaPixel: React.FC = () => {
  const [pixelId, setPixelId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const hostname = window.location.hostname.toLowerCase();
    const isZdajAuto = hostname.includes('zdajauto');

    const specificId = isZdajAuto
      ? process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_ZDAJAUTO
      : process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_AUTOZGLOWY;

    const fallbackId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const resolved = specificId || fallbackId || null;
    setPixelId(resolved);
  }, []);

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

export function trackMetaLead(payload?: {
  content_name?: string;
  currency?: string;
  value?: number;
}) {
  if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
    try {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead', payload || {});
      console.log('[Meta Pixel] Lead event fired:', payload);
    } catch (err) {
      console.warn('[Meta Pixel] Failed to fire Lead event:', err);
    }
  }
}
