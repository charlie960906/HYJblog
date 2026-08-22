'use client';

import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'animejs';
import { ChevronDown } from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // 用於控制目錄內部滾動與點擊鎖定
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobilePanelReadyRef = useRef(false);
  const activeIdRef = useRef<string>('');
  const scrollRafRef = useRef<number | null>(null);
  const panelAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScrollIntersection = () => {
      if (isClickScrolling.current) return;

      const isAtBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        const lastId = headings[headings.length - 1].id;
        if (lastId !== activeIdRef.current) {
          activeIdRef.current = lastId;
          setActiveId(lastId);
        }
        return;
      }

      const menuElement = document.querySelector('nav') || document.querySelector('header');
      const menuOffset = menuElement ? menuElement.offsetHeight : 80;
      const triggerLine = window.innerHeight * 0.35 + menuOffset;

      let currentActiveId = '';

      for (let i = 0; i < headings.length; i++) {
        const element = document.getElementById(headings[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementPageTop = rect.top + window.pageYOffset;

          if (window.pageYOffset + triggerLine >= elementPageTop) {
            currentActiveId = headings[i].id;
          } else {
            break;
          }
        }
      }

      if (!currentActiveId && headings.length > 0) {
        currentActiveId = headings[0].id;
      }

      if (currentActiveId && currentActiveId !== activeIdRef.current) {
        activeIdRef.current = currentActiveId;
        setActiveId(currentActiveId);
      }
    };

    const onScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = window.requestAnimationFrame(() => {
        handleScrollIntersection();
        scrollRafRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScrollIntersection();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [headings]);

  useEffect(() => {
    const container = variant === 'mobile' ? mobileScrollRef.current : containerRef.current;
    if (!activeId || !container || !highlightRef.current) return;

    const activeLink = container.querySelector(`a[href="#${activeId}"]`) as HTMLElement | null;
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
  }, [activeId, mobileOpen, variant]);

  useEffect(() => {
    if (variant !== 'mobile' || !mobilePanelRef.current) return;

    const panel = mobilePanelRef.current;
    panelAnimationRef.current?.pause();

    if (!mobilePanelReadyRef.current) {
      mobilePanelReadyRef.current = true;
      if (!mobileOpen) return;
    }

    if (mobileOpen) {
      panel.style.display = 'block';
      panel.style.height = '0px';
      panel.style.opacity = '0';
      panelAnimationRef.current = animate(panel, {
        height: [0, panel.scrollHeight],
        opacity: [0, 1],
        duration: 280,
        easing: 'easeOutCubic',
      });
    } else {
      panelAnimationRef.current = animate(panel, {
        height: [panel.offsetHeight, 0],
        opacity: [1, 0],
        duration: 220,
        easing: 'easeInCubic',
        complete: () => {
          panel.style.display = 'none';
        },
      });
    }
  }, [mobileOpen, variant]);

  // 處理點選目錄平滑移動
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    const element = document.getElementById(id);
    if (element) {
      isClickScrolling.current = true;
      setActiveId(id);
      setMobileOpen(false);

      const menuElement = document.querySelector('nav') || document.querySelector('header');
      const tocBarHeight = variant === 'mobile' ? 52 : 0;
      const offset = (menuElement ? menuElement.offsetHeight : 64) + tocBarHeight + 8;
      
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
        className="pointer-events-none absolute left-0 right-0 rounded-full bg-amber-500/10 dark:bg-amber-500/15 shadow-[0_0_0_1px_rgba(245,158,11,0.08)] transition-all duration-300"
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
              className={`relative z-10 block w-full py-0.5 transition-all duration-300 border-l-2 pl-3 -ml-[2px] break-words overflow-hidden text-left whitespace-normal transform-gpu ${heading.level === 3 ? 'ml-3 sm:ml-4 text-neutral-500 dark:text-neutral-400' : ''} ${isActive ? 'text-amber-600 dark:text-amber-500 font-semibold border-amber-500 dark:border-amber-500 scale-[1.02]' : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-700 hover:translate-x-1 hover:scale-[1.01]'}`}
            >
              {heading.title}
            </a>
          );
        })}
      </nav>
    </div>
  );

  if (variant === 'mobile') {
    const activeHeading = headings.find(h => h.id === activeId);

    return (
      <div className="lg:hidden fixed top-20 inset-x-0 z-40 w-full px-4 sm:px-6 pointer-events-none">
        <div className="mx-auto max-w-7xl pointer-events-auto">
          <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-neutral-950/95 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.35)] backdrop-blur-md overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(prev => !prev)}
              className="w-full cursor-pointer select-none px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-600 dark:text-neutral-400 flex items-center justify-between gap-3 transition-colors hover:bg-neutral-50/80 dark:hover:bg-neutral-900/50"
              aria-expanded={mobileOpen}
            >
              <span className="flex items-center gap-2 min-w-0">
                <span>目錄</span>
                {activeHeading && !mobileOpen && (
                  <span className="normal-case tracking-normal text-xs font-medium text-amber-600 dark:text-amber-500 truncate">
                    · {activeHeading.title}
                  </span>
                )}
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">{headings.length} 項</span>
                <ChevronDown
                  className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`}
                />
              </span>
            </button>
            <div
              ref={mobilePanelRef}
              className="overflow-hidden border-t border-neutral-200 dark:border-neutral-800"
              style={{ display: 'none', height: 0, opacity: 0 }}
            >
              <div ref={mobileScrollRef} className="px-4 pb-4 pt-3 max-h-[min(50vh,320px)] overflow-y-auto">
                {nav}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-950/90 p-6 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-300 overflow-hidden"
    >
      <div ref={containerRef} className="max-h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden scrollbar-none">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
          目錄
        </p>
        {nav}
      </div>
    </div>
  );
}