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
 * Format date to readable format (e.g., "Jan 15, 2025")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}, ${year}`;
  } catch {
    return dateString;
  }
}
