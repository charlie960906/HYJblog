import { getAllTags, getPostsByTag } from '@/lib/posts';
import PostsSection from '@/components/PostsSection';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `${decodedTag} - 標籤`,
    description: `標籤 ${decodedTag} 的文章列表`,
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  const paramsList: { tag: string }[] = [];
  
  tags.forEach(t => {
    paramsList.push({ tag: t });
    
    const encoded = encodeURIComponent(t);
    if (encoded !== t) {
      paramsList.push({ tag: encoded });
    }
    
    const lower = t.toLowerCase();
    if (lower !== t) {
      paramsList.push({ tag: lower });
      const encodedLower = encodeURIComponent(lower);
      if (encodedLower !== lower && encodedLower !== encoded) {
        paramsList.push({ tag: encodedLower });
      }
    }
  });

  return paramsList;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  
  let decodedTag = tag;
  try {
    decodedTag = decodeURIComponent(decodeURIComponent(tag));
  } catch (e) {
    try {
      decodedTag = decodeURIComponent(tag);
    } catch (err) {
      decodedTag = tag;
    }
  }
  
  const posts = getPostsByTag(decodedTag);

  return (
    <main className="min-h-[100svh] pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <PostsSection
          title={`標籤：${decodedTag}`}
          subtitle={`共有 ${posts.length} 篇文章`}
          posts={posts}
          itemsPerPage="all"
          backLink={{ href: '/tags', label: '← 返回所有標籤' }}
          emptyState={<p className="text-neutral-600 dark:text-neutral-400">目前此標籤尚無文章</p>}
        />
      </div>
    </main>
  );
}