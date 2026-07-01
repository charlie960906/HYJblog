import { getSortedPostsData, getAllCategories } from '@/lib/posts';
import FolderClient from './client';

export const metadata = {
  title: '文章分類 - HYJBLOG',
  description: '按分類瀏覽部落格文章',
};

export default function FolderArchive() {
  const allPosts = getSortedPostsData();
  const categories = getAllCategories();

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl w-full">
        <FolderClient allPosts={allPosts} categories={categories} />
      </div>
    </main>
  );
}