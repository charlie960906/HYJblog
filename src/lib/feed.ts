import { Feed } from 'feed';
import { getSortedPostsData, getPostData, formatDate } from './posts';

/**
 * 生成 RSS Feed
 */
export function generateRSSFeed(): string {
  const site_url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const feed = new Feed({
    title: '個人部落格',
    description: '使用 Next.js 和 Markdown 打造的極簡風格個人寫作空間',
    id: site_url,
    link: site_url,
    language: 'zh-TW',
    favicon: `${site_url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} All rights reserved.`,
    generator: 'Next.js Blog Generator',
  });

  const posts = getSortedPostsData();

  posts.forEach(post => {
    const postData = getPostData(post.slug);
    
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      description: post.description,
      content: postData.content,
      author: [
        {
          name: '作者名稱',
        },
      ],
      date: new Date(post.date),
      category: post.tags.map(tag => ({
        name: tag,
      })),
    });
  });

  return feed.rss2();
}

/**
 * 生成 Atom Feed
 */
export function generateAtomFeed(): string {
  const site_url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const feed = new Feed({
    title: '個人部落格',
    description: '使用 Next.js 和 Markdown 打造的極簡風格個人寫作空間',
    id: site_url,
    link: site_url,
    language: 'zh-TW',
    favicon: `${site_url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} All rights reserved.`,
    generator: 'Next.js Blog Generator',
  });

  const posts = getSortedPostsData();

  posts.forEach(post => {
    const postData = getPostData(post.slug);
    
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      description: post.description,
      content: postData.content,
      author: [
        {
          name: '作者名稱',
        },
      ],
      date: new Date(post.date),
      category: post.tags.map(tag => ({
        name: tag,
      })),
    });
  });

  return feed.atom1();
}
