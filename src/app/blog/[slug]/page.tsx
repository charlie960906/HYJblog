import { notFound } from 'next/navigation';
import Image from 'next/image';
// 💡 調整：同時引入 getPostData (拿原始內文) 與 getSerializedPost (拿渲染後的 MDX)
import { getPostData, getAllPostSlugs, formatDate, getSerializedPost } from '@/lib/posts';
import { MDXComponents } from '@/components/MDXComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ShareButtons from '@/components/ShareButtons';
import ReadingTime from '@/components/ReadingTime';
import LazyGiscus from '@/components/LazyGiscus';
import TableOfContents from '@/components/TableOfContents';
import TagPill from '@/components/TagPill';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = getPostData(slug);
    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return {
      title: 'Post Not Found',
    };
  }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractHeadings(content: string) {
  // 💡 安全防護：確保 content 存在，若不存在則直接回傳空陣列，避免 split 崩潰
  if (!content) return [];
  
  const headings: { id: string; title: string; level: number }[] = [];
  const lines = content.split('\n');
  const usedIds: Record<string, number> = {};

  for (const line of lines) {
    if (line.startsWith('## ')) {
      const title = line.slice(3).trim();
      let id = slugify(title);
      usedIds[id] = (usedIds[id] ?? 0) + 1;
      const count = usedIds[id] ?? 0;
      if (count > 1) id = `${id}-${count}`;
      headings.push({ id, title, level: 2 });
    } else if (line.startsWith('### ')) {
      const title = line.slice(4).trim();
      let id = slugify(title);
      usedIds[id] = (usedIds[id] ?? 0) + 1;
      const count = usedIds[id] ?? 0;
      if (count > 1) id = `${id}-${count}`;
      headings.push({ id, title, level: 3 });
    }
  }

  return headings;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  
  let rawPost;
  let serializedPost;
  
  try {
    // 1. 先透過 getPostData 取得未處理的原始 Markdown 內文（用來解析 TOC 目錄）
    rawPost = getPostData(slug);
    // 2. 再取得經由 next-mdx-remote 序列化後的 MDX 物件（用來渲染畫面）
    serializedPost = await getSerializedPost(slug);
  } catch (error) {
    console.error("讀取文章失敗:", error);
    notFound();
  }

  // 💡 修正：傳入擁有明確 content 純文字字串的 rawPost.content
  const headings = extractHeadings(rawPost.content);

  return (
    <>
      {/* 背景圖片 - 固定位置 */}
      {serializedPost.image && (
        <div className="fixed top-0 left-0 w-1/3 h-80 -z-10 hidden lg:block pointer-events-none overflow-hidden">
          <Image
            src={serializedPost.image}
            alt={serializedPost.title}
            fill
            className="object-cover opacity-10 dark:opacity-5"
            sizes="33vw"
            priority
          />
        </div>
      )}

      <article className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6 sm:space-y-8 min-w-0">
          {/* 文章標頭 */}
          <header className="space-y-4 pb-6 sm:pb-8 border-b border-neutral-200 dark:border-neutral-800">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight break-words">
              {serializedPost.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
              <time className="font-mono text-neutral-500 dark:text-neutral-500">
                {formatDate(serializedPost.date)}
              </time>

              <ReadingTime minutes={serializedPost.readingTime} />

              {serializedPost.tags && serializedPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {serializedPost.tags.map((tag) => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </div>

            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {serializedPost.description}
            </p>
          </header>

          {/* 行動裝置目錄 */}
          <TableOfContents headings={headings} variant="mobile" />

          {/* 文章內文 */}
          <div className="prose-custom space-y-4">
            {/* 💡 修正：傳入序列化後的 mdxSource 內容 */}
            <MDXRemote {...serializedPost.mdxSource} components={MDXComponents} />
          </div>

          {/* 分享區塊 */}
          <div className="py-8 border-t border-neutral-200 dark:border-neutral-800">
            <ShareButtons
              title={serializedPost.title}
              url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${slug}`}
              description={serializedPost.description}
            />
          </div>

          {/* 評論區塊 */}
          <div className="py-8 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              評論
            </h2>
            <LazyGiscus />
          </div>
        </div>

        {/* 側邊欄目錄 */}
        <aside className="hidden lg:block sticky top-24 self-start">
          <TableOfContents headings={headings} variant="sidebar" />
        </aside>
      </article>
    </>
  );
}