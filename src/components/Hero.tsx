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
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100">
          {display}
          <span className="inline-block w-1 h-8 align-middle bg-neutral-900 dark:bg-neutral-100 ml-1 animate-blink" />
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
          我在這裡記錄學習過程、範例與技術筆記。歡迎訂閱與分享。
        </p>
      </div>
    </section>
  );
}
