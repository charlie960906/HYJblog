'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu as MenuIcon, X, Home, Folder, Tag, UserRound, Search, Sun, Moon, Monitor } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { useTheme } from 'next-themes';

type ThemeViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/folder', label: 'Folder', icon: Folder },
    { href: '/tags', label: 'Tags', icon: Tag },
    { href: '/about', label: 'About', icon: UserRound },
    { href: '/search', label: 'Search', icon: Search },
  ];
  const primaryMenuItems = menuItems.slice(0, 4);
  const searchMenuItem = menuItems[4];

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    const root = document.documentElement;
    root.style.setProperty('--theme-toggle-x', `${event.clientX}px`);
    root.style.setProperty('--theme-toggle-y', `${event.clientY}px`);

    const clearOrigin = () => {
      root.style.removeProperty('--theme-toggle-x');
      root.style.removeProperty('--theme-toggle-y');
    };
    const viewTransitionDocument = document as ThemeViewTransitionDocument;

    if (viewTransitionDocument.startViewTransition) {
      const transition = viewTransitionDocument.startViewTransition(() => {
        setTheme(nextTheme);
      });
      transition.finished.then(clearOrigin, clearOrigin);
    } else {
      setTheme(nextTheme);
      clearOrigin();
    }
  };

  const renderThemeIcon = () => {
    if (theme === 'light') return <Sun className="h-5 w-5 text-amber-500" />;
    if (theme === 'dark') return <Moon className="h-5 w-5" />;
    return <Monitor className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/80 transition-colors duration-300">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex h-16 items-center justify-between min-w-0 overflow-x-hidden">
          <div className="flex min-w-0 items-center gap-6">
            <div className="flex flex-shrink-0 items-center gap-2">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-400 bg-clip-text text-transparent">
                <Image src="/images/icon.webp" alt="HYJBLOG" width={32} height={32} className="rounded-md object-cover" />
                HYJBLOG
              </Link>
            </div>

            {/* 桌面版主要選單 */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {primaryMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
                })}
              </div>
            </div>
          </div>

          {/* 桌面版右側工具 */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={searchMenuItem.href}
              title="Search"
              aria-label="Search"
              className={`flex h-[38px] w-[38px] items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                pathname === searchMenuItem.href
                  ? 'border-neutral-400 bg-neutral-100 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
                  : 'border-neutral-300 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white'
              }`}
            >
              <Search className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/charlie960906"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              aria-label="GitHub"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              <SiGithub className="h-4 w-4" aria-hidden="true" />
            </a>
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition-colors duration-200 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {React.cloneElement(renderThemeIcon(), { className: 'w-4 h-4' })}
              </button>
            )}
          </div>

          {/* 行動版右側控制區：主題按鈕與漢堡選單並排 */}
          <div className="flex items-center md:hidden gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white transition-all duration-200"
                aria-label="Toggle theme"
              >
                {renderThemeIcon()}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 行動版展開選單 — 浮層覆蓋，不推擠頁面內容 */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md shadow-lg origin-top transition-all duration-300 ease-out ${
            isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
          }`}
          aria-hidden={!isOpen}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      </nav>
    </>
  );
}