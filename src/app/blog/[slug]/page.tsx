import { notFound } from 'next/navigation';
import Image from 'next/image';
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
  let post;
  try {
    // fetch serialized MDX so we can render with MDXRemote
    post = await getSerializedPost(slug);
  } catch {
    notFound();
  }

  const headings = extractHeadings(post.content);

  return (
    <>
      {/* Background Image - Fixed Position */}
      {post.image && (
        <div className="fixed top-0 left-0 w-1/3 h-80 -z-10 hidden lg:block pointer-events-none overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-10 dark:opacity-5"
            sizes="33vw"
            priority
          />
        </div>
      )}

      <article className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6 sm:space-y-8 min-w-0">
        {/* Post Header */}
        <header className="space-y-4 pb-6 sm:pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight break-words">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
            <time className="font-mono text-neutral-500 dark:text-neutral-500">
              {formatDate(post.date)}
            </time>

            <ReadingTime minutes={post.readingTime} />

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
            )}
          </div>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {post.description}
          </p>
        </header>

        <TableOfContents headings={headings} variant="mobile" />

        {/* Post Content */}
        <div className="prose-custom space-y-4">
          <MDXRemote {...post.mdxSource} components={MDXComponents} />
        </div>

        {/* Share Section */}
        <div className="py-8 border-t border-neutral-200 dark:border-neutral-800">
          <ShareButtons
            title={post.title}
            url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${slug}`}
            description={post.description}
          />
        </div>

        {/* Comments Section */}
        <div className="py-8 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            評論
          </h2>
          <LazyGiscus />
        </div>
      </div>

      <aside className="hidden lg:block sticky top-24 self-start">
        <TableOfContents headings={headings} variant="sidebar" />
      </aside>
    </article>
    </>
  );
}
