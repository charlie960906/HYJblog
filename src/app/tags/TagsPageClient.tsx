'use client';

import TagCloudD3 from '@/components/TagCloudD3';
import { useLanguage } from '@/app/providers';

export default function TagsPageClient({ tags }: { tags: { text: string; value: number }[] }) {
  const { language } = useLanguage();
  const en = language === 'en';
  return (
    <main id="main-content" className="min-h-[100svh] pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl w-full space-y-10 min-w-0 overflow-visible">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 tracking-tight">{en ? 'Tag Cloud' : '標籤雲'}</h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm">{en ? `${tags.length} tags` : `共有 ${tags.length} 個標籤`}</p>
        </div>
        {tags.length ? <div className="animate-page-in w-full"><TagCloudD3 tags={tags} /></div> : <p className="py-12 text-center text-neutral-600 dark:text-neutral-400">{en ? 'No tags yet.' : '還沒有標籤'}</p>}
      </div>
    </main>
  );
}
