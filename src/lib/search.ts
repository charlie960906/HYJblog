import lunr from 'lunr';
import { getSortedPostsData, getPostData } from './posts';

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  score: number;
  snippet?: string;
}

let searchIndex: lunr.Index | null = null;
let postsData: any[] | null = null;

/**
 * 初始化搜索索引
 */
function initializeSearchIndex() {
  if (searchIndex && postsData) {
    return;
  }

  const posts = getSortedPostsData();
  
  postsData = posts.map(post => {
    const fullPost = getPostData(post.slug);
    return {
      slug: post.slug,
      title: post.title,
      description: post.description,
      content: fullPost.content,
    };
  });

  searchIndex = lunr(function () {
    this.ref('slug');
    this.field('title', { boost: 10 });
    this.field('description', { boost: 5 });
    this.field('content');

    postsData?.forEach((doc) => {
      this.add(doc);
    });
  });
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function makeSnippet(content: string, tokens: string[]) {
  if (!content || tokens.length === 0) return '';
  const lower = content.toLowerCase();
  let idx = -1;
  let matched = '';

  for (const t of tokens) {
    const i = lower.indexOf(t.toLowerCase());
    if (i >= 0) {
      idx = i;
      matched = t;
      break;
    }
  }

  if (idx < 0) {
    // no token found, return start of content truncated
    const startSnippet = content.slice(0, 160).replace(/\n+/g, ' ');
    return startSnippet.length < content.length ? startSnippet + '...' : startSnippet;
  }

  const start = Math.max(0, idx - 60);
  const end = Math.min(content.length, idx + 120);
  let snippet = content.slice(start, end).replace(/\n+/g, ' ');

  // highlight tokens (case-insensitive) using <mark> with subtle background
  tokens.forEach((t) => {
    const re = new RegExp(`(${escapeRegExp(t)})`, 'gi');
    snippet = snippet.replace(re, '<mark style="background-color: rgba(250,204,21,0.28); padding:0 0.125rem; border-radius:0.125rem;">$1</mark>');
  });

  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';

  return snippet;
}

/**
 * 搜索文章
 */
export function searchPosts(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  initializeSearchIndex();

  if (!searchIndex || !postsData) {
    return [];
  }

  const tokens = query.trim().split(/\s+/).filter(Boolean);

  try {
    // 使用 query builder 以明確控制各欄位權重：title > description > content

    const results = searchIndex.query(function (q) {
      tokens.forEach((token) => {
        // 精準與通配符匹配（加強權重）
        q.term(token, { fields: ['title'], boost: 100, wildcard: lunr.Query.wildcard.TRAILING });
        q.term(token, { fields: ['description'], boost: 50, wildcard: lunr.Query.wildcard.TRAILING });
        q.term(token, { fields: ['content'], boost: 10, wildcard: lunr.Query.wildcard.TRAILING });

        // 容錯（edit distance = 1）以支援少量拼字錯誤
        q.term(token, { fields: ['title'], boost: 80, editDistance: 1 });
        q.term(token, { fields: ['description'], boost: 40, editDistance: 1 });
        q.term(token, { fields: ['content'], boost: 5, editDistance: 1 });
      });
    });

    const mapped = results.map((result) => {
      const post = postsData?.find((p) => p.slug === result.ref);
      const snippet = makeSnippet(post?.content || '', tokens);
      return {
        slug: result.ref,
        title: post?.title || '',
        description: post?.description || '',
        score: result.score,
        snippet,
      } as SearchResult;
    });

    // 回傳依 score 排序的前 10 個結果
    return mapped.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 10);
  } catch (error) {
    // 如果通配符搜索失敗，嘗試不使用通配符
    try {
      const results = searchIndex.search(query);
      const mapped = results.map((result) => {
        const post = postsData?.find((p) => p.slug === result.ref);
        const snippet = makeSnippet(post?.content || '', tokens);
        return {
          slug: result.ref,
          title: post?.title || '',
          description: post?.description || '',
          score: result.score,
          snippet,
        } as SearchResult;
      });

      return mapped.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 10);
    } catch {
      return [];
    }
  }
}

/**
 * 支援分頁的搜尋：回傳結果與總數
 */
export function searchPostsWithPagination(query: string, page = 1, pageSize = 10): { results: SearchResult[]; total: number } {
  if (!query.trim()) {
    return { results: [], total: 0 };
  }

  initializeSearchIndex();

  if (!searchIndex || !postsData) {
    return { results: [], total: 0 };
  }

  try {
    const tokens = query.trim().split(/\s+/).filter(Boolean);

    const results = searchIndex.query(function (q) {
      tokens.forEach((token) => {
        q.term(token, { fields: ['title'], boost: 100, wildcard: lunr.Query.wildcard.TRAILING });
        q.term(token, { fields: ['description'], boost: 50, wildcard: lunr.Query.wildcard.TRAILING });
        q.term(token, { fields: ['content'], boost: 10, wildcard: lunr.Query.wildcard.TRAILING });

        q.term(token, { fields: ['title'], boost: 80, editDistance: 1 });
        q.term(token, { fields: ['description'], boost: 40, editDistance: 1 });
        q.term(token, { fields: ['content'], boost: 5, editDistance: 1 });
      });
    });

    const mapped = results.map((result) => {
      const post = postsData?.find((p) => p.slug === result.ref);
      return {
        slug: result.ref,
        title: post?.title || '',
        description: post?.description || '',
        score: result.score,
      } as SearchResult;
    });

    const total = mapped.length;
    const start = (page - 1) * pageSize;
    const paged = mapped.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(start, start + pageSize);

    return { results: paged, total };
  } catch (error) {
    try {
      const results = searchIndex.search(query);
      const mapped = results.map((result) => {
        const post = postsData?.find((p) => p.slug === result.ref);
        return {
          slug: result.ref,
          title: post?.title || '',
          description: post?.description || '',
          score: result.score,
        } as SearchResult;
      });

      const total = mapped.length;
      const start = (page - 1) * pageSize;
      const paged = mapped.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(start, start + pageSize);

      return { results: paged, total };
    } catch {
      return { results: [], total: 0 };
    }
  }
}

/**
 * 清除搜索索引（在開發期間用於刷新）
 */
export function clearSearchIndex() {
  searchIndex = null;
  postsData = null;
}
