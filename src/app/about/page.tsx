import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiGithub, SiInstagram, SiX } from 'react-icons/si';

export const metadata = {
  title: 'About',
  description: '關於 HYJBLOG。',
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">
          <aside className="flex flex-col items-center text-center lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-full border-8 border-white bg-white shadow-xl dark:border-neutral-900 dark:bg-neutral-900">
              <Image
                src="/images/me.jpg"
                alt="HYJBLOG 頭像"
                width={192}
                height={192}
                className="h-44 w-44 rounded-full object-cover sm:h-48 sm:w-48"
              />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              HYJ
            </h1>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              Developer · Blogger
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/hyjcharlie960906/?hl=zh-tw"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                <SiInstagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://x.com/charlie960906"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                title="X"
                className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                <SiX className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href="https://github.com/charlie960906"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                <SiGithub className="h-5 w-5" aria-hidden="true" />
              </a>

            </div>
          </aside>

          <div className="min-w-0 space-y-14">
            <section className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                About
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
                關於我
              </h2>
            
              <p className="max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
                嗨，我是老黃。
              </p>
              <p className="max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
                這是我的個人部落格，目前正在寫區塊鏈相關研究文章、股票研究文章等，然後也會在這分享我的生活!!!
              </p>
            </section>

            <section className="border-t border-neutral-200 pt-10 dark:border-neutral-800">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                Education
              </p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                學校歷程
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  ['中興大學資管系', 'NCHU_MIS'],
                  ['嘉義高中', 'CYSH'],
                  ['大林國中', 'TLJH'],
                  ['平林國小', 'PLES'],
                ].map(([school, code]) => (
                  <div key={code} className="flex items-center justify-between gap-4 border-l-2 border-neutral-300 pl-4 dark:border-neutral-700">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{school}</span>
                    <span className="text-sm font-mono text-neutral-500 dark:text-neutral-400">{code}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-neutral-200 pt-10 dark:border-neutral-800">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                Experience
              </p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                經歷
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">嘉義高中資研社副社長</h3>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">2024 - 2025</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">第 79 屆嘉義高中畢聯會影片組</h3>
                  <p className="mt-2 leading-7 text-neutral-600 dark:text-neutral-300">參與畢業相關影像內容的企劃與製作。</p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">第 79 屆嘉義高中畢業歌</h3>
                  <p className="mt-2 leading-7 text-neutral-600 dark:text-neutral-300">擔任編劇、拍攝與剪輯，完成畢業歌影像作品。</p>
                  <a
                    href="https://www.youtube.com/watch?v=PskDmFLpdhQ"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                  >
                    嘉義高中第 79 屆畢業歌《未完待旭》Official Music
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </section>
            <section className="border-t border-neutral-200 pt-10 dark:border-neutral-800">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">有點難想要寫什麼 慢慢補充😴</h3>
                  </div>
                </div>

            </section>

          </div>
        </div>
      </section>
    </main>
  );
}
