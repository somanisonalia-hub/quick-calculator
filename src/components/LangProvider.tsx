'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Detect language from pathname
    const lang = pathname.startsWith('/es') ? 'es' :
                 pathname.startsWith('/pt') ? 'pt' :
                 pathname.startsWith('/fr') ? 'fr' : 'en';

    // Set the document language attribute
    document.documentElement.lang = lang;
  }, [pathname]);

  return <>{children}</>;
}

