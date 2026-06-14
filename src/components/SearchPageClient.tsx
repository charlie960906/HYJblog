'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  content: string;
}

interface SearchPageClientProps {
  initialPosts: SearchItem[];
}

export default function SearchPageClient({ initialPosts = [] }: SearchPageClientProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);

  // 當使用者輸入關鍵字時，直接在純前端進行秒級篩選
  useEffect(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) {
      setResults([]);
      return;
    }

    const filtered = initialPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(trimmedQuery) ||
        post.description.toLowerCase().includes(trimmedQuery) ||
        post.content.includes(trimmedQuery)
      );
    });

    setResults(filtered);
  }, [query, initialPosts]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          搜尋文章
        </h1>
        <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
          輸入關鍵字，尋找您感興趣的技術內容與心得分享。
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative rounded-2xl shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-neutral-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-neutral-900 ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-500 dark:bg-neutral-900 dark:text-white dark:ring-neutral-800 dark:focus:ring-neutral-400 transition-all text-base sm:text-lg bg-neutral-50/50"
            placeholder="輸入關鍵字，例如：C++、陣列、指標..."
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {query.trim() && (
          <div className="mb-4 text-sm text-neutral-500 dark:text-neutral-400 font-mono">
            找到 {results.length} 筆符合「{query}」的結果
          </div>
        )}

        <div className="space-y-4">
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-5 rounded-2xl border border-neutral-100 hover:border-neutral-200 dark:border-neutral-900 dark:hover:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300 transition-colors truncate">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {post.description || "點擊閱讀完整文章內容。"}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </Link>
          ))}

          {query.trim() && results.length === 0 && (
            <div className="text-center py-12 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
              <p className="text-neutral-400 dark:text-neutral-500 text-base">
                沒有找到符合的相關文章，換個關鍵字試試看吧！
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}