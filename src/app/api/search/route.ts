import { searchPosts, searchPostsWithPagination } from '@/lib/search';

export const dynamic = 'force-static';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  const pageParam = searchParams.get('page');
  const pageSizeParam = searchParams.get('pageSize');

  if (!query.trim()) {
    // 當沒有 query 時，保持相容性：回傳空陣列
    return Response.json([]);
  }

  if (pageParam) {
    const page = parseInt(pageParam, 10) || 1;
    const pageSize = parseInt(pageSizeParam || '10', 10) || 10;
    const { results, total } = searchPostsWithPagination(query, page, pageSize);
    return Response.json({ results, total });
  }

  // 無分頁參數時，維持舊行為回傳陣列
  const results = searchPosts(query);
  return Response.json(results);
}
