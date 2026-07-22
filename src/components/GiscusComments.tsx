'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

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

  const repoValue = repo ?? process.env.NEXT_PUBLIC_GISCUS_REPO ?? 'charlie960906/HYJblog';
  const repoIdValue = repoId ?? process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? 'R_kgDOS4lN5w';
  const categoryValue = category ?? process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? 'Announcements';
  const categoryIdValue = categoryId ?? process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? 'DIC_kwDOS4lN584C_BF9';

  return (
    <section key={pathname} className="mt-10 w-full">
      <Script
        src="https://giscus.app/client.js"
        data-repo={repoValue}
        data-repo-id={repoIdValue}
        data-category={categoryValue}
        data-category-id={categoryIdValue}
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="1"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="zh-TW"
        data-loading="lazy"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <div className="giscus" />
    </section>
  );
}
