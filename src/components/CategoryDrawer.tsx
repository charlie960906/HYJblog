'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, set, stagger } from 'animejs';
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
  const [isVisible, setIsVisible] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLButtonElement[]>([]);

  itemRefs.current = [];
  const setItemRef = (el: HTMLButtonElement | null) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  const handleCategorySelect = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    setIsOpen(false);
  };

  const openDrawer = () => {
    setIsVisible(true);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isVisible || !drawerRef.current) return;

    if (isOpen) {
      set(drawerRef.current, {
        translateX: '100%',
        opacity: 0,
      });
      animate(drawerRef.current, {
        translateX: ['100%', '0%'],
        opacity: [0, 1],
        duration: 450,
        easing: 'easeOutElastic(1, .75)',
      });

      if (overlayRef.current) {
        set(overlayRef.current, { opacity: 0 });
        animate(overlayRef.current, {
          opacity: [0, 1],
          duration: 260,
          easing: 'easeOutQuad',
        });
      }

      if (itemRefs.current.length > 0) {
        set(itemRefs.current, {
          opacity: 0,
          translateY: 16,
        });
        animate(itemRefs.current, {
          opacity: [0, 1],
          translateY: [16, 0],
          delay: stagger(40),
          duration: 340,
          easing: 'easeOutCubic',
        });
      }
    } else {
      animate(drawerRef.current, {
        translateX: ['0%', '100%'],
        opacity: [1, 0],
        duration: 280,
        easing: 'easeInOutQuad',
        complete: () => setIsVisible(false),
      });
      if (overlayRef.current) {
        animate(overlayRef.current, {
          opacity: [1, 0],
          duration: 220,
          easing: 'easeInQuad',
        });
      }
    }
  }, [isOpen, isVisible]);

  return (
    <div className="relative">
      {/* Drawer Button */}
      <button
        onClick={openDrawer}
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

      {isVisible && (
        <>
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
            onClick={closeDrawer}
          />

          <div
            ref={drawerRef}
            className="fixed top-0 right-0 h-full w-72 max-w-[90vw] bg-cream-50 dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 rounded-l-3xl shadow-2xl overflow-hidden z-50"
            style={{ transform: 'translateX(100%)', opacity: 0 }}
          >
            <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                按分類瀏覽
              </h3>
            </div>

            <nav className="py-2">
              <button
                ref={setItemRef}
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

              {categories.map((category) => (
                <button
                  key={category}
                  ref={setItemRef}
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
        </>
      )}
    </div>
  );
}
