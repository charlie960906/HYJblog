'use client';

import { useLanguage } from '@/app/providers';

interface ReadingTimeProps {
  minutes: number;
}

export default function ReadingTime({ minutes }: ReadingTimeProps) {
  const { language } = useLanguage();
  const displayTime = Math.max(1, minutes); // 最少顯示 1 分鐘

  return (
    <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 inline-flex items-center gap-1">
      <span>📖</span>
      <span>{language === 'en' ? `${displayTime} min read` : `${displayTime} 分鐘閱讀`}</span>
    </span>
  );
}
