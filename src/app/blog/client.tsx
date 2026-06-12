'use client';

import { useState, useMemo } from 'react';
import CategoryDrawer from '@/components/CategoryDrawer';
import PostGrid from '@/components/PostGrid';
import { PostMetadata } from '@/lib/types';

interface BlogArchiveClientProps {
  allPosts: PostMetadata[];
  categories: string[];
}

export default function BlogArchiveClient({ allPosts, categories }: BlogArchiveClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return allPosts;
    }
    return allPosts.filter(post => (post.category || 'general') === selectedCategory);
  }, [allPosts, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-list-item space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              文章歸檔
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              共有 {filteredPosts.length} 篇文章
              {selectedCategory !== 'all' && ` (分類: ${selectedCategory})`}
            </p>
          </div>
          <CategoryDrawer
            categories={categories}
            currentCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="animate-list-item" style={{ animationDelay: '80ms' }}>
          <PostGrid posts={filteredPosts} itemsPerPage="all" />
        </div>
      ) : (
        <div className="text-center text-neutral-600 dark:text-neutral-400 py-12 animate-list-item">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6m0 0v6m0-6h6m0 0h6m-6-6H6m0 0H0"
            />
          </svg>
          <p className="text-lg">
            {selectedCategory === 'all'
              ? '目前還沒有發佈的文章'
              : `分類 "${selectedCategory}" 中暫無文章`}
          </p>
        </div>
      )}
    </div>
  );
}
