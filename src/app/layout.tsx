import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from './providers';
import Menu from '@/components/Menu';
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
    default: 'HYJBLOG',
    template: '%s | HYJBLOG',
  },
  description: '分享技術、生活與學習心得的個人部落格',
  icons: {
    icon: '/images/icon.jpg',
    apple: '/images/icon.jpg',
  },
  keywords: ['前端開發', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', '生活隨筆'],
  authors: [{ name: 'HYJ' }],
  creator: 'HYJ',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hyjblog.hyjdevelop.com'),
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
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <ThemeColorMeta />
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300`}>
        <Providers>
          <Menu /> 
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}