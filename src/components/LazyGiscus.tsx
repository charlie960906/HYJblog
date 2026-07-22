"use client";

import dynamic from 'next/dynamic';

const DynamicGiscus = dynamic(() => import('./GiscusComments'), { ssr: false });

export default function LazyGiscus() {
  return (
    <div>
      <DynamicGiscus />
    </div>
  );
}
