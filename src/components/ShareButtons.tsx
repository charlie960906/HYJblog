'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/providers';
import { FaFacebookF, FaLink, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

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
      icon: FaXTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:text-blue-400',
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-blue-600',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-blue-700',
    },
    {
      name: 'Copy Link',
      icon: FaLink,
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
              className={`inline-flex w-8 h-8 rounded-full items-center justify-center transition-smooth
                bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400
                ${link.color}`}
            >
              <link.icon className="h-3.5 w-3.5" aria-hidden="true" />
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
