import { getAllTagsWithCount } from '@/lib/posts';
import TagsPageClient from './TagsPageClient';

export const metadata = {
  title: '標籤雲 - HYJBLOG',
  description: '按標籤瀏覽文章',
};

export default function TagsPage() {
  const tags = getAllTagsWithCount();
  return <TagsPageClient tags={tags} />;
}
