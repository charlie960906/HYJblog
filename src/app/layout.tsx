import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ThemeColorMeta from "@/components/ThemeColorMeta";
import AnimePageWrapper from "@/components/AnimePageWrapper"; // 💡 引入全域動畫包裹元件

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s - HYJBLOG',
    default: 'HYJBLOG - 技術與生活隨筆',
  },
  description: "分享 C++、前端開發、資料結構與演算法，以及生活隨筆的個人部落格。",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/icon.jpg",
    apple: "/images/icon.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
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
      <head>
        <GoogleAnalytics />
        <ThemeColorMeta />
      </head>
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen flex flex-col antialiased transition-colors duration-300`}>
        <Providers>
          <Menu />
          {/* 💡 使用 AnimePageWrapper 包裹全站的頁面內容 */}
          <AnimePageWrapper>
            {children}
          </AnimePageWrapper>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}