import FeaturedPost from '@/components/FeaturedPost';
import PostGrid from '@/components/PostGrid';
import { getSortedPostsData } from '@/lib/posts';
import Hero from '@/components/Hero';

export default function Home() {
  const allPosts = getSortedPostsData();
  const featuredPost = allPosts[0];
  const gridPosts = allPosts.slice(1);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <Hero />

      {/* Featured Post */}
      {featuredPost && (
        <section className="animate-list-item space-y-6" style={{ animationDelay: '90ms' }}>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Feature
          </h2>
          <FeaturedPost
            slug={featuredPost.slug}
            title={featuredPost.title}
            date={featuredPost.date}
            description={featuredPost.description}
            tags={featuredPost.tags}
            image={featuredPost.image}
            readingTime={featuredPost.readingTime}
          />
        </section>
      )}

      {/* More Posts Grid */}
      {gridPosts.length > 0 && (
        <section className="animate-list-item" style={{ animationDelay: '180ms' }}>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
            Latest
          </h2>
          <PostGrid posts={gridPosts} itemsPerPage={9} />
        </section>
      )}
    </div>
  );
}
