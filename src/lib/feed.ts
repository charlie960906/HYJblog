import { Feed } from 'feed';
import { getSortedPostsData, getPostData } from './posts';

const SITE_URL = 'https://hyjblog.hyjdevelop.com';

/**
 * 生成 RSS Feed
 */
export function generateRSSFeed(): string {
  const feed = new Feed({
    title: 'HYJblog',
    description: '聽說斜咖程度和⚡度成正比，所以我努力提升我的斜咖程度。在這裡記錄學習過程、範例與技術筆記。',
    id: SITE_URL,
    link: SITE_URL,
    language: 'zh-TW',
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} charlie960906. All rights reserved.`,
    generator: 'Next.js Blog Generator',
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
      atom1: `${SITE_URL}/atom.xml`,
    },
  });

  const posts = getSortedPostsData();

  posts.forEach(post => {
    const postData = getPostData(post.slug);
    
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/blog/${post.slug}`,
      link: `${SITE_URL}/blog/${post.slug}`,
      description: post.description,
      content: postData.content,
      author: [
        {
          name: 'charlie960906',
          link: SITE_URL,
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
  const feed = new Feed({
    title: 'HYJblog',
    description: '聽說斜咖程度和⚡度成正比，所以我努力提升我的斜咖程度。BUT感謝你發現了我的BLOG 期待我會努力寫它也會努力創業',
    id: SITE_URL,
    link: SITE_URL,
    language: 'zh-TW',
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} HUANG YOU-JYUN. All rights reserved.`,
    generator: 'Next.js Blog Generator',
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
      atom1: `${SITE_URL}/atom.xml`,
    },
  });

  const posts = getSortedPostsData();

  posts.forEach(post => {
    const postData = getPostData(post.slug);
    
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/blog/${post.slug}`,
      link: `${SITE_URL}/blog/${post.slug}`,
      description: post.description,
      content: postData.content,
      author: [
        {
          name: 'HUANG YOU-JYUN',
          link: SITE_URL,
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