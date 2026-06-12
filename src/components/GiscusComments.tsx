'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface GiscusProps {
  repo?: string;
  repoId?: string;
  categoryId?: string;
  category?: string;
  theme?: string;
  mapping?: string;
  strict?: string;
  reactionsEnabled?: string;
  emitMetadata?: string;
  inputPosition?: string;
  lang?: string;
  loading?: string;
}

const GISCUS_THEMES = {
  light: 'light',
  dark: 'dark_dimmed',
} as const;

export default function GiscusComments({
  repo = 'charlie960906/HYJblog',
  repoId = 'R_kgDOS3lLVQ',
  categoryId = 'DIC_kwDOS3lLVc4C-9DD',
  category = 'Announcements',
  theme = 'preferred_color_scheme',
  mapping = 'pathname',
  strict = '0',
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'top',
  lang = 'zh-TW',
  loading = 'lazy',
}: GiscusProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const giscusTheme = resolvedTheme === 'dark' ? GISCUS_THEMES.dark : GISCUS_THEMES.light;

  useEffect(() => {
    if (repoId === 'YOUR_REPO_ID' || categoryId === 'YOUR_CATEGORY_ID') {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category-id', categoryId);
    if (category) {
      script.setAttribute('data-category', category);
    }
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-strict', strict);
    script.setAttribute('data-reactions-enabled', reactionsEnabled);
    script.setAttribute('data-emit-metadata', emitMetadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', theme ?? giscusTheme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', loading);

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [
    repo,
    repoId,
    categoryId,
    category,
    mapping,
    strict,
    reactionsEnabled,
    emitMetadata,
    inputPosition,
    giscusTheme,
    theme,
    lang,
    loading,
  ]);

  return (
    <div className="giscus-container overflow-x-auto">
      <div ref={containerRef} />
    </div>
  );
}
