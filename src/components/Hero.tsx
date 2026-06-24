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
    <section className="py-12 sm:py-20 overflow-hidden w-full">
      {/* 
        1. 調整內層容器：
           - 保持 px-4 留白，但確保 w-full 與 flex 排版讓內容永遠完美置中
      */}
      <div className="mx-auto max-w-4xl text-center space-y-6 px-4 w-full flex flex-col items-center justify-center">
        
        {/* 
          2. 主標題打字效果優化：
             - 使用 clamp(1rem, 5.5vw, 2.25rem)：
               * 最小字體鎖定在 1rem (16px)，絕不無限縮小。
               * 在手機上依據螢幕寬度的 5.5% 動態平滑縮小（這個比例預留了左右 padding 的空間，不會再被擋住）。
               * 電腦大螢幕最高上限鎖定在 2.25rem (約 text-4xl)。
             - sm:text-5xl：在寬度 640px 以上的平板與桌機，直接接手回歸原本霸氣的 5xl 尺寸。
        */}
        <h1 className="text-[clamp(1rem,5.5vw,2.25rem)] sm:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 whitespace-nowrap block w-full text-center">
          {display}
          <span className="inline-block w-1 h-[1.2em] align-middle bg-neutral-900 dark:bg-neutral-100 ml-1 animate-blink" />
        </h1>

        {/* 
          3. 副標題兩行文字優化：
             - 使用 clamp(0.75rem, 3.1vw, 1rem)：
               * 手機上字體依 3.1% 寬度平滑縮小，剛好可以讓這兩行長句子在小螢幕安全避開左右 padding，維持完美單行。
             - sm:text-base md:text-lg：大螢幕恢復舒適的內文字體大小。
        */}
        <div className="space-y-2 w-full flex flex-col items-center">
          <p className="text-neutral-600 dark:text-neutral-400 text-[clamp(0.75rem,3.1vw,1rem)] sm:text-base md:text-lg leading-relaxed whitespace-nowrap text-center">
            聽說斜咖程度和⚡度成正比，所以我努力提升我的斜咖程度
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 text-[clamp(0.75rem,3.1vw,1rem)] sm:text-base md:text-lg leading-relaxed whitespace-nowrap text-center">
            BUT 感謝你發現了我的BLOG 期待我會努力寫它也會努力創業
          </p>
        </div>
      </div>
    </section>
  );
}