// src/app/folder/page.tsx
import React from 'react';
import { getSortedPostsData, getAllCategories } from '@/lib/posts';
import FolderClient from './client';

export const dynamic = 'force-static';

export default function FolderPage() {
  const allPosts = getSortedPostsData();
  const categoriesObj = getAllCategories();

  // 關鍵修正：將 {[key: string]: number} 物件字典轉化為字串陣列 string[]
  // 這樣就能完美符合 FolderClient 預期的 categories 類型
  const categories = Object.keys(categoriesObj);

  return <FolderClient allPosts={allPosts} categories={categories} />;
}