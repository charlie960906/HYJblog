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
    <div className="w-full pt-16 pb-12 max-w-7xl mx-auto">
      <div className="animate-page-in">
        <FolderClient allPosts={allPosts} categories={categories} />
      </div>
    </div>
  );
}