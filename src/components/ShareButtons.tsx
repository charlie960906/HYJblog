'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/providers';

interface ShareProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareButtons({ title, url }: ShareProps) {
  const [copyMessage, setCopyMessage] = useState('');
  const { language } = useLanguage();
  const en = language === 'en';
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:text-blue-400',
    },
    {
      name: 'Facebook',
      icon: 'f',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-blue-600',
    },
    {
      name: 'LinkedIn',
      icon: 'in',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-blue-700',
    },
    {
      name: 'Copy Link',
      icon: '🔗',
      url: '#',
      color: 'hover:text-neutral-600 dark:hover:text-neutral-300',
      onClick: async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        try {
          await navigator.clipboard.writeText(url);
          setCopyMessage(en ? 'Link copied' : '已複製連結');
        } catch {
          setCopyMessage(en ? 'Unable to copy link' : '無法複製連結');
        }

        window.setTimeout(() => {
          setCopyMessage('');
        }, 2000);
      },
    },
  ];

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-neutral-500 dark:text-neutral-500">{en ? 'Share:' : '分享：'}</span>
        <div className="flex gap-2">
          {shareLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target={link.name === 'Copy Link' ? undefined : '_blank'}
              rel={link.name === 'Copy Link' ? undefined : 'noopener noreferrer'}
              onClick={link.onClick}
              title={link.name}
              className={`inline-block w-8 h-8 rounded-full flex items-center justify-center transition-smooth
                bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400
                ${link.color}`}
            >
              <span className="text-xs font-mono font-bold">{link.icon}</span>
            </a>
          ))}
        </div>
      </div>
      {copyMessage ? (
        <div className="text-sm text-neutral-700 dark:text-neutral-300" aria-live="polite">
          {copyMessage}
        </div>
      ) : null}
    </div>
  );
}
