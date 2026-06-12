import React from 'react';
import Link from 'next/link';

interface CloudTagProps {
  tag: string;
  count?: number;
  maxCount?: number;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return h;
}

export default function CloudTag({ tag, count = 1, maxCount = 1, href, className = '', style = {} }: CloudTagProps) {
  const colors = ['text-sky-700', 'text-emerald-600', 'text-rose-700', 'text-amber-600', 'text-violet-700', 'text-green-600', 'text-indigo-700'];
  const h = Math.abs(hashString(tag));
  const color = colors[h % colors.length];
  const rotate = (h % 21) - 10; // -10..10 deg

  const size = typeof style.fontSize === 'string' ? style.fontSize : `${12 + (count / Math.max(1, maxCount)) * 12}px`;

  const content = (
    <span
      className={`inline-block font-serif font-semibold ${color} ${className}`}
      style={{ ...style, fontSize: size, transform: `${style.transform ?? ''} rotate(${rotate}deg)` }}
    >
      {tag}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="transition-transform hover:scale-105">
        {content}
      </Link>
    );
  }

  return content;
}
