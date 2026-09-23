'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type Language = 'zh-TW' | 'en';
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({
  language: 'zh-TW', setLanguage: () => {},
});
export const useLanguage = () => useContext(LanguageContext);

export function Providers({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh-TW');
  useEffect(() => {
    const saved = window.localStorage.getItem('blog-language');
    const initial: Language = saved === 'en' ? 'en' : 'zh-TW';
    setLanguage(initial);
    document.documentElement.lang = initial;
    const onStorage = () => {
      const next: Language = window.localStorage.getItem('blog-language') === 'en' ? 'en' : 'zh-TW';
      setLanguage(next);
      document.documentElement.lang = next;
    };
    window.addEventListener('hyjblog-language-change', onStorage);
    return () => window.removeEventListener('hyjblog-language-change', onStorage);
  }, []);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="blog-theme"
      disableTransitionOnChange
    >
      <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
    </ThemeProvider>
  );
}
