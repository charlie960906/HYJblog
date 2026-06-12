import Link from 'next/link';
import { formatDate } from '@/lib/types';
import ReadingTime from './ReadingTime';
import TagPill from './TagPill';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime?: number;
}

export default function PostCard({
  slug,
  title,
  date,
  description,
  tags,
  readingTime,
}: PostCardProps) {
  return (
    <article className="group animate-list-item interactive-lift mb-8 pb-8 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0">
      <div className="mb-2 flex items-center gap-3 flex-wrap">
        <time className="font-mono text-sm text-neutral-500 dark:text-neutral-500">
          {formatDate(date)}
        </time>
        {readingTime && <ReadingTime minutes={readingTime} />}
      </div>
      
      <h2 className="mb-2">
        <Link
          href={`/blog/${slug}`}
          className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 link-subtle hover:text-neutral-600 dark:hover:text-neutral-300"
        >
          {title}
        </Link>
      </h2>

      <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
        {description}
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
