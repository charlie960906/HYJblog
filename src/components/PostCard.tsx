'use client';

'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
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
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(card, {
              opacity: [0, 1],
              translateY: [24, 0],
              scale: [0.98, 1],
              duration: 650,
              easing: 'easeOutCubic',
            });
            observerInstance.unobserve(card);
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handleHover = (entered: boolean) => {
    if (!cardRef.current) return;

    animate(cardRef.current, {
      translateY: entered ? -6 : 0,
      boxShadow: entered
        ? '0 28px 70px rgba(15, 23, 42, 0.12)'
        : '0 0 0 rgba(15, 23, 42, 0)',
      duration: 450,
      easing: 'easeOutElastic(1, .8)',
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="group transform opacity-0 translate-y-6 mb-8 pb-8 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
    >
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
