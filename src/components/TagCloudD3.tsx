'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface TagItem {
  text: string;
  value: number;
}

interface TagCloudD3Props {
  tags: TagItem[];
}

export default function TagCloudD3({ tags }: TagCloudD3Props) {
  const router = useRouter();

  // 💡 優化 1：使用 useMemo 快取排序與極值計算，避免元件在父層更新時重複做陣列跑迴圈計算
  const { sortedTags, maxCount, minCount } = useMemo(() => {
    if (!tags || tags.length === 0) {
      return { sortedTags: [], maxCount: 0, minCount: 0 };
    }
    const sorted = [...tags].sort((a, b) => b.value - a.value);
    const counts = sorted.map(t => t.value);
    return {
      sortedTags: sorted,
      maxCount: Math.max(...counts),
      minCount: Math.min(...counts)
    };
  }, [tags]);

  if (sortedTags.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-12 text-neutral-500 dark:text-neutral-400 text-sm">
        目前尚無標籤
      </div>
    );
  }

  // 定義熱門程度的字型與視覺權重
  const getTagStyle = (value: number) => {
    if (maxCount === minCount) return 'text-sm sm:text-base font-medium opacity-85';
    
    const percentage = (value - minCount) / (maxCount - minCount);
    
    if (percentage > 0.75) {
      return 'text-lg sm:text-xl font-bold tracking-wide';
    } else if (percentage > 0.4) {
      return 'text-base sm:text-lg font-semibold tracking-wide opacity-90';
    } else if (percentage > 0.15) {
      return 'text-sm sm:text-base font-medium opacity-80';
    } else {
      return 'text-xs sm:text-sm font-normal opacity-55';
    }
  };

  const handleTagClick = (tagText: string) => {
    router.push(`/tags/${encodeURIComponent(tagText)}`);
  };

  return (
    // 💡 優化 2：加入 content-visibility 與 contain-intrinsic-size
    // 這是現代瀏覽器的極致效能優化 CSS，如果標籤雲在首頁下方尚未滾動到時，瀏覽器會跳過它的渲染，大幅減少首次載入的 CPU 損耗
    <div className="w-full overflow-visible" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 150px', overflow: 'visible' }}>
      <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-5 sm:gap-x-5 sm:gap-y-6 overflow-visible">
        {sortedTags.map((tag, index) => {
          const styleClass = getTagStyle(tag.value);
          
          return (
            <button
              key={`${tag.text}-${index}`}
              onClick={() => handleTagClick(tag.text)}
              // 💡 優化 3：在 className 中加入 will-change-transform，強制開啟瀏覽器 GPU 硬體加速，讓 hover:scale-105 縮放動畫達到滿幀 60/120fps 的流暢度
              className="relative z-[9999] inline-block overflow-visible transition-all duration-200 transform hover:z-[10000] hover:scale-105 active:scale-95 focus:outline-none will-change-transform"
              style={{ overflow: 'visible' }}
            >
              <span 
                className={`${styleClass} relative z-[10000] text-neutral-950 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-150 flex items-baseline`}
                style={{ overflow: 'visible' }}
              >
                <span>#{tag.text}</span>
                <span className="text-[10px] font-mono opacity-35 ml-1 select-none">
                  ({tag.value})
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}