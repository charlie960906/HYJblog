// src/app/blog/page.tsx
import React from 'react';
import { getSortedPostsData, getAllCategories } from '@/lib/posts';
import BlogArchiveClient from './client';

export const dynamic = 'force-static';

export default function BlogPage() {
  const allPosts = getSortedPostsData();
  const categoriesObj = getAllCategories();

  // 將 {[key: string]: number} 物件字典轉化為字串陣列 string[]
  const categories = Object.keys(categoriesObj);

  return <BlogArchiveClient allPosts={allPosts} categories={categories} />;
}