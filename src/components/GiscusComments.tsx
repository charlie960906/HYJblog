'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface GiscusCommentsProps {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
}

export default function GiscusComments({
  repo,
  repoId,
  category,
  categoryId,
}: GiscusCommentsProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const repoValue = repo ?? process.env.NEXT_PUBLIC_GISCUS_REPO ?? 'charlie960906/HYJblog';
  const repoIdValue = repoId ?? process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? 'R_kgDOS4lN5w';
  const categoryValue = category ?? process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? 'Announcements';
  const categoryIdValue = categoryId ?? process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? 'DIC_kwDOS4lN584C_BF9';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.replaceChildren();

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.repo = repoValue;
    script.dataset.repoId = repoIdValue;
    script.dataset.category = categoryValue;
    script.dataset.categoryId = categoryIdValue;
    script.dataset.mapping = 'pathname';
    script.dataset.strict = '0';
    script.dataset.reactionsEnabled = '1';
    script.dataset.emitMetadata = '1';
    script.dataset.inputPosition = 'top';
    script.dataset.theme = 'preferred_color_scheme';
    script.dataset.lang = 'zh-TW';
    script.dataset.loading = 'lazy';
    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, [
    categoryIdValue,
    categoryValue,
    pathname,
    repoIdValue,
    repoValue,
  ]);

  return (
    <section key={pathname} className="mt-10 w-full">
      <div ref={containerRef} className="giscus" />
    </section>
  );
}
