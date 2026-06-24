import { getAllTags, getPostsByTag } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import PostGrid from '@/components/PostGrid';
import Link from 'next/link';

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
    /* 💡 關鍵修改：使用 px-4，讓左右留白與首頁完全對齊一模一樣 */
    <main className="min-h-screen pt-24 md:pt-28 pb-16 px-4">
      <div className="mx-auto max-w-4xl space-y-6">
        
        <div>
          <Link href="/tags" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors block mb-4">
            ← 返回所有標籤
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            標籤：{decodedTag}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">共有 {posts.length} 篇文章</p>
        </div>

        {posts.length > 0 ? (
          <PostGrid posts={posts} itemsPerPage="all" />
        ) : (
          <p className="text-neutral-600 dark:text-neutral-400">目前此標籤尚無文章</p>
        )}

      </div>
    </main>
  );
}