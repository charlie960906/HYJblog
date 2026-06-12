import { getSortedPostsData, getAllCategories } from '@/lib/posts';
import FolderClient from './client';

export const metadata = {
  title: '文章分類',
  description: '按分類瀏覽部落格文章',
};

export default function FolderArchive() {
  const allPosts = getSortedPostsData();
  const categories = getAllCategories();

  return <FolderClient allPosts={allPosts} categories={categories} />;
}
