import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'public/post');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  image: string | undefined;
  published: boolean;
  content: string;
  readingTime: number;
}

export interface SerializedPost extends Omit<PostData, 'content'> {
  mdxSource: {
    compiledSource: string;
    frontmatter?: any;
    scope?: any;
  };
}

/**
 * 獲取所有文章的 Slug 列表
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * 根據 Slug 獲取原始文章資料
 */
export function getPostData(slug: string): PostData {
  let cleanSlug = decodeURIComponent(slug);
  let fullPath = path.join(postsDirectory, `${cleanSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    const alternativeSlug1 = cleanSlug.replace(/_/g, '+');
    const alternativeSlug2 = cleanSlug.replace(/_/g, '-');
    const alternativeSlug3 = cleanSlug.replace(/\+/g, '_');
    
    if (fs.existsSync(path.join(postsDirectory, `${alternativeSlug1}.md`))) {
      fullPath = path.join(postsDirectory, `${alternativeSlug1}.md`);
    } else if (fs.existsSync(path.join(postsDirectory, `${alternativeSlug2}.md`))) {
      fullPath = path.join(postsDirectory, `${alternativeSlug2}.md`);
    } else if (fs.existsSync(path.join(postsDirectory, `${alternativeSlug3}.md`))) {
      fullPath = path.join(postsDirectory, `${alternativeSlug3}.md`);
    } else {
      throw new Error(`Post not found: ${slug}`);
    }
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const wordsPerMinute = 200;
  const cleanContent = content.replace(/[#*`\s]/g, '');
  const readingTime = Math.max(1, Math.ceil(cleanContent.length / wordsPerMinute));

  return {
    slug: cleanSlug,
    title: data.title || cleanSlug,
    date: data.date || new Date().toISOString().split('T')[0],
    description: data.description || '',
    tags: data.tags || [],
    category: data.category || '未分類',
    image: data.image !== undefined && data.image !== null ? data.image : undefined,
    published: data.published !== false,
    content,
    readingTime,
  };
}

/**
 * 獲取所有已發布的文章，並按日期排序
 */
export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return getPostData(slug);
    })
    .filter((post) => post.published);

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 將文章的 Markdown 內文序列化為 HTML
 */
export async function getSerializedPost(slug: string): Promise<SerializedPost> {
  const post = getPostData(slug);
  const htmlContent = marked.parse(post.content) as string;

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    tags: post.tags,
    category: post.category,
    image: post.image,
    published: post.published,
    readingTime: post.readingTime,
    mdxSource: {
      compiledSource: htmlContent,
      frontmatter: {},
      scope: {}
    },
  };
}

/* ==========================================================================
   分類與標籤相關工具函式
   ========================================================================== */

/**
 * 獲取所有文章中不重複的分類列表
 */
export function getAllCategories(): string[] {
  const posts = getSortedPostsData();
  const categories = posts.map((post) => post.category).filter(Boolean);
  return Array.from(new Set(categories));
}

/**
 * 根據分類名稱篩選文章列表（💡 已完美支援大小寫與 URL 解碼）
 */
export function getPostsByCategory(category: string): PostData[] {
  const posts = getSortedPostsData();
  const decodedCategory = decodeURIComponent(category).toLowerCase();
  return posts.filter((post) => post.category && post.category.toLowerCase() === decodedCategory);
}

/**
 * 獲取所有不重複的標籤純字串陣列列表
 */
export function getAllTags(): string[] {
  const posts = getSortedPostsData();
  const tagsSet = new Set<string>();
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet);
}

/**
 * 獲取標籤列表，並附帶數量
 */
export function getAllTagsWithCount(): { tag: string; text: string; value: number; count: number }[] {
  const posts = getSortedPostsData();
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  return Object.entries(tagCounts).map(([text, value]) => ({
    tag: text,
    text: text,
    value: value,
    count: value,
  }));
}

/**
 * 根據指定標籤篩選文章列表（💡 已完美支援大小寫與 URL 解碼）
 */
export function getPostsByTag(tag: string): PostData[] {
  const posts = getSortedPostsData();
  const decodedTag = decodeURIComponent(tag).toLowerCase();
  return posts.filter((post) => 
    post.tags && post.tags.some((t) => t.toLowerCase() === decodedTag)
  );
}