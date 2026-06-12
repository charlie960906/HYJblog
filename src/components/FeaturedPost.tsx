import Link from 'next/link';
import { formatDate } from '@/lib/types';
import ReadingTime from './ReadingTime';
import TagPill from './TagPill';
import Image from 'next/image';

interface FeaturedPostProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
  readingTime?: number;
}

export default function FeaturedPost({
  slug,
  title,
  date,
  description,
  tags,
  image,
  readingTime,
}: FeaturedPostProps) {
  return (
    <article className="group animate-list-item overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 transition-all hover:border-neutral-400 dark:hover:border-neutral-600">
      <Link href={`/blog/${slug}`} className="flex flex-col md:flex-row h-full gap-6 p-6 md:p-8">
        {/* Image Section */}
        {image && (
          <div className="relative w-full md:w-64 h-64 md:h-auto flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 256px"
              priority
            />
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Featured Badge */}
            <div className="mb-3 inline-block">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                焦點推薦
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-3">
              <span className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 link-subtle group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                {title}
              </span>
            </h2>

            {/* Description */}
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed text-base line-clamp-3">
              {description}
            </p>
          </div>

          {/* Metadata Footer */}
          <div className="space-y-3">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm">
              <time className="font-mono text-neutral-500 dark:text-neutral-500">
                {formatDate(date)}
              </time>
              {readingTime && <ReadingTime minutes={readingTime} />}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
