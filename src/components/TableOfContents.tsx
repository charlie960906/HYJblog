interface Heading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  variant?: 'sidebar' | 'mobile';
}

export default function TableOfContents({ headings, variant = 'sidebar' }: TableOfContentsProps) {
  if (headings.length === 0) {
    if (variant === 'mobile') return null;

    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        本文尚無二級或三級標題。
      </p>
    );
  }

  const nav = (
    <nav className="space-y-2 sm:space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      {headings.map(heading => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={`block py-0.5 transition-colors duration-200
                      hover:text-neutral-900 dark:hover:text-neutral-100
                      ${heading.level === 3 ? 'ml-3 sm:ml-4 text-neutral-600 dark:text-neutral-400' : ''}`}
        >
          {heading.title}
        </a>
      ))}
    </nav>
  );

  if (variant === 'mobile') {
    return (
      <details className="lg:hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/90 overflow-hidden">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-600 dark:text-neutral-400 list-none flex items-center justify-between">
          <span>目錄</span>
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">{headings.length} 項</span>
        </summary>
        <div className="px-4 pb-4 border-t border-neutral-200 dark:border-neutral-800 pt-3">
          {nav}
        </div>
      </details>
    );
  }

  return (
    <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/90 p-6 shadow-sm backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
        目錄
      </p>
      {nav}
    </div>
  );
}
