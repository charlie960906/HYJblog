'use client';

import CategoryCard from '@/components/CategoryCard';
import { PostMetadata } from '@/lib/types';

interface FolderClientProps {
  allPosts: PostMetadata[];
  categories: string[];
}

// 給每個分類配置圖標（完整保留你原汁原味的精緻圖標配置）
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
    <div className="w-full space-y-10">
      {/* Header */}
      <div className="animate-list-item space-y-2">
        <div>
          {/* 標題套用追隨規範：日間純黑 (text-neutral-900 / dark:text-neutral-100) 與緊密字距 tracking-tight */}
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 tracking-tight">
            文章分類
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm">
            共有 {categories.length} 個分類，{allPosts.length} 篇文章
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      {/* 配合外層 max-w-7xl 展開，寬螢幕下使用 3 欄 (lg:grid-cols-3) 靠左自然鋪滿，絕不再縮在中間 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
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