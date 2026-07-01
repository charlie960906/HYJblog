/**
 * Shared types and utilities (can be used in both server and client)
 */

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  content: string;
  readingTime: number;
  category?: string;
  image?: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  readingTime: number;
  category?: string;
  image?: string;
}

/**
 * Format date to readable zh-TW format (e.g., "2025年1月15日")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}
