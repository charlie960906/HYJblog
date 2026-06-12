'use client';

import Link from 'next/link';
import { PostMetadata, formatDate } from '@/lib/types';
import ReadingTime from '@/components/ReadingTime';
import PostGrid from '@/components/PostGrid';

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
    <div className="space-y-8">
      {/* Header with back button */}
      <div className="animate-list-item space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/folder"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            ← 返回分類
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{getCategoryIcon(category)}</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              {category}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              共有 {posts.length} 篇文章
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <PostGrid posts={posts} itemsPerPage="all" />
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">此分類暫無文章</p>
        </div>
      )}
    </div>
  );
}
