// src/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'public/post');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  image?: string;
  published: boolean;
  content: string;
  readingTime: number;
  mdxSource?: {
    compiledSource: string;
  };
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const cleanContent = content.replace(/[#*`\-_[\]()]/g, '');
  const characterCount = cleanContent.replace(/\s/g, '').length;
  const minutes = Math.ceil(characterCount / wordsPerMinute);
  return minutes || 1;
}

// 格式化日期的輔助函式
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('zh-TW', options);
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const content = matterResult.content || '';
      const readingTime = calculateReadingTime(content);

      const tags = Array.isArray(matterResult.data.tags)
        ? matterResult.data.tags.map((t: string) => t.trim())
        : matterResult.data.tags
        ? String(matterResult.data.tags).split(',').map((t) => t.trim())
        : [];

      return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        description: matterResult.data.description || '',
        tags,
        category: matterResult.data.category || '未分類',
        image: matterResult.data.image,
        published: matterResult.data.published !== false,
        content,
        readingTime,
        mdxSource: {
          compiledSource: content,
        }
      };
    });

  return allPostsData
    .filter((post) => post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const content = matterResult.content || '';
  const readingTime = calculateReadingTime(content);

  const tags = Array.isArray(matterResult.data.tags)
    ? matterResult.data.tags.map((t: string) => t.trim())
    : matterResult.data.tags
    ? String(matterResult.data.tags).split(',').map((t) => t.trim())
    : [];

  return {
    slug,
    title: matterResult.data.title || slug,
    date: matterResult.data.date || new Date().toISOString().split('T')[0],
    description: matterResult.data.description || '',
    tags,
    category: matterResult.data.category || '未分類',
    image: matterResult.data.image,
    published: matterResult.data.published !== false,
    content,
    readingTime,
    mdxSource: {
      compiledSource: content,
    }
  };
}

// 獲取所有文章 Slug 供動態路由打包使用
export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ''),
      };
    });
}

// 序列化文章資料
export function getSerializedPost(slug: string): PostData {
  return getPostData(slug);
}

export function getAllCategories(): { [key: string]: number } {
  const posts = getSortedPostsData();
  const categories: { [key: string]: number } = {};

  posts.forEach((post) => {
    if (post.category) {
      categories[post.category] = (categories[post.category] || 0) + 1;
    }
  });

  return categories;
}

// 依據分類篩選文章
export function getPostsByCategory(category: string): PostData[] {
  const posts = getSortedPostsData();
  return posts.filter((post) => post.category === category);
}

export function getAllTags(): { [key: string]: number } {
  const posts = getSortedPostsData();
  const tags: { [key: string]: number } = {};

  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (tag) {
          tags[tag] = (tags[tag] || 0) + 1;
        }
      });
    }
  });

  return tags;
}

// =================================================================
// 終極安全修正：標籤與網址 Slug 的安全雙向對應表
// =================================================================
const tagSlugMap: { [key: string]: string } = {
  'c++': 'cpp',
  'C++': 'cpp',
};

export function tagToSlug(tag: string): string {
  if (!tag) return 'unnamed-tag';
  const lowerTag = tag.trim();
  
  if (tagSlugMap[lowerTag]) {
    return tagSlugMap[lowerTag];
  }
  
  // 安全轉換：先用標準編碼，並把 % 換成底線或連字號，確保檔案系統絕對能建立該資料夾
  return encodeURIComponent(lowerTag).replace(/%/g, '-').toLowerCase();
}

export function slugToTag(slug: string, allTags: string[] = []): string {
  if (!slug) return '';
  
  // 1. 先用對應表精準比對 (如 cpp -> C++)
  for (const [originalTag, slugValue] of Object.entries(tagSlugMap)) {
    if (slugValue === slug) return originalTag;
  }
  
  // 2. 核心修正：從目前專案所有的實體標籤庫中，反向進行 tagToSlug 匹配
  // 這是最安全、最防錯的做法，不依賴字串正則替換，100% 找回原始中文（例如「堆疊」）
  for (const originalTag of allTags) {
    if (originalTag && tagToSlug(originalTag) === slug) {
      return originalTag;
    }
  }

  // 3. 安全防線：如果真的都沒對上，才進行嘗試性的解碼，並加上防空值保護
  try {
    const safePercentStr = String(slug).replace(/-/g, '%');
    return decodeURIComponent(safePercentStr);
  } catch (e) {
    return String(slug);
  }
}