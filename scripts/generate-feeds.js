const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const { Feed } = require('feed');

const SITE_URL = 'https://hyjblog.hyjdevelop.com';
const POSTS_DIR = path.join(process.cwd(), 'public', 'post');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  return fs.readdirSync(POSTS_DIR)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf8');
      const { data, content: body } = matter(content);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date ? new Date(data.date) : new Date(0),
        tags: Array.isArray(data.tags) ? data.tags : [],
        content: body,
      };
    })
    .filter((post) => post.date.getTime() > 0)
    .sort((a, b) => b.date - a.date);
}

function generateFeed(posts) {
  const feed = new Feed({
    title: 'HYJBLOG',
    description: '分享 C++、前端開發、資料結構與演算法，以及生活隨筆的個人部落格。',
    id: SITE_URL,
    link: SITE_URL,
    language: 'zh-TW',
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} HYJBLOG. All rights reserved.`,
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
      atom1: `${SITE_URL}/atom.xml`,
    },
    author: {
      name: 'HYJBLOG',
      link: SITE_URL,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/blog/${post.slug}`,
      link: `${SITE_URL}/blog/${post.slug}`,
      description: post.description,
      content: marked.parse(post.content),
      author: [
        {
          name: 'HYJBLOG',
          link: SITE_URL,
        },
      ],
      date: post.date,
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return { rss: feed.rss2(), atom: feed.atom1() };
}

function writeFeeds() {
  const posts = getPosts();

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const { rss, atom } = generateFeed(posts);

  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss, 'utf8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'atom.xml'), atom, 'utf8');
}

try {
  writeFeeds();
  console.log('✅ RSS and Atom feeds generated successfully.');
  process.exit(0);
} catch (error) {
  console.error('❌ Failed to generate feeds:', error);
  process.exit(1);
}
