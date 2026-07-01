'use client';

import type { PostMetadata } from '@/lib/types';
import PostsSection from '@/components/PostsSection';

interface CategoryPostsClientProps {
  category: string;
  posts: PostMetadata[];
}

const categoryIcons: Record<string, string> = {
  'Life': '❤️',
  'MYCTF': '🚩',
  'dev': '💻',
  'Network': '🌐',
  'general': '📝',
  'tech': '⚙️',
  'learning': '📚',
  'project': '🎯',
};

export default function CategoryPostsClient({ category, posts }: CategoryPostsClientProps) {
  const getCategoryIcon = (cat: string): string => {
    return categoryIcons[cat] || '📁';
  };

  return (
    <PostsSection
      title={category}
      subtitle={`共有 ${posts.length} 篇文章`}
      posts={posts}
      itemsPerPage="all"
      backLink={{ href: '/folder', label: '← 返回分類' }}
      headerExtra={
        <span className="text-4xl block">
          {getCategoryIcon(category)}
        </span>
      }
      emptyState={<p className="text-neutral-600 dark:text-neutral-400">此分類暫無文章</p>}
    />
  );
}
