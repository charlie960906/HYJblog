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
      <div className="mx-auto max-w-4xl text-center space-y-6 px-4 w-full flex flex-col items-center justify-center">
        
        {/* 
          1. 主標題採用 SVG 向量縮放技術：
             - 在桌機大螢幕（sm 以上）維持標準的 text-5xl H1 樣式。
             - 在手機小螢幕（sm 以下）自動切換成 SVG。SVG 內建的 textLength 搭配 lengthAdjust
               會強迫字體隨著螢幕寬度「完美向內縮小比例」，死守在安全退縮框之內，絕對不超出！
        */}
        <div className="w-full block sm:hidden">
          <svg viewBox="0 0 400 45" className="w-full h-auto">
            <text
              x="50%"
              y="30"
              dominantBaseline="middle"
              textAnchor="middle"
              className="fill-neutral-900 dark:fill-neutral-100 font-extrabold"
              style={{ fontSize: '24px' }}
              textLength="380"
              lengthAdjust="spacingAndGlyphs"
            >
              {display}丨
            </text>
          </svg>
        </div>

        {/* 電腦與平板版（大螢幕維持原本最棒的清晰度） */}
        <h1 className="hidden sm:block text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
          {display}
          <span className="inline-block w-1 h-8 align-middle bg-neutral-900 dark:bg-neutral-100 ml-1 animate-blink" />
        </h1>

        {/* 
          2. 副標題同樣導入 RWD 安全範圍：
             - 如果希望副標題也死守不換行，且不要頂到 Padding，同樣限制在大螢幕恢復標準，
               小螢幕使用百分比與彈性間距。
        */}
        <div className="space-y-1 w-full flex flex-col items-center">
          <p className="text-neutral-600 dark:text-neutral-400 text-[3.2vw] sm:text-base md:text-lg leading-relaxed whitespace-nowrap text-center max-w-[90vw]">
            聽說斜咖程度和⚡度成正比，所以我努力提升我的斜咖程度
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 text-[3.2vw] sm:text-base md:text-lg leading-relaxed whitespace-nowrap text-center max-w-[90vw]">
            BUT 感謝你發現了我的BLOG 期待我會努力寫它也會努力創業
          </p>
        </div>
      </div>
    </section>
  );
}