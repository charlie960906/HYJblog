'use client';

import React from 'react';
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

  if (tags.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-12 text-neutral-500 dark:text-neutral-400 text-sm">
        目前尚無標籤
      </div>
    );
  }

  // 按照點擊/文章次數，由多向少排列（降序排序）
  const sortedTags = [...tags].sort((a, b) => b.value - a.value);

  // 找出最大與最小值用來做字型層次計算
  const counts = sortedTags.map(t => t.value);
  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);

  // 定義熱門程度的字型與視覺權重
  const getTagStyle = (value: number) => {
    if (maxCount === minCount) return 'text-sm sm:text-base font-medium opacity-85';
    
    const percentage = (value - minCount) / (maxCount - minCount);
    
    if (percentage > 0.75) {
      // 最熱門標籤
      return 'text-lg sm:text-xl font-bold tracking-wide';
    } else if (percentage > 0.4) {
      // 次熱門標籤
      return 'text-base sm:text-lg font-semibold tracking-wide opacity-90';
    } else if (percentage > 0.15) {
      // 一般標籤
      return 'text-sm sm:text-base font-medium opacity-80';
    } else {
      // 冷門標籤
      return 'text-xs sm:text-sm font-normal opacity-55';
    }
  };

  const handleTagClick = (tagText: string) => {
    router.push(`/tags/${encodeURIComponent(tagText)}`);
  };

  return (
    // 💡 修正處：移除 max-w 限制、border 邊框、bg 背景色、shadow 陰影與 backdrop-blur
    // 讓外層變成完全透明的純容器，完美融合進你外層的大框架中
    <div className="w-full">
      {/* 保持靠左對齊，並微調 gap 讓標籤彼此間距更自然 */}
      <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-5 sm:gap-x-5 sm:gap-y-6">
        {sortedTags.map((tag, index) => {
          const styleClass = getTagStyle(tag.value);
          
          return (
            <button
              key={`${tag.text}-${index}`}
              onClick={() => handleTagClick(tag.text)}
              className="inline-block transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none"
            >
              {/* 日間純黑 (text-neutral-950)，暗黑純白 (dark:text-white) */}
              <span 
                className={`${styleClass} text-neutral-950 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-150 flex items-baseline`}
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