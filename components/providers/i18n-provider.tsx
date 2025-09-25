"use client";

import { useEffect } from 'react';
import '@/lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // Initialize i18n on client side
    const savedLanguage = localStorage.getItem('i18nextLng') || 'ar';
    
    // Set document direction and language
    if (savedLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  return <>{children}</>;
}