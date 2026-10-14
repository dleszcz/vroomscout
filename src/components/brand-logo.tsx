'use client';

import React from 'react';
import Link from 'next/link';
import { BrandKey } from '@/types/scout';

interface BrandLogoProps {
  brandKey: BrandKey;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  zdajAutoVariant?: 'purple' | 'green';
  href?: string | null;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  brandKey,
  className = '',
  size = 'md',
  zdajAutoVariant = 'purple',
  href = '/',
}) => {
  const content = (() => {
    if (brandKey === 'autozglowy') {
      const autoZglowyHeight = {
        sm: 'h-8 sm:h-9',
        md: 'h-10 sm:h-12',
        lg: 'h-14 sm:h-16',
      };

      return (
        <div className={`flex items-center ${className}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/autozglowy-logo.png"
            alt="AutoZglowy.pl – Logo zmartwiona głowa z autem"
            className={`${autoZglowyHeight[size]} w-auto object-contain transition-transform hover:scale-102`}
          />
        </div>
      );
    }

    // ZdajAuto: optycznie wyrównana skala
    const zdajAutoHeight = {
      sm: 'h-9 sm:h-11',
      md: 'h-12 sm:h-14',
      lg: 'h-16 sm:h-20',
    };

    const logoSrc =
      zdajAutoVariant === 'green'
        ? '/zdajauto-logo-green.png'
        : '/zdajauto-logo-purple.png';

    return (
      <div className={`flex items-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="ZdajAuto.pl – Logo kluczyk samochodowy"
          className={`${zdajAutoHeight[size]} w-auto object-contain transition-transform hover:scale-102`}
        />
      </div>
    );
  })();

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center cursor-pointer transition-opacity hover:opacity-95"
        title="Strona główna"
      >
        {content}
      </Link>
    );
  }

  return content;
};
