import React from 'react';
import SearchPageClient from '@/components/SearchPageClient';
import { getSortedPostsData, getPostData } from '@/lib/posts';

// 強制將此頁面編譯為靜態 HTML (完美相容於 output: "export")
export const dynamic = 'force-static';

export default function SearchPage() {
  // 在打包編譯（Build）時，於伺服器端讀取所有文章內容
  const posts = getSortedPostsData();
  const searchIndex = posts.map((post) => {
    const postData = getPostData(post.slug);
    return {
      slug: post.slug,
      title: post.title,
      description: post.description || '',
      // 擷取前 300 個字進行全文搜尋，大幅縮減靜態打包的資料量
      content: (postData.content || '').substring(0, 300).toLowerCase(),
    };
  });

  // 直接把打包好的靜態索引傳給前端組件，不進行任何執行期 API 請求
  return <SearchPageClient initialPosts={searchIndex} />;
}