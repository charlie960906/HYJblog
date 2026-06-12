import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from './providers';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ThemeColorMeta from '@/components/ThemeColorMeta';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'HYJ blog',
    template: '%s | HYJ blog',
  },
  description: '分享技術、生活與學習心得的個人部落格',
  keywords: ['前端開發', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', '生活隨筆'],
  authors: [{ name: 'HYJ' }],
  creator: 'HYJ',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/api/rss',
      'application/atom+xml': '/api/atom',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 💡 修正：在此處加上 data-scroll-behavior="smooth" 消除換頁滾動警告
    <html lang="zh-TW" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <ThemeColorMeta />
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 antialiased transition-colors duration-300 flex flex-col`}>
        <Providers>
          {/* 頂部導航/選單 */}
          <MobileMenu />
          
          {/* 主要內容區 */}
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-7xl w-full">
            {children}
          </main>

          {/* 頁尾 */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}