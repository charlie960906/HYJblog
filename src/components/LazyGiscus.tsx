"use client";

import dynamic from 'next/dynamic';

const DynamicGiscus = dynamic(() => import('./GiscusComments'), { ssr: false });

export default function LazyGiscus() {
  return (
    <div>
      <DynamicGiscus
        repo="charlie960906/HYJblog"
        repoId="R_kgDOS3i41Q"
        category="Announcements"
        categoryId="DIC_kwDOS3i41c4C-85-"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="zh-TW"
        loading="lazy"
      />
    </div>
  );
}
