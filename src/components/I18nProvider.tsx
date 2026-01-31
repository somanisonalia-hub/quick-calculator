'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import i18n from '@/lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  locale?: string;
}

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Detect language from pathname or use provided locale
    const detectedLang = pathname.startsWith('/es') ? 'es' :
                        pathname.startsWith('/pt') ? 'pt' :
                        pathname.startsWith('/fr') ? 'fr' : 'en';

    const targetLang = locale || detectedLang;

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, [pathname, locale]);

  return <>{children}</>;
}
