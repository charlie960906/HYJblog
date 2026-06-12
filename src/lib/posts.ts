import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMetadata, formatDate } from './types';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

export { formatDate };

const postsDirectory = path.join(process.cwd(), 'public', 'post');

/**
 * 計算閱讀時間（平均每分鐘 200 字）
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Get all published posts sorted by date (newest first)
 */
export function getSortedPostsData(): PostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        description: data.description || '',
        tags: data.tags || [],
        published: data.published !== false,
        readingTime: calculateReadingTime(content),
        category: data.category || 'general',
        image: data.image,
      };
    })
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPostsData;
}

/**
 * Get a specific post by slug
 */
export function getPostData(slug: string): Post {
  const fileName = `${slug}.md`;
  const filePath = path.join(postsDirectory, fileName);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    published: data.published !== false,
    content,
    readingTime: calculateReadingTime(content),
    category: data.category || 'general',
    image: data.image,
  };
}

/**
 * Get all available post slugs (for static generation)
 */
export function getAllPostSlugs(): string[] {
  return getSortedPostsData().map(post => post.slug);
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  const posts = getSortedPostsData();
  const categories = new Set(posts.map(post => post.category || 'general'));
  return Array.from(categories).sort();
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): PostMetadata[] {
  return getSortedPostsData().filter(post => (post.category || 'general') === category);
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const allPosts = getSortedPostsData();
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

export interface TagWithCount {
  tag: string;
  count: number;
}

export function getAllTagsWithCount(): TagWithCount[] {
  const allPosts = getSortedPostsData();
  const tagCounts = new Map<string, number>();

  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.tag.localeCompare(b.tag, 'zh-Hant', { numeric: true, sensitivity: 'base' });
    });
}

/**
 * Get serialized MDX for a specific post (for rendering in App Router server components)
 */
export async function getSerializedPost(slug: string): Promise<Post & { mdxSource: any }> {
  const fileName = `${slug}.md`;
  const filePath = path.join(postsDirectory, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
    parseFrontmatter: false,
  });

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    published: data.published !== false,
    content,
    readingTime: calculateReadingTime(content),
    category: data.category || 'general',
    image: data.image,
    mdxSource,
  };
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): PostMetadata[] {
  return getSortedPostsData().filter(post => post.tags.includes(tag));
}
