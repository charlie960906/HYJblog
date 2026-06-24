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
    // 1. 外層容器設定 [@container] 讓子元件能根據「這個容器的寬度」動態按比例縮放字體大小
    <section className="py-12 sm:py-20 overflow-hidden @container">
      <div className="mx-auto max-w-4xl text-center space-y-6 px-4 w-full">
        
        {/* 2. 打字主標題優化：
             - 移除 text-ellipsis，改用動態視窗與容器單位：
             - text-[7cqw] 代表字體大小會精準隨著外框變窄而「等比例縮小」，到大螢幕則限制最大為 sm:text-4xl md:text-5xl
             - whitespace-nowrap 確保絕對不變兩行
        */}
        <h1 className="text-[6.5cqw] sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
          {display}
          <span className="inline-block w-1 h-[5.5cqw] sm:h-8 align-middle bg-neutral-900 dark:bg-neutral-100 ml-1 animate-blink" />
        </h1>

        {/* 3. 副標題兩行文字優化：
             - 使用 whitespace-nowrap 強制各自維持單行
             - text-[3.8cqw] 讓它們在接近手機邊緣時，會像主標題一樣流暢、滑順地變小，絕不折行
        */}
        <div className="space-y-2">
          <p className="text-neutral-600 dark:text-neutral-400 text-[3.6cqw] sm:text-base md:text-lg leading-relaxed whitespace-nowrap">
            聽說斜咖程度和⚡度成正比，所以我努力提升我的斜咖程度
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 text-[3.6cqw] sm:text-base md:text-lg leading-relaxed whitespace-nowrap">
            BUT 感謝你發現了我的BLOG 期待我會努力寫它也會努力創業
          </p>
        </div>
      </div>
    </section>
  );
}