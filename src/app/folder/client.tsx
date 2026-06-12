'use client';

import CategoryCard from '@/components/CategoryCard';
import { PostMetadata } from '@/lib/types';

interface FolderClientProps {
  allPosts: PostMetadata[];
  categories: string[];
}

// 給每個分類配置圖標
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

export default function FolderClient({ allPosts, categories }: FolderClientProps) {
  const getCategoryIcon = (category: string): string => {
    return categoryIcons[category] || '📁';
  };

  const getPostsByCategory = (category: string): PostMetadata[] => {
    return allPosts.filter(post => (post.category || 'general') === category);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-list-item space-y-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            文章分類
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            共有 {categories.length} 個分類，{allPosts.length} 篇文章
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={category}
            className="animate-list-item"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CategoryCard
              category={category}
              posts={getPostsByCategory(category)}
              icon={getCategoryIcon(category)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
