"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import PinguPet, { destroy as destroyPingu } from './PinguPet';

export default function Footer() {
  const [isPinguVisible, setIsPinguVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleFooterButton = () => {
    if (isPinguVisible) {
      destroyPingu();
      setIsPinguVisible(false);
      setIsMenuOpen(false);
      return;
    }

    setIsMenuOpen((current) => !current);
  };

  const summonPingu = () => {
    setIsPinguVisible(true);
    setIsMenuOpen(false);
  };

  const onPinguDestroyed = () => {
    setIsPinguVisible(false);
  };

  return (
    <>
      <footer className="border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300 mt-8 sm:mt-16 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-mono text-neutral-500 dark:text-neutral-400 text-center sm:text-left">
              <p>© {new Date().getFullYear()} Powered by HYJdevelop</p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <Link href="/rss.xml" className="link-subtle">
                RSS
              </Link>
              <Link href="/atom.xml" className="link-subtle">
                Atom
              </Link>
              <a href="https://github.com/charlie960906/HYJblog" target="_blank" rel="noreferrer" className="link-subtle">
                GitHub
              </a>
              <div className="relative" ref={wrapperRef}>
                <button type="button" onClick={handleFooterButton} className="pingu-button">
                  {isPinguVisible ? '❌ 收起寵物' : '🐾 Pets'}
                </button>
                {isMenuOpen && !isPinguVisible ? (
                  <div className="pingu-menu pingu-menu-up">
                    <button type="button" className="pingu-menu-button" onClick={summonPingu}>
                      🐧 Pingu
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </footer>
      {isPinguVisible ? <PinguPet onDestroyed={onPinguDestroyed} /> : null}
    </>
  );
}
