import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/common';

const postsDirectory = path.join(process.cwd(), 'public/post');
let sortedPostsCache: PostData[] | undefined;

function getOptimizedImagePath(imagePath: string | undefined) {
  if (!imagePath || !imagePath.startsWith('/images/') || /\.(svg|gif|webp|avif)$/i.test(imagePath)) {
    return imagePath;
  }

  const extensionlessPath = imagePath.replace(/\.[^.]+$/, '');
  const optimizedPath = path.join(process.cwd(), 'public', `${extensionlessPath.slice(1)}.webp`);
  return fs.existsSync(optimizedPath) ? `${extensionlessPath}.webp` : imagePath;
}

const markdownRenderer = new marked.Renderer();
markdownRenderer.code = ({ text, lang }) => {
  const language = lang?.trim().toLowerCase();
  const highlighted = language && hljs.getLanguage(language)
    ? hljs.highlight(text, { language }).value
    : hljs.highlightAuto(text).value;
  const languageClass = language && hljs.getLanguage(language) ? ` language-${language}` : '';

  return `<div class="code-block"><button type="button" class="code-copy-button" data-code-copy aria-label="複製程式碼">複製</button><pre><code class="hljs${languageClass}">${highlighted}</code></pre></div>`;
};
markdownRenderer.image = ({ href, title, text }) => {
  const titleAttribute = title ? ` title="${escapeHtml(title)}"` : '';
  const optimizedHref = getOptimizedImagePath(href) ?? href;
  return `<img src="${escapeHtml(optimizedHref)}" alt="${escapeHtml(text)}"${titleAttribute} loading="lazy" decoding="async" fetchpriority="low" />`;
};

marked.use({ renderer: markdownRenderer });

function replaceSpoilersOutsideCode(content: string, onSpoiler: (innerContent: string) => string) {
  const lines = content.split('\n');
  let fenceCharacter: string | null = null;

  return lines.map((line) => {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      const currentFenceCharacter = fenceMatch[1][0];
      if (fenceCharacter === currentFenceCharacter) {
        fenceCharacter = null;
      } else if (!fenceCharacter) {
        fenceCharacter = currentFenceCharacter;
      }
      return line;
    }

    if (fenceCharacter) return line;
    return line.replace(/\|\|([\s\S]+?)\|\|/g, (_, innerContent: string) => onSpoiler(innerContent));
  }).join('\n');
}

export function renderMarkdown(content: string) {
  const spoilers: string[] = [];
  const contentWithPlaceholders = replaceSpoilersOutsideCode(content, (innerContent) => {
    const spoilerIndex = spoilers.push(
      marked.parseInline(innerContent, {
        renderer: markdownRenderer,
        gfm: true,
        breaks: true,
      }) as string,
    ) - 1;
    return `MD_SPOILER_PLACEHOLDER_${spoilerIndex}`;
  });

  const renderedHtml = marked.parse(contentWithPlaceholders, {
    renderer: markdownRenderer,
    gfm: true,
    breaks: true,
  }) as string;

  return renderedHtml.replace(/MD_SPOILER_PLACEHOLDER_(\d+)/g, (_, index: string) => (
    `<button type="button" class="spoiler" data-spoiler aria-expanded="false" aria-label="顯示隱藏內容"><span class="spoiler-content">${spoilers[Number(index)]}</span><span class="sr-only">點擊顯示隱藏內容</span></button>`
  ));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function optimizeMediaLoading(html: string) {
  // Articles can contain many large clips. Defer every video request until the
  // reader chooses to play it instead of requesting metadata for all clips on load.
  return html.replace(/<video(?![^>]*\bpreload=)([^>]*)>/gi, '<video preload="none"$1>');
}

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
  update?: string;
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
    image: getOptimizedImagePath(data.image !== undefined && data.image !== null ? data.image : undefined),
    published: data.published !== false,
    content,
    readingTime,
    update: typeof data.update === 'string' ? data.update : data.update ? String(data.update) : undefined,
  };
}

/**
 * 獲取所有已發布的文章，並按日期排序
 */
export function getSortedPostsData(): PostData[] {
  if (sortedPostsCache) {
    return [...sortedPostsCache];
  }

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

  sortedPostsCache = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  return [...sortedPostsCache];
}

/**
 * 將文章的 Markdown 內文序列化為 HTML
 */
export async function getSerializedPost(slug: string): Promise<SerializedPost> {
  const post = getPostData(slug);
  const htmlContent = optimizeMediaLoading(
    renderMarkdown(post.content),
  );

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
    update: post.update,
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
