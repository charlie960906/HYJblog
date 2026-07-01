'use client';

import { useState, useMemo } from 'react';
import CategoryDrawer from '@/components/CategoryDrawer';
import PostsSection from '@/components/PostsSection';
import type { PostMetadata } from '@/lib/types';

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
    <PostsSection
      title="文章歸檔"
      subtitle={`共有 ${filteredPosts.length} 篇文章${selectedCategory !== 'all' ? `，分類：${selectedCategory}` : ''}`}
      posts={filteredPosts}
      itemsPerPage="all"
      actionSlot={
        <CategoryDrawer
          categories={categories}
          currentCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      }
      emptyState={
        <p className="text-lg">
          {selectedCategory === 'all'
            ? '目前還沒有發佈的文章'
            : `分類 "${selectedCategory}" 中暫無文章`}
        </p>
      }
    />
  );
}
