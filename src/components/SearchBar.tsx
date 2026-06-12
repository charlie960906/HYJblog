'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  snippet?: string;
  score: number;
}

interface SearchBarProps {
  mode?: 'inline' | 'desktop-popover';
}

export default function SearchBar({ mode = 'inline' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(mode === 'inline');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode !== 'desktop-popover') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsSearchVisible(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mode]);

  useEffect(() => {
    if (isSearchVisible && mode === 'desktop-popover') {
      const timeout = window.setTimeout(() => inputRef.current?.focus(), 90);
      return () => window.clearTimeout(timeout);
    }
  }, [isSearchVisible, mode]);

  const handleSearch = useCallback(async (value: string) => {
    setQuery(value);

    if (value.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
        const searchResults = await response.json();
        setResults(searchResults);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, []);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const searchField = (
    <>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="搜尋文章..."
          value={query}
          onChange={(event) => handleSearch(event.target.value)}
          onFocus={() => query && setIsOpen(true)}
          onBlur={() => {
            if (mode === 'inline') {
              setTimeout(() => setIsOpen(false), 200);
            }
          }}
          className="w-full pl-10 pr-10 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900
                     border border-neutral-200 dark:border-neutral-800
                     text-neutral-900 dark:text-neutral-100 placeholder-neutral-500
                     shadow-sm shadow-transparent
                     focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600
                     focus:shadow-neutral-200/70 dark:focus:shadow-black/20
                     transition-smooth"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="清除搜尋"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-smooth"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-cream-50 dark:bg-neutral-900
                        border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl z-50
                        animate-popover-in">
          <ul className="max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <li key={result.slug}>
                <Link
                  href={`/blog/${result.slug}`}
                  onClick={handleClear}
                  className={`block px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800
                             transition-smooth ${
                               index !== results.length - 1
                                 ? 'border-b border-neutral-200 dark:border-neutral-800'
                                 : ''
                             }`}
                >
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {result.title}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {result.snippet ? (
                      <div dangerouslySetInnerHTML={{ __html: result.snippet }} />
                    ) : (
                      result.description
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query && !isLoading && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-cream-50 dark:bg-neutral-900
                        border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 text-center z-50
                        animate-popover-in">
          <p className="text-neutral-500 dark:text-neutral-400">沒有找到相關文章</p>
        </div>
      )}
    </>
  );

  if (mode === 'desktop-popover') {
    return (
      <div ref={containerRef} className="relative">
        <Link
          href="/search"
          aria-label="前往搜尋"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full
                     bg-neutral-100 dark:bg-neutral-900
                     text-neutral-700 dark:text-neutral-200
                     border border-neutral-200 dark:border-neutral-800
                     transition-smooth hover:-translate-y-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-800
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full sm:max-w-md">
      {searchField}
    </div>
  );
}
