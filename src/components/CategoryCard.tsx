'use client';

import Link from 'next/link';
import { PostMetadata } from '@/lib/types';

interface CategoryCardProps {
  category: string;
  posts: PostMetadata[];
  icon: string;
}

export default function CategoryCard({ category, posts, icon }: CategoryCardProps) {
  return (
    <Link href={`/folder/${encodeURIComponent(category)}`}>
      <div className="group relative h-full rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 hover:from-neutral-100 hover:to-neutral-200 dark:hover:from-neutral-800 dark:hover:to-neutral-700 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-300 dark:hover:shadow-neutral-900 cursor-pointer">
      
      {/* Background gradient accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Icon and Title */}
        <div>
          <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
            {category}
          </h2>
        </div>

        {/* Footer with count and arrow */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
            {posts.length} 篇文章
          </p>
          <div className="text-lg text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transform group-hover:translate-x-2 transition-all duration-300">
            →
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}
