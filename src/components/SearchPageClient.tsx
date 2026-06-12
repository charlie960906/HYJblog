"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

type Result = {
  slug: string;
  title: string;
  description: string;
  score: number;
};

export default function SearchPageClient() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Result[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setQuery(q);
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query) params.set('q', query); else params.delete('q');
    const newUrl = window.location.pathname + '?' + params.toString();
    window.history.replaceState(null, '', newUrl);

    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      doFetch(query);
    }, 300) as unknown as number;

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query]);

  async function doFetch(q: string) {
    if (!q.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setResults(data as Result[]);
        setTotal((data as Result[]).length);
      } else {
        // fallback: try to read results field
        setResults(data.results || []);
        setTotal(data.total || (data.results ? data.results.length : 0));
      }
    } catch (err) {
      console.error(err);
      setResults([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    doFetch(query);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl px-4">
        <form onSubmit={onSubmit} className="w-full">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100">BLOG.HYJ</h1>

            <div className="w-full relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
                </svg>
              </span>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋文章..."
                className="w-full text-xl sm:text-2xl pl-14 pr-6 py-4 rounded-full border border-neutral-200 dark:border-neutral-800 bg-cream-50 dark:bg-neutral-900 shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                aria-label="搜尋"
                autoFocus
              />
            </div>
          </div>
        </form>

        <div className="w-full mt-6">
          {isLoading && <p className="text-neutral-500">搜尋中…</p>}

          {!isLoading && query && results.length === 0 && (
            <p className="text-neutral-500">沒有找到相關文章</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="block">
                <article className="animate-list-item group overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all hover:shadow-md p-4 h-full bg-cream-50 dark:bg-[#050505]">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">{r.title}</h3>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-3" dangerouslySetInnerHTML={{ __html: (r as any).snippet || r.description }} />
                  <div className="text-xs text-neutral-500 dark:text-neutral-500 mt-auto">分數: {Math.round(r.score ?? 0)}</div>
                </article>
              </Link>
            ))}
          </div>

          {/* No pagination: show all results */}
        </div>
      </div>
    </div>
  );
}
