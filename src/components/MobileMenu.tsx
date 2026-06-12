"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import SearchBar from './SearchBar';

const menuItems = [
  { href: '/', label: 'home' },
  { href: '/folder', label: 'folder' },
  { href: '/tags', label: 'tags' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setRenderMenu(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timeout = window.setTimeout(() => setRenderMenu(false), 260);
      return () => window.clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    if (open) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [open]);

  const overlay = renderMenu && mounted
    ? createPortal(
        <div className="fixed inset-0 z-[100] sm:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button
            type="button"
            aria-label="Close navigation"
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-[250ms] ease-out ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setOpen(false)}
          />

          <div
            className={`absolute top-0 right-0 h-full w-[min(100%,20rem)]
                       bg-cream-50 dark:bg-neutral-950
                       border-l border-neutral-200 dark:border-neutral-800
                       shadow-2xl overflow-y-auto
                       pb-[env(safe-area-inset-bottom)]
                       transition-all duration-300 ease-out ${
                         open
                           ? 'translate-x-0 opacity-100'
                           : 'translate-x-full opacity-0'
                       }`}
          >
            <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <span className="font-mono text-sm font-semibold text-neutral-500 dark:text-neutral-400">menu</span>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full
                           text-neutral-600 dark:text-neutral-300
                           hover:bg-neutral-100 dark:hover:bg-neutral-900
                           transition-smooth hover:rotate-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              <div className={`mb-4 transition-all duration-300 ease-out ${
                open ? 'translate-y-0 opacity-100 delay-75' : 'translate-y-2 opacity-0'
              }`}>
                <SearchBar />
              </div>

              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-mono text-base px-3 py-3 rounded-lg
                             text-neutral-800 dark:text-neutral-200
                             hover:bg-neutral-100 dark:hover:bg-neutral-900
                             transition-all duration-300 ease-out hover:translate-x-1 ${
                               open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                             }`}
                  style={{ transitionDelay: open ? `${120 + index * 45}ms` : '0ms' }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div className="sm:hidden">
      <button
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full
                   bg-neutral-100 dark:bg-neutral-900
                   text-neutral-700 dark:text-neutral-200
                   border border-neutral-200 dark:border-neutral-800
                   transition-smooth
                   hover:-translate-y-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-800
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
      >
        <span className="relative block w-5 h-5" aria-hidden>
          <span className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'top-2.5 rotate-45' : ''}`} />
          <span className={`absolute left-0 top-2.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'top-2.5 -rotate-45' : ''}`} />
        </span>
      </button>

      {overlay}
    </div>
  );
}
