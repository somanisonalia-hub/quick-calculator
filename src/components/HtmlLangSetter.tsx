'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Get HTML lang attribute based on pathname
function getHtmlLang(pathname: string): string {
  if (pathname.startsWith('/es')) return 'es';
  if (pathname.startsWith('/fr')) return 'fr';
  if (pathname.startsWith('/pt')) return 'pt';
  return 'en'; // default to English
}

export default function HtmlLangSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = getHtmlLang(pathname);
    document.documentElement.lang = lang;
  }, [pathname]);

  // This component doesn't render anything
  return null;
}