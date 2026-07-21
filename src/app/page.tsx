import { getSortedPostsData } from '@/lib/posts';
import Hero from '@/components/Hero';
import FeaturedPost from '@/components/FeaturedPost';
import PostGrid from '@/components/PostGrid';

export const dynamic = 'force-static';

export const metadata = {
  title: 'HYJBLOG - 技術與生活隨筆',
  description: '分享 C++、前端開發、資料結構與演算法，以及生活隨筆的個人部落格。',
};

export default function Home() {
  const allPostsData = getSortedPostsData();
  const featuredPost = allPostsData[0];
  const remainingPosts = allPostsData.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16 animate-fade-in w-full min-w-0 overflow-x-hidden">
      <Hero />
      {featuredPost && <FeaturedPost {...featuredPost} />}
      <PostGrid posts={remainingPosts} />
    </div>
  );
}