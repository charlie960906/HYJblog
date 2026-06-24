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
    title: `${decodedCategory} - 分類`,
    description: `分類 ${decodedCategory} 的文章列表`,
  };
}

export async function generateStaticParams() {
  const allPosts = getSortedPostsData();
  const categories = new Set(allPosts.map(post => post.category || 'general'));
  
  const paramsList: { category: string }[] = [];
  
  categories.forEach(category => {
    // 1. 塞入原始字串 (例如 "日記", "C++", "ZJ解題")
    paramsList.push({ category: category });
    
    // 2. 塞入完全 URL 編碼後的字串 (例如 "%E6%97%A5%E8%A8%98", "C%2B%2B")
    const encoded = encodeURIComponent(category);
    if (encoded !== category) {
      paramsList.push({ category: encoded });
    }
    
    // 3. 塞入全小寫字串，防止大小寫不一致
    const lower = category.toLowerCase();
    if (lower !== category) {
      paramsList.push({ category: lower });
      const encodedLower = encodeURIComponent(lower);
      if (encodedLower !== lower && encodedLower !== encoded) {
        paramsList.push({ category: encodedLower });
      }
    }
  });

  return paramsList;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  
  // 安全解碼兩次，確保拿到最純粹的字串
  let decodedCategory = category;
  try {
    decodedCategory = decodeURIComponent(decodeURIComponent(category));
  } catch (e) {
    try {
      decodedCategory = decodeURIComponent(category);
    } catch (err) {
      decodedCategory = category;
    }
  }
  
  const categoryPosts = getPostsByCategory(decodedCategory);

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16 px-4">
      <div className="mx-auto max-w-4xl w-full">
        <div className="animate-page-in">
          <CategoryPostsClient category={decodedCategory} posts={categoryPosts} />
        </div>
      </div>
    </main>
  );
}