'use client';

import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'animejs';

export interface Heading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  variant?: 'sidebar' | 'mobile';
}

export default function TableOfContents({ headings, variant = 'sidebar' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  
  // 用於控制目錄內部滾動與點擊鎖定
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScrollIntersection = () => {
      if (isClickScrolling.current) return;

      // 1. 檢查是否已經滾動到網頁最底部（保底機制）
      const isAtBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveId(headings[headings.length - 1].id);
        return;
      }

      // 導覽列高度緩衝
      const menuElement = document.querySelector('nav') || document.querySelector('header');
      const menuOffset = menuElement ? menuElement.offsetHeight : 80;

      // 💡 關鍵優化：定義讀者的「黃金閱讀視窗線」
      // 我們認定讀者眼睛看的地方大約是螢幕頂部往下 1/3 (33%) 的區域
      const triggerLine = window.innerHeight * 0.35 + menuOffset;

      let currentActiveId = '';

      // 從上往下檢查每一個標題
      for (let i = 0; i < headings.length; i++) {
        const element = document.getElementById(headings[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementPageTop = rect.top + window.pageYOffset;

          // 💡 核心邏輯：如果標題已經滾動越過了我們設定的「黃金閱讀觸發線」
          if (window.pageYOffset + triggerLine >= elementPageTop) {
            currentActiveId = headings[i].id;
          } else {
            // 一旦遇到還沒越過線的標題，就代表上一個標題是目前正被閱讀的章節，直接中斷循環
            break;
          }
        }
      }

      // 如果全網頁還在最頂端，連第一個標題都還沒進入閱讀線，就預設亮第一個
      if (!currentActiveId && headings.length > 0) {
        currentActiveId = headings[0].id;
      }

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScrollIntersection, { passive: true });
    // 初始化呼叫一次
    handleScrollIntersection();

    return () => {
      window.removeEventListener('scroll', handleScrollIntersection);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [headings, activeId]);

  useEffect(() => {
    if (variant === 'mobile' || !activeId || !containerRef.current || !highlightRef.current) return;

    const activeLink = containerRef.current.querySelector(`a[href="#${activeId}"]`) as HTMLElement | null;
    if (!activeLink) return;

    const top = activeLink.offsetTop;
    const height = activeLink.offsetHeight;

    animate(highlightRef.current, {
      top,
      height,
      opacity: [1],
      duration: 320,
      easing: 'easeOutQuad',
    });

    const container = containerRef.current;
    const linkTop = activeLink.offsetTop;
    const linkHeight = activeLink.offsetHeight;
    const containerHeight = container.clientHeight;
    const containerScrollTop = container.scrollTop;

    if (linkTop + linkHeight > containerScrollTop + containerHeight - 40) {
      container.scrollTo({
        top: linkTop - containerHeight + 80,
        behavior: 'smooth'
      });
    } else if (linkTop < containerScrollTop + 40) {
      container.scrollTo({
        top: linkTop - 40,
        behavior: 'smooth'
      });
    }
  }, [activeId, variant]);

  // 處理點選目錄平滑移動
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    const element = document.getElementById(id);
    if (element) {
      isClickScrolling.current = true;
      setActiveId(id);

      const menuElement = document.querySelector('nav') || document.querySelector('header');
      const offset = menuElement ? menuElement.offsetHeight + 24 : 104; 
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      window.history.pushState(null, '', `#${id}`);

      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 800);
    }
  };

  if (headings.length === 0) {
    if (variant === 'mobile') return null;
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        本文尚無二級或三級標題。
      </p>
    );
  }

  const nav = (
    <div className="relative">
      <div
        ref={highlightRef}
        className="pointer-events-none absolute left-0 right-0 rounded-full bg-amber-500/10 dark:bg-amber-500/15"
        style={{ top: 0, height: 0, opacity: 0 }}
      />
      <nav className="relative space-y-2 sm:space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
        {headings.map(heading => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleScroll(e, heading.id)}
              className={`relative z-10 block py-0.5 transition-all duration-200 border-l-2 pl-3 -ml-[2px] break-words ${heading.level === 3 ? 'ml-3 sm:ml-4 text-neutral-500 dark:text-neutral-400' : ''} ${isActive ? 'text-amber-600 dark:text-amber-500 font-semibold border-amber-500 dark:border-amber-500' : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-700'}`}
            >
              {heading.title}
            </a>
          );
        })}
      </nav>
    </div>
  );

  if (variant === 'mobile') {
    return (
      <details className="lg:hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/90 overflow-hidden">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-600 dark:text-neutral-400 list-none flex items-center justify-between">
          <span>目錄</span>
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">{headings.length} 項</span>
        </summary>
        <div className="px-4 pb-4 border-t border-neutral-200 dark:border-neutral-800 pt-3">
          {nav}
        </div>
      </details>
    );
  }

  return (
    // 💡 加上 ref 且限制 max-h 與 overflow-y-auto，確保目錄能配合內建滾動機制
    <div 
      ref={containerRef}
      className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/90 p-6 shadow-sm backdrop-blur max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-none"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
        目錄
      </p>
      {nav}
    </div>
  );
}