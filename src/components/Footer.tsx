import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300 mt-8 sm:mt-16 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-mono text-neutral-500 dark:text-neutral-400 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Powered by HYJdevelop</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link href="/rss.xml" className="link-subtle">
              RSS
            </Link>
            <Link href="/atom.xml" className="link-subtle">
              Atom
            </Link>
            <a href="https://github.com/charlie960906/HYJblog" target="_blank" rel="noreferrer" className="link-subtle">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}