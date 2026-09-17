"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FooterProps {
  articleCount: number;
  characterCount: number;
}

const blogStartTime = new Date('2026-06-12T19:57:00+08:00').getTime();

export default function Footer({ articleCount, characterCount }: FooterProps) {
  const [uptime, setUptime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setUptime(getUptime());
    const timer = window.setInterval(() => setUptime(getUptime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300 mt-8 sm:mt-16 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 items-start gap-4 text-sm font-mono text-neutral-500 dark:text-neutral-400 sm:grid-cols-3">
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <p>
                © 2026 Powered by{' '}
                <a href="https://hyjdevelop.com" target="_blank" rel="noreferrer" className="link-subtle">
                  HYJdevelop
                </a>
              </p>
              <p>
                網站出錯了嗎？{' '}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSerFnsVrPAU37D-WwJUDNVZlsvzZoqaFp4t_uIdt-_8btUPQA/viewform?usp=sharing&ouid=113387093467568493291"
                  target="_blank"
                  rel="noreferrer"
                  className="link-subtle"
                >
                點此告訴我們
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center  text-center">
              <p>共 {articleCount} 篇文章 共 {characterCount.toLocaleString('en-US')} 字</p>
              <p>新BLOG已運行 {uptime.days} 天 {uptime.hours} 小時 {uptime.minutes} 分鐘 {uptime.seconds} 秒</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-self-end">
                <Link href="/rss.xml" className="link-subtle">
                  RSS
                </Link>
                <Link href="/atom.xml" className="link-subtle">
                  Atom
                </Link>
                <a href="https://github.com/charlie960906/HYJblog" target="_blank" rel="noreferrer" className="link-subtle">
                  GitHub
                </a>
                <Link href="/update" className="link-subtle">
                  Update
                </Link>
            </div>
          </div>
        </div>
    </footer>
  );
}

function getUptime() {
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - blogStartTime) / 1000));
  const days = Math.floor(elapsedSeconds / 86400);
  const hours = Math.floor((elapsedSeconds % 86400) / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  return { days, hours, minutes, seconds };
}
