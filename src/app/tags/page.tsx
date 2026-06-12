import { getAllTagsWithCount } from '@/lib/posts';
import Link from 'next/link';
import TagPill from '@/components/TagPill';
import TagCloudD3 from '@/components/TagCloudD3';

export const metadata = {
  title: '標籤',
  description: '按標籤瀏覽文章',
};

function getTagPosition(index: number, total: number, count: number, maxCount: number) {
  const angle = (index / total) * Math.PI * 2;
  const normalized = maxCount > 1 ? (maxCount - count) / (maxCount - 1) : 0;
  const radius = 60 + normalized * 180;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

export default function TagsPage() {
  const tags = getAllTagsWithCount();

  if (tags.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            標籤
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">共有 0 個標籤</p>
        </div>
        <p className="text-center text-neutral-600 dark:text-neutral-400 py-12">還沒有標籤</p>
      </div>
    );
  }

  const maxCount = tags.reduce((m, t) => Math.max(m, t.count), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          標籤雲
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">共有 {tags.length} 個標籤</p>
      </div>

      <div className="relative mx-auto max-w-5xl overflow-visible rounded-3xl border border-neutral-200/80 bg-neutral-50/80 p-6 shadow-sm shadow-neutral-200/40 dark:border-neutral-800/80 dark:bg-neutral-950/50 dark:shadow-black/10 sm:p-8">
        <div className="flex justify-center">
          <TagCloudD3 tags={tags} height={480} />
        </div>
      </div>
    </div>
  );
}
