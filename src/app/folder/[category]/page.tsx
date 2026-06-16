import { getSortedPostsData, getPostsByCategory } from '@/lib/posts';
import CategoryPostsClient from './client';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  return {
    title: `${decodedCategory} - 文章`,
    description: `分類: ${decodedCategory} 的部落格文章`,
  };
}

export async function generateStaticParams() {
  const allPosts = getSortedPostsData();
  const categories = new Set(allPosts.map(post => post.category || 'general'));
  return Array.from(categories).map(category => ({
    category: encodeURIComponent(category),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categoryPosts = getPostsByCategory(decodedCategory);

  return (
    // w-full pt-16 pb-12 max-w-7xl mx-auto 確保與其他頁面完全一致的黃金閱讀高度與中央置中留白
    <div className="w-full pt-16 pb-12 max-w-7xl mx-auto">
      <div className="animate-page-in">
        <CategoryPostsClient category={decodedCategory} posts={categoryPosts} />
      </div>
    </div>
  );
}