'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatDate, PostMetadata } from '@/lib/types';
import ReadingTime from './ReadingTime';
import Image from 'next/image';
import TagPill from './TagPill';

interface PostGridProps {
  posts: PostMetadata[];
  // number => pagination size; 'all' => show all posts without pagination
  itemsPerPage?: number | 'all';
}

export default function PostGrid({ posts, itemsPerPage = 9 }: PostGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedPosts = useMemo(() => {
    if (itemsPerPage === 'all') return posts;
    const startIndex = (currentPage - 1) * (itemsPerPage as number);
    return posts.slice(startIndex, startIndex + (itemsPerPage as number));
  }, [posts, currentPage, itemsPerPage]);

  const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(posts.length / (itemsPerPage as number));

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
        {paginatedPosts.map((post, index) => (
          <article
            key={post.slug}
            className="group animate-list-item overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all hover:shadow-lg dark:hover:shadow-lg/20 hover:-translate-y-1 flex flex-col h-full min-w-0"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
              {/* Image Container */}
              {post.image ? (
                <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-neutral-400 dark:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}

              {/* Content Container */}
              <div className="p-4 flex flex-col flex-1">
                {/* Category Badge */}
                {post.category && (
                  <div className="mb-2 inline-block">
                    <span className="inline-block font-mono text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
                      {post.category}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 line-clamp-2 transition-colors">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2 flex-1">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <TagPill key={tag} tag={tag} small />
                      ))}
                      {post.tags.length > 2 && (
                        <span className="inline-block text-xs text-neutral-500 dark:text-neutral-500">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Date and Reading Time */}
                  <div className="flex items-center gap-3 text-xs justify-between">
                    <time className="font-mono text-neutral-500 dark:text-neutral-500">
                      {formatDate(post.date)}
                    </time>
                    {post.readingTime && (
                      <span className="text-neutral-500 dark:text-neutral-500">
                        {post.readingTime} 分鐘
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 pb-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-lg border transition-all ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
                aria-current={currentPage === i + 1 ? 'page' : undefined}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
