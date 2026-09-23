'use client';

import type { PostMetadata } from '@/lib/types';
import PostsSection from '@/components/PostsSection';
import { useLanguage } from '@/app/providers';

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
  const { language } = useLanguage();
  const en = language === 'en';
  const getCategoryIcon = (cat: string): string => {
    return categoryIcons[cat] || '📁';
  };

  return (
    <PostsSection
      title={category}
      subtitle={en ? `${posts.length} articles` : `共有 ${posts.length} 篇文章`}
      posts={posts}
      itemsPerPage="all"
      backLink={{ href: '/folder', label: en ? '← Back to categories' : '← 返回分類' }}
      headerExtra={
        <span className="text-4xl block">
          {getCategoryIcon(category)}
        </span>
      }
      emptyState={<p className="text-neutral-600 dark:text-neutral-400">{en ? 'There are no articles in this category yet.' : '此分類暫無文章'}</p>}
    />
  );
}
