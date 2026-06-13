import { getSortedPostsData, getPostData } from './posts';

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  score: number;
  snippet?: string;
}

export interface PaginatedSearchResults {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

let postsData: any[] | null = null;

function initializePostsData() {
  if (postsData) return;
  const posts = getSortedPostsData();
  postsData = posts.map(post => {
    const fullPost = getPostData(post.slug);
    return {
      slug: post.slug,
      title: post.title || '',
      description: post.description || '',
      content: fullPost.content || '',
    };
  });
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 核心中文權重搜尋
export function searchPosts(query: string): SearchResult[] {
  if (!query.trim()) return [];
  initializePostsData();
  
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  
  const results = postsData!.map(post => {
    let score = 0;
    const titleLower = post.title.toLowerCase();
    const descLower = post.description.toLowerCase();
    const contentLower = post.content.toLowerCase();

    tokens.forEach(token => {
      if (titleLower.includes(token)) score += 10;
      if (descLower.includes(token)) score += 5;
      if (contentLower.includes(token)) score += 1;
    });

    let snippet = '';
    if (score > 0) {
      let firstMatchIdx = -1;
      for (const t of tokens) {
        const idx = contentLower.indexOf(t);
        if (idx !== -1) {
          firstMatchIdx = idx;
          break;
        }
      }
      
      if (firstMatchIdx === -1) {
        snippet = post.content.substring(0, 160).replace(/\n+/g, ' ') + '...';
      } else {
        const start = Math.max(0, firstMatchIdx - 60);
        const end = Math.min(post.content.length, firstMatchIdx + 120);
        snippet = post.content.substring(start, end).replace(/\n+/g, ' ') + '...';
        
        tokens.forEach(t => {
          const re = new RegExp(`(${escapeRegExp(t)})`, 'gi');
          snippet = snippet.replace(re, '<mark style="background-color: rgba(250,204,21,0.28); padding:0 2px; border-radius:2px; color:inherit;">$1</mark>');
        });
      }
    }

    return {
      slug: post.slug,
      title: post.title,
      description: post.description,
      score,
      snippet
    };
  });

  return results.filter(p => p.score > 0).sort((a, b) => b.score - a.score);
}

// 供前端元件呼叫的分頁搜尋功能
export function searchPostsWithPagination(query: string, page: number = 1, limit: number = 10): PaginatedSearchResults {
  const allResults = searchPosts(query);
  const total = allResults.length;
  const totalPages = Math.ceil(total / limit);
  
  const currentPage = Math.max(1, page);
  const offset = (currentPage - 1) * limit;
  const paginatedResults = allResults.slice(offset, offset + limit);

  return {
    results: paginatedResults,
    total,
    page: currentPage,
    limit,
    totalPages
  };
}