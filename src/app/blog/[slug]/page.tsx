// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Folder, ArrowLeft, Tag } from 'lucide-react';
import { getPostData, getAllPostSlugs, formatDate } from '@/lib/posts';
import ShareButtons from '@/components/ShareButtons';
import ReadingTime from '@/components/ReadingTime';
import LazyGiscus from '@/components/LazyGiscus';

export const dynamic = 'force-static';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// 關鍵修正：對齊新版 App Router 規格，直接將含有 { slug: '...' } 的陣列回傳給 Next.js
export function generateStaticParams() {
  return getAllPostSlugs();
}

export default function PostPage({ params }: PostPageProps) {
  let postData;
  try {
    postData = getPostData(params.slug);
  } catch (error) {
    notFound();
  }

  if (!postData || !postData.published) {
    notFound();
  }

  // 取得文章當前的絕對 URL (請依據您的網域自行調整，此處用於分享按鈕)
  const postUrl = `https://github.com/charlie960906/HYJblog/blog/${params.slug}`;

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      {/* 返回按鈕 */}
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回文章列表
        </Link>
      </div>

      {/* 文章標頭區塊 */}
      <header className="space-y-4 mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-mono">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1.5" />
            {formatDate(postData.date)}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5" />
            <ReadingTime minutes={postData.readingTime} />
          </span>
          {postData.category && (
            <Link 
              href={`/folder/${encodeURIComponent(postData.category)}`}
              className="flex items-center hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <Folder className="w-4 h-4 mr-1.5" />
              {postData.category}
            </Link>
          )}
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl leading-tight">
          {postData.title}
        </h1>

        {postData.description && (
          <p className="text-lg text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed border-l-4 border-neutral-200 dark:border-neutral-800 pl-4 italic">
            {postData.description}
          </p>
        )}

        {/* 標籤區 */}
        {postData.tags && postData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {postData.tags.map((tag) => (
              <span 
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-800/50"
              >
                <Tag className="w-3 h-3 mr-1 text-neutral-400" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 特色主圖 */}
      {postData.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl mb-8 sm:mb-12 shadow-md">
          <Image
            src={postData.image}
            alt={postData.title}
            fill
            priority
            className="object-cover"
            sizes="(max-w-4xl) 100vw, 896px"
          />
        </div>
      )}

      {/* 文章主體內文 */}
      <div className="prose prose-neutral dark:prose-invert max-w-none mb-12 sm:mb-16">
        {/* 關鍵型別防禦：安全讀取 mdxSource.compiledSource，若不存在則退回內容本文 */}
        <div 
          className="prose-custom space-y-4"
          dangerouslySetInnerHTML={{ __html: postData.mdxSource?.compiledSource || postData.content }}
        />
      </div>

      {/* 分享區塊 */}
      <div className="border-t border-b border-neutral-200 dark:border-neutral-800 py-6 my-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          如果這篇文章對你有幫助，歡迎分享給更多人：
        </span>
        <ShareButtons url={postUrl} title={postData.title} />
      </div>

      {/* Giscus 評論區塊 */}
      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <LazyGiscus />
      </div>
    </article>
  );
}