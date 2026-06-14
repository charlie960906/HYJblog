import React from 'react';
import { getAllTags, tagToSlug } from '@/lib/posts';
import Link from 'next/link';
import { Tag } from 'lucide-react';

export const dynamic = 'force-static';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl flex items-center justify-center gap-2">
          <Tag className="w-7 h-7 text-neutral-400 dark:text-neutral-500" />
          標籤雲
        </h1>
        <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400">
          依據技術主題快速篩選文章內容。
        </p>
      </div>

      {/* 優化重點 1：使用標準的 gap-3 與 gap-y-3，確保標籤橫向與縱向都「完全不重疊」，保持安全舒適的間距 */}
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4">
        {Object.keys(tags).length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400 py-8">目前尚無任何標籤。</p>
        ) : (
          Object.entries(tags).map(([tag, count]) => {
            const safeSlug = tagToSlug(tag);
            return (
              <Link
                key={tag}
                href={`/tags/${safeSlug}`}
                /* 優化重點 2：
                  - 顏色統一改為極簡的單一色調（純淨白底/深灰底與灰階文字）。
                  - 移除了任何會導致位移重疊的負間距，每個標籤都是獨立的精緻膠囊外框。
                  - 加上輕微的微調動畫，滑鼠懸停時只有邊框與文字顏色優雅加深。
                */
                className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100 transition-colors duration-150"
              >
                <span className="text-sm font-medium">
                  {tag}
                </span>
                
                {/* 優化重點 3：篇數計數器收斂為低調的淡灰色小字，不干擾視覺 */}
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                  ({count})
                </span>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}