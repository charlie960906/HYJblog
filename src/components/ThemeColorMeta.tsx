'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const THEME_COLORS = {
  light: '#ffffff',
  dark: '#0A0A0A',
};

export default function ThemeColorMeta() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = resolvedTheme === 'dark' ? THEME_COLORS.dark : THEME_COLORS.light;
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }

    meta.content = color;
  }, [resolvedTheme]);

  return null;
}
