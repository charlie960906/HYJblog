import type { Metadata } from 'next';
import Link from 'next/link';
import { Providers } from './providers';
import SearchBar from '@/components/SearchBar';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ThemeToggle from '../components/ThemeToggle';
import MobileMenu from '@/components/MobileMenu';
import ThemeColorMeta from '@/components/ThemeColorMeta';
import '@/styles/globals.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BLOG.HYJ',
  description: '使用 Next.js 和 Markdown 打造的極簡風格個人寫作空間',
  keywords: ['部落格', '寫作', 'Next.js', 'TypeScript', 'Markdown'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/api/rss" />
        <link rel="alternate" type="application/atom+xml" title="Atom Feed" href="/api/atom" />
      </head>
      <body>
        <Providers>
          <ThemeColorMeta />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          <div className="flex flex-col min-h-screen min-h-[100dvh]">
            <header className="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-cream-50/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md transition-colors duration-300">
              <nav className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <Link
                      href="/"
                      className="font-mono font-bold text-lg sm:text-xl transition-smooth hover:text-neutral-600 dark:hover:text-neutral-400 shrink-0"
                    >
                      BLOG.HYJ
                    </Link>

                    <div className="hidden sm:flex items-center gap-5">
                      <Link
                        href="/"
                        className="nav-link font-mono text-sm"
                      >
                        home
                      </Link>
                      <Link
                        href="/folder"
                        className="nav-link font-mono text-sm"
                      >
                        folder
                      </Link>
                      <Link
                        href="/tags"
                        className="nav-link font-mono text-sm"
                      >
                        tags
                      </Link>
                      {/* search text link removed — use magnifying glass button */}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                    <div className="hidden sm:block">
                      <SearchBar mode="desktop-popover" />
                    </div>

                    <ThemeToggle />

                    <MobileMenu />
                  </div>
                </div>
              </nav>
            </header>

            <main className="animate-page-in flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              {children}
            </main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
