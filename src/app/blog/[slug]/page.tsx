import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostData, getAllPostSlugs, getSerializedPost } from '@/lib/posts';
import { formatDate } from '@/lib/types';
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
    const decodedSlug = decodeURIComponent(slug);
    const post = getPostData(decodedSlug);
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
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractHeadings(content: string) {
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

function injectIdsToHtml(htmlContent: string, headings: { id: string; title: string; level: number }[]) {
  let modifiedHtml = htmlContent;
  
  headings.forEach((heading) => {
    if (heading.level === 2) {
      const regex = new RegExp(`<h2>\\s*${escapeRegExp(heading.title)}\\s*</h2>`, 'g');
      modifiedHtml = modifiedHtml.replace(regex, `<h2 id="${heading.id}">${heading.title}</h2>`);
    } else if (heading.level === 3) {
      const regex = new RegExp(`<h3>\\s*${escapeRegExp(heading.title)}\\s*</h3>`, 'g');
      modifiedHtml = modifiedHtml.replace(regex, `<h3 id="${heading.id}">${heading.title}</h3>`);
    }
  });
  
  return modifiedHtml;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  let rawPost;
  let serializedPost;
  
  try {
    rawPost = getPostData(decodedSlug);
    serializedPost = await getSerializedPost(decodedSlug);
  } catch (error) {
    console.error(`讀取文章失敗 (${decodedSlug}):`, error);
    notFound();
  }

  const headings = extractHeadings(rawPost.content);
  const finalHtmlContent = injectIdsToHtml(
    serializedPost.mdxSource.compiledSource,
    headings
  );

  return (
    <main className="w-full mx-auto max-w-7xl pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="w-full space-y-8 lg:space-y-10">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px] items-start">
          <article className="space-y-6 sm:space-y-8 min-w-0">
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
                    {serializedPost.tags.map((tag: string) => (
                      <TagPill key={tag} tag={tag} />
                    ))}
                  </div>
                )}
              </div>

              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {serializedPost.description}
              </p>
            </header>

            <TableOfContents headings={headings} variant="mobile" />

            <div 
              className="prose-custom space-y-4 text-neutral-800 dark:text-neutral-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: finalHtmlContent }}
            />
          </article>
          <aside className="hidden lg:block sticky top-28 self-start">
            <TableOfContents headings={headings} variant="sidebar" />
          </aside>
        </div>

        <div className="max-w-3xl lg:max-w-none w-full lg:w-[calc(100%-320px)] xl:w-[calc(100%-360px)] space-y-8">
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

      </div>
    </main>
  );
}