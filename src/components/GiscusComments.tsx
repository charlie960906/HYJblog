'use client';

import Script from 'next/script';

export default function GiscusComments() {
  return (
    <section className="mt-10 w-full">
      <Script
        src="https://giscus.app/client.js"
        data-repo="charlie960906/HYJblog"
        data-repo-id="R_kgDOS4lN5w"
        data-category="General"
        data-category-id="DIC_kwDOS4lN584C_BF9"
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
