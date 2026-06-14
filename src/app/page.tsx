import React from 'react';
import { getSortedPostsData } from '@/lib/posts';
import Hero from '@/components/Hero';
import FeaturedPost from '@/components/FeaturedPost';
import PostGrid from '@/components/PostGrid';
import { generateRSSFeed, generateAtomFeed } from '@/lib/feed';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export default function Home() {
  const allPostsData = getSortedPostsData();

  // ====== 自動在靜態打包時生成 RSS 與 Atom XML 檔案 ======
  try {
    const publicDir = path.join(process.cwd(), 'public');
    
    const rssXml = generateRSSFeed();
    fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXml, 'utf8');

    const atomXml = generateAtomFeed();
    fs.writeFileSync(path.join(publicDir, 'atom.xml'), atomXml, 'utf8');
    
    console.log('✨ RSS & Atom feeds generated successfully in public folder!');
  } catch (error) {
    console.error('❌ Failed to generate feeds during build:', error);
  }
  // =================================================================

  const featuredPost = allPostsData[0];
  const remainingPosts = allPostsData.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16 animate-fade-in">
      <Hero />
      {featuredPost && <FeaturedPost {...featuredPost} />}
      <PostGrid posts={remainingPosts} />
    </div>
  );
}