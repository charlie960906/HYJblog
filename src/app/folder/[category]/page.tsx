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

  return <CategoryPostsClient category={decodedCategory} posts={categoryPosts} />;
}
