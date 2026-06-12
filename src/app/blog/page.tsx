import { getSortedPostsData, getAllCategories } from '@/lib/posts';
import BlogArchiveClient from './client';

export const metadata = {
  title: '文章歸檔',
  description: '所有已發佈的部落格文章',
};

export default function BlogArchive() {
  const allPosts = getSortedPostsData();
  const categories = getAllCategories();

  return <BlogArchiveClient allPosts={allPosts} categories={categories} />;
}
