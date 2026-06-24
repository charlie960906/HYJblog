'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface AnimePageWrapperProps {
  children: React.ReactNode;
}

export default function AnimePageWrapper({ children }: AnimePageWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    let backupTimer: NodeJS.Timeout;

    // 💡 1. 頁面切換瞬間，立刻給予基本不透明度與硬體加速，防止 CLS 閃爍
    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
      containerRef.current.style.willChange = 'transform, opacity'; // 告知瀏覽器啟用 GPU 加速
    }

    // 💡 2. 安全保險：120ms 內防空白降級機制
    backupTimer = setTimeout(() => {
      if (containerRef.current && containerRef.current.style.opacity === '0') {
        containerRef.current.style.opacity = '1';
      }
    }, 120);

    // 💡 3. 異步加載 Anime.js，不阻塞網頁首頁首屏加載速度
    import('animejs')
      .then((module) => {
        if (!active || !containerRef.current) return;

        const animeModule = module as any;
        const animeFn = animeModule.default || animeModule;

        if (typeof animeFn === 'function') {
          animeFn({
            targets: containerRef.current,
            opacity: [0, 1],
            translateY: [10, 0],       // 輕微平移（10px）效能優於大範圍平移
            duration: 400,             // 縮短時間讓使用者感覺網站回應更快
            easing: 'easeOutCubic',    // 運算成本較低的貝茲曲線
            complete: () => {
              if (containerRef.current) {
                containerRef.current.style.willChange = 'auto'; // 動畫結束釋放記憶體
              }
            }
          });
        } else {
          containerRef.current.style.opacity = '1';
        }
      })
      .catch(() => {
        if (containerRef.current) containerRef.current.style.opacity = '1';
      });

    return () => {
      active = false;
      clearTimeout(backupTimer);
    };
  }, [pathname]);

  return (
    <div ref={containerRef} style={{ opacity: 0 }} className="w-full flex-grow">
      {children}
    </div>
  );
}