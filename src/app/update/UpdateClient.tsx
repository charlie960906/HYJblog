'use client';

import type { ReactNode } from 'react';
import { useLanguage } from '@/app/providers';

interface UpdateEntry {
  datetime: string;
  title: string;
  content: ReactNode;
}

const english: Record<string, { title: string; items: string[] }> = {
  '2026-09-18 22:41': { title: 'Improved Markdown rendering, syntax highlighting, and copy buttons', items: ['Fixed font sizing', 'Added syntax highlighting', 'Added code copy buttons'] },
  '2026-09-17 10:56': { title: 'Accessibility, usability, and performance improvements', items: ['Improved accessibility and usability', 'Improved performance so more people can use the site smoothly', 'Refined the overall design and interactions'] },
  '2026-09-17 10:12': { title: 'Converted images to WebP for faster, lighter pages', items: ['Converted site images from JPG to WebP', 'Reduced bandwidth and improved loading speed', 'Made the site faster and smoother to use'] },
  '2026-09-13 22:03': { title: 'Published the August review and refreshed the site', items: ['Completed the August review article', 'Updated site content and features', 'Fixed code warnings'] },
  '2026-08-22 09:53|MENU': { title: 'Updated navigation and footer; added the About page', items: ['Reorganized the navigation and GitHub link', 'Added footer links and site statistics', 'Added a personal About page'] },
  '2026-08-22 09:53|Pets': { title: 'Improved the pet system, table of contents, and code warnings', items: ['Pets now follow the window and stay within its bounds', 'Made the table of contents follow the page while scrolling', 'Fixed code warnings'] },
  '2026-08-22 09:18': { title: 'Fixed code warnings and an overlay issue with the pet button', items: ['Fixed code warnings', 'Fixed the pet button being covered by other elements'] },
  '2026-08-06 22:34': { title: 'Updated site content and page features', items: ['Improved reading and navigation on article pages', 'Adjusted the category drawer, featured article, and table of contents', 'Regenerated RSS and Atom feeds'] },
  '2026-08-05 22:18': { title: 'Added articles and draft content', items: ['Added the Blockchain Dictionary article', 'Added content about Pixiuscam and electric heavy equipment', 'Filled in article details to make the blog more complete'] },
  '2026-07-24 21:46': { title: 'Fixed article sharing', items: ['Fixed the article share button behavior', 'Adjusted share component data handling', 'Updated the electric heavy equipment article'] },
  '2026-07-23 07:56': { title: 'Corrected article text', items: ['Fixed a typo in the July 22, 2026 article'] },
  '2026-07-22 22:35': { title: 'Regenerated subscription feeds', items: ['Regenerated RSS and Atom feeds', 'Updated the Giscus comments API usage', 'Made the comments section follow the site theme'] },
  '2026-07-22 20:35': { title: 'Added life updates and media', items: ['Updated the July 22, 2026 life journal', 'Added photos and videos', 'Added more reflections and everyday details'] },
  '2026-07-21 15:10': { title: 'Updated the Pets system and responsive layouts', items: ['Updated Pets Beta 2.0', 'Improved desktop and mobile layouts', 'Adjusted pet interactions, the home page, and category pages'] },
  '2026-07-19 21:13': { title: 'Added ZeroJudge and article images', items: ['Updated images for ZeroJudge problems', 'Added images to C++ articles', 'Updated RSS and Atom feeds'] },
  '2026-06-24 22:44': { title: 'Added PWA support and page animations', items: ['Added a web app manifest so the site can be installed on devices', 'Improved page transitions and the tag cloud', 'Adjusted the home page hero for different screen sizes'] },
  '2026-06-23 21:36': { title: 'Fixed feeds, site URLs, and license details', items: ['Fixed the site URLs used by RSS, Atom, and the sitemap', 'Updated feed descriptions and copyright information', 'Improved Chinese keyword handling for categories and tags', 'Updated the license file'] },
  '2026-06-23 14:18': { title: 'Fixed Chinese keyword search for categories and tags', items: ['Fixed Chinese keyword search for categories and tags', 'Spent a lot of time optimizing and fixing bugs'] },
  '2026-06-17 20:22': { title: 'Published the June review', items: ['Published a new article', 'A great month :)'] },
  '2026-06-16 21:33': { title: 'Improved safe spacing on small screens', items: ['Added safe margins to the home page content', 'Added safe margins to article content'] },
  '2026-06-14 21:35': { title: 'Improved article search', items: ['Fixed bugs in article search', 'Improved how search results are displayed'] },
  '2026-06-12 22:44': { title: 'Moved older articles to the new site', items: ['Moved older articles from the previous site'] },
  '2026-06-12 22:12': { title: 'Corrected the site address', items: ['Updated the domain to hyjblog.hyjdevelop.com'] },
  '2026-06-12 19:57': { title: 'A fresh start: building a better-looking blog', items: ['Created the basic site structure', 'Added Markdown file support', 'Added basic page navigation'] },
};

export default function UpdateClient({ updates }: { updates: UpdateEntry[] }) {
  const { language } = useLanguage();
  const en = language === 'en';
  return (
    <main id="main-content" className="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-x-hidden">
      <div className="mx-auto max-w-6xl w-full space-y-8">
        <section className="space-y-4"><div className="max-w-3xl">
          <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400">{en ? 'Updates' : '更新紀錄'}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100">{en ? 'Building this blog, one update at a time' : '老黃修修補補打造了這個部落格'}</h1>
        </div></section>
        <section className="grid gap-6 grid-cols-1">
          {updates.map((update) => {
            const translated = english[update.datetime + (update.title.startsWith('MENU') ? '|MENU' : update.title.startsWith('寵物') ? '|Pets' : '')] ?? english[update.datetime];
            return <article key={update.datetime + update.title} className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex min-h-36 flex-col gap-3"><div><h2 className="mt-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">{en && translated ? translated.title : update.title}</h2></div>
                {en && translated ? <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">{translated.items.map((item) => <li key={item}>{item}</li>)}</ul> : update.content}
                <p className="mt-auto self-end text-xs uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">{update.datetime}</p>
              </div>
            </article>;
          })}
        </section>
      </div>
    </main>
  );
}
