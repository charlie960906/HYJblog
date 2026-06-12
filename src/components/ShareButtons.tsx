'use client';

interface ShareProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareButtons({ title, url, description }: ShareProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = encodeURIComponent(description || title);

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
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(url);
          alert('連結已複製到剪貼簿！');
        } catch {
          alert('無法複製連結');
        }
      },
    },
  ];

  return (
    <div className="flex items-center gap-3 py-4">
      <span className="font-mono text-sm text-neutral-500 dark:text-neutral-500">分享：</span>
      <div className="flex gap-2">
        {shareLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
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
  );
}
