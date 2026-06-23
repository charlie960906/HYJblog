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
    // 1. 原始字串
    paramsList.push({ tag: t });
    
    // 2. URL 編碼字串
    const encoded = encodeURIComponent(t);
    if (encoded !== t) {
      paramsList.push({ tag: encoded });
    }
    
    // 3. 小寫與小寫編碼字串
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
  
  // 安全解碼
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          標籤：{decodedTag}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">共有 {posts.length} 篇文章</p>
      </div>

      {posts.length > 0 ? (
        <PostGrid posts={posts} itemsPerPage="all" />
      ) : (
        <p className="text-neutral-600 dark:text-neutral-400">目前此標籤尚無文章</p>
      )}

      <div>
        <Link href="/tags" className="link-subtle">
          ← 返回標籤
        </Link>
      </div>
    </div>
  );
}