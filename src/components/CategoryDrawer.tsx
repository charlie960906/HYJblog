'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CategoryDrawerProps {
  categories: string[];
  currentCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function CategoryDrawer({
  categories,
  currentCategory = 'all',
  onCategoryChange,
}: CategoryDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Drawer Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Open category drawer"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span className="text-sm font-medium">分類</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        />
      )}

      {/* Drawer Menu */}
      <div
        className={`absolute right-0 mt-2 w-56 bg-cream-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-300 origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
        style={{
          transformOrigin: 'top right',
        }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            按分類瀏覽
          </h3>
        </div>

        {/* Category List */}
        <nav className="py-2">
          {/* All Categories */}
          <button
            onClick={() => handleCategorySelect('all')}
            className={`w-full text-left px-4 py-3 text-sm transition-colors ${
              currentCategory === 'all'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-current" />
              全部文章
            </span>
          </button>

          {/* Category Items */}
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                currentCategory === category
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
