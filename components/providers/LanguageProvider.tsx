'use client';

/**
 * Language Provider - Updates HTML lang and dir attributes based on current language
 */

import { useEffect } from 'react';
import { useUIStore } from '@/lib/stores/uiStore';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useUIStore((state) => state.language);

  useEffect(() => {
    // Update html element attributes when language changes
    const html = document.documentElement;
    html.lang = language.code;
    html.dir = language.direction;
  }, [language]);

  return <>{children}</>;
}
