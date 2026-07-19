import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://hyjblog.hyjdevelop.com'),
  title: {
    template: '%s - HYJBLOG',
    default: 'HYJBLOG - 技術與生活隨筆',
  },
  description: '分享 C++、前端開發、資料結構與演算法，以及生活隨筆的個人部落格。',
  manifest: '/manifest.json',
  icons: {
    icon: '/images/icon.jpg',
    apple: '/images/icon.jpg',
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
      'application/atom+xml': '/atom.xml',
    },
  },
  openGraph: {
    title: 'HYJBLOG',
    description: '分享 C++、前端開發、資料結構與演算法，以及生活隨筆的個人部落格。',
    type: 'website',
    url: 'https://hyjblog.hyjdevelop.com',
    siteName: 'HYJBLOG',
    images: [
      {
        url: '/images/icon.jpg',
        width: 1200,
        height: 630,
        alt: 'HYJBLOG - 技術與生活隨筆',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HYJBLOG',
    description: '分享 C++、前端開發、資料結構與演算法，以及生活隨筆的個人部落格。',
    images: ['/images/icon.jpg'],
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${inter.className} animate-page-in bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen flex flex-col antialiased transition-colors duration-300`}>
        <Providers>
          <Menu />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}