import Link from 'next/link';
import type { ReactNode } from 'react';
import PostGrid from './PostGrid';
import type { PostMetadata } from '@/lib/types';

interface PostsSectionProps {
  title: string;
  subtitle?: string;
  posts: PostMetadata[];
  itemsPerPage?: number | 'all';
  actionSlot?: ReactNode;
  headerExtra?: ReactNode;
  backLink?: {
    href: string;
    label?: string;
  };
  emptyState?: ReactNode;
}

export default function PostsSection({
  title,
  subtitle,
  posts,
  itemsPerPage = 'all',
  actionSlot,
  headerExtra,
  backLink,
  emptyState,
}: PostsSectionProps) {
  return (
    <div className="space-y-8">
      {backLink && (
        <div className="animate-list-item">
          <Link
            href={backLink.href}
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            {backLink.label ?? '← 返回'}
          </Link>
        </div>
      )}

      <div className="animate-list-item space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              {title}
            </h1>
            {subtitle && (
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                {subtitle}
              </p>
            )}
          </div>
          {(headerExtra || actionSlot) && (
            <div className="flex flex-col items-start gap-3 sm:items-end">
              {headerExtra}
              {actionSlot}
            </div>
          )}
        </div>
      </div>

      {posts.length > 0 ? (
        <PostGrid posts={posts} itemsPerPage={itemsPerPage} />
      ) : (
        <div className="text-center text-neutral-600 dark:text-neutral-400 py-12 animate-list-item">
          {emptyState ?? <p>目前此分類尚無文章</p>}
        </div>
      )}
    </div>
  );
}
