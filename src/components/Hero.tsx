"use client";
import { useEffect, useState } from 'react';
import { HERO_SENTENCES } from '@/lib/hero';

interface HeroProps {
  sentences?: string[];
}

export default function Hero({ sentences = HERO_SENTENCES }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: number;
    const current = sentences[index];

    if (!current) return;

    if (typing) {
      if (display.length < current.length) {
        timeout = window.setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 80);
      } else {
        timeout = window.setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (display.length > 0) {
        timeout = window.setTimeout(() => setDisplay(current.slice(0, display.length - 1)), 40);
      } else {
        setTyping(true);
        setIndex((i) => (i + 1) % sentences.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, typing, index, sentences]);

  return (
    <section className="py-12 sm:py-20 overflow-hidden">
      {/* 加上 px-4 防止極小螢幕下文字貼齊左右邊緣 */}
      <div className="mx-auto max-w-4xl text-center space-y-6 px-4">
        {/* 調整重點說明：
          1. text-xl (極小螢幕) -> xs:text-2xl -> sm:text-4xl -> md:text-5xl (隨螢幕大小流暢遞增)
          2. whitespace-nowrap 強制文字與閃爍游標絕對不換行
          3. text-ellipsis overflow-hidden (選用) 防止若字串過長時完全爆出容器
        */}
        <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 whitespace-nowrap overflow-hidden text-ellipsis">
          {display}
          <span className="inline-block w-1 h-6 sm:h-8 align-middle bg-neutral-900 dark:bg-neutral-100 ml-1 animate-blink" />
        </h1>
          <div className="space-y-1.5">
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
              聽說斜咖程度和⚡度成正比，所以我努力提升我的斜咖程度
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
              BUT 感謝你發現了我的BLOG 期待我會努力寫它也會努力創業
            </p>
          </div>
      </div>
    </section>
  );
}