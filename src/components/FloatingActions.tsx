'use client';

import { ArrowUp, Plus, X } from 'lucide-react';
import { Liquid } from 'liquid-gooey';
import { useState } from 'react';
import { useLanguage } from '@/app/providers';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === 'en';

  const updateLanguage = (nextLanguage: '中' | 'EN') => {
    const english = nextLanguage === 'EN';
    setLanguage(english ? 'en' : 'zh-TW');
    window.localStorage.setItem('blog-language', english ? 'en' : 'zh-TW');
    document.documentElement.lang = english ? 'en' : 'zh-TW';
    window.dispatchEvent(new Event('hyjblog-language-change'));
  };

  const toggleLanguage = () => {
    updateLanguage(isEnglish ? '中' : 'EN');
  };

  const hiddenActionClass = isOpen
    ? 'opacity-100 scale-100 pointer-events-auto z-10'
    : 'opacity-0 scale-90 pointer-events-none z-0';

  return (
    <div className="fixed bottom-5 right-5 z-[60] h-28 w-28 sm:bottom-7 sm:right-7">
      <Liquid blur={6} contrast={18} fill="#202020" className="relative h-full w-full">
        <Liquid.Item
          className="absolute bottom-0 right-0"
          x={isOpen ? -54 : 0}
          y={isOpen ? -34 : 0}
          transition="bouncy"
        >
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={isEnglish ? 'Switch to Chinese' : 'Switch to English'}
            title={isEnglish ? 'Switch to Chinese' : 'Switch to English'}
            aria-hidden={!isOpen}
            className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white shadow-xl transition-all duration-300 dark:bg-white dark:text-neutral-900 ${hiddenActionClass}`}
          >
            {isEnglish ? 'En' : '中'}
          </button>
        </Liquid.Item>

        <Liquid.Item
          className="absolute bottom-0 right-0"
          x={0}
          y={isOpen ? -64 : 0}
          transition="bouncy"
          delay={40}
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={isEnglish ? 'Back to top' : '回到頂端'}
            title={isEnglish ? 'Back to top' : '回到頂端'}
            aria-hidden={!isOpen}
            className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-xl transition-all duration-300 dark:bg-white dark:text-neutral-900 ${hiddenActionClass}`}
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </button>
        </Liquid.Item>

        <Liquid.Item className="absolute bottom-0 right-0">
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-label={isOpen ? (isEnglish ? 'Close floating tools' : '關閉浮動工具') : (isEnglish ? 'Open floating tools' : '開啟浮動工具')}
            title={isOpen ? (isEnglish ? 'Close floating tools' : '關閉浮動工具') : (isEnglish ? 'Open floating tools' : '開啟浮動工具')}
            className="relative z-20 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-xl transition-transform duration-200 dark:bg-white dark:text-neutral-900"
          >
            {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Plus className="h-5 w-5" aria-hidden="true" />}
          </button>
        </Liquid.Item>
      </Liquid>
    </div>
  );
}
