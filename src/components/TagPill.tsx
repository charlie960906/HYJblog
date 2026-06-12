import React from 'react';

interface TagPillProps {
  tag: string;
  small?: boolean;
  /** optional numeric count to display after the tag */
  count?: number;
  /** case transform: 'lower' | 'upper' | 'capitalize' | 'none' */
  caseStyle?: 'lower' | 'upper' | 'capitalize' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export default function TagPill({ tag, small = false, count, caseStyle = 'none', className = '', style }: TagPillProps) {
  const size = small ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1';

  // If tag includes a trailing ` (num)`, extract it when count not provided
  let name = tag;
  if (count === undefined) {
    const m = tag.match(/^(.*)\s*\((\d+)\)\s*$/);
    if (m && m[1] && m[2]) {
      name = m[1];
      count = parseInt(m[2], 10);
    }
  }

  // apply case transform
  if (caseStyle === 'lower') name = name.toLowerCase();
  else if (caseStyle === 'upper') name = name.toUpperCase();
  else if (caseStyle === 'capitalize') name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center justify-center align-middle font-mono rounded ${size} bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 ${className}`}
      style={style}
    >
      <span>#{name}</span>
      {typeof count === 'number' && (
        <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">· {count}</span>
      )}
    </span>
  );
}
