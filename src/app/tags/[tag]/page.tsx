// src/app/tags/[tag]/page.tsx
import React from 'react';
import { getSortedPostsData, tagToSlug, slugToTag } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { Tag } from 'lucide-react';

export const dynamic = 'force-static';

interface TagPageProps {
  params: {
    tag: string;
  };
}

// 告訴 Next.js 靜態導出時，要建立哪些安全格式的標籤網址資料夾
export function generateStaticParams() {
  const posts = getSortedPostsData();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet).map((tag) => ({
    tag: tagToSlug(tag), // C++ 會映射為 cpp 建立資料夾
  }));
}

export default function TagPage({ params }: TagPageProps) {
  const posts = getSortedPostsData();
  
  // 收集所有文章出現過的標籤，做為解碼比對庫
  const allTagsSet = new Set<string>();
  posts.forEach((post) => post.tags?.forEach((t) => allTagsSet.add(t)));
  const allTags = Array.from(allTagsSet);

  // 將網址上的安全 Slug (如 cpp) 反向解析為真實的原始標籤 (如 C++)
  const originalTag = slugToTag(params.tag, allTags);

  // 根據正確還原的中文或 C++ 標籤名稱篩選文章
  const filteredPosts = posts.filter(
    (post) => post.tags && post.tags.includes(originalTag)
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <Tag className="w-6 h-6 text-neutral-500" />
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
          標籤：<span className="text-neutral-600 dark:text-neutral-400 font-mono">{originalTag}</span>
        </h1>
        <span className="text-sm font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-full">
          {filteredPosts.length} 篇相關文章
        </span>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            /* 關鍵修正：移除 post={post}，改用 {...post} 將文章屬性打散傳入 */
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-400 dark:text-neutral-500">
            目前沒有這個標籤的文章。
          </p>
        </div>
      )}
    </div>
  );
}