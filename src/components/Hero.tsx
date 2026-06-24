"use client";
import { useEffect, useState, useRef } from 'react';
import { HERO_SENTENCES } from '@/lib/hero';

interface HeroProps {
  sentences?: string[];
}

export default function Hero({ sentences = HERO_SENTENCES }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [typing, setTyping] = useState(true);
  
  // =========================================================
  // 【打字效果專用 Ref 與 State】完全不變動
  // =========================================================
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [scale, setScale] = useState(1);

  // =========================================================
  // 💡【下方兩行字專用 Ref 與 State】獨立出來處理
  // =========================================================
  const subContainerRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const [subScale, setSubScale] = useState(1);

  useEffect(() => {
    let timeout: number;
    const current = sentences[index];

    if (!current) return;

    if (typing) {
      if (display.length < current.length) {
        timeout = window.setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 80);
      } else {
        timeout = window.setTimeout(() => setTyping(false), 1500);
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

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const textWidth = textRef.current.scrollWidth;

    if (textWidth > containerWidth) {
      const newScale = (containerWidth / textWidth) * 0.95;
      setScale(newScale);
    } else {
      setScale(1);
    }
  }, [display]);

  useEffect(() => {
    const handleResize = () => {
      if (!subContainerRef.current || !subTextRef.current) return;
      
      const containerWidth = subContainerRef.current.clientWidth;
      const textWidth = subTextRef.current.scrollWidth;

      if (textWidth > containerWidth) {
        // 快超出時，精準計算縮小比例，保持 5% 的安全間距
        const newScale = (containerWidth / textWidth) * 0.95;
        setSubScale(newScale);
      } else {
        // 空間夠大時，100% 原始大小，不變形
        setSubScale(1);
      }
    };

    // 初始化執行一次
    handleResize();

    // 監聽視窗縮放
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-12 sm:py-20 overflow-hidden w-full">
      <div className="mx-auto max-w-4xl text-center space-y-6 px-6 w-full flex flex-col items-center justify-center">
        
        <div ref={containerRef} className="w-full max-w-full flex items-center justify-center min-h-[4rem] overflow-visible">
          <h1 
            ref={textRef}
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              transition: 'transform 0.1s ease-out' 
            }}
            className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 whitespace-nowrap tracking-tight inline-flex items-center justify-center origin-center shrink-0"
          >
            <span>{display}</span>
            <span className="inline-block w-[3px] h-[1.1em] bg-neutral-900 dark:bg-neutral-100 ml-1 animate-blink shrink-0" />
          </h1>
        </div>

        {/* =========================================================
            💡【副標題兩行文字修正】
            - 使用獨立的 subContainerRef 監聽可用寬度
            - 加上 whitespace-nowrap 確保打死都不換行
            - 綁定 style transform scale 達成當螢幕裝不下時，整體平滑變小
           ========================================================= */}
        <div ref={subContainerRef} className="w-full max-w-full flex items-center justify-center min-h-[4rem] overflow-visible">
          <div 
            ref={subTextRef}
            style={{ 
              transform: `scale(${subScale})`,
              transformOrigin: 'center center',
              transition: 'transform 0.1s ease-out'
            }}
            className="space-y-2 inline-flex flex-col items-center justify-center origin-center shrink-0"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed whitespace-nowrap text-center break-keep">
              聽說斜咖程度和⚡度成正比，所以我努力提升我的斜咖程度
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed whitespace-nowrap text-center break-keep">
              BUT 感謝你發現了我的BLOG 期待我會努力寫它也會努力創業
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}