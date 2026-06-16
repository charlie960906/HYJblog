import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
// 修正處：改用具名引入 { Providers }
import { Providers } from "./providers"; 
import ThemeColorMeta from "@/components/ThemeColorMeta";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HYJBLOG",
  description: "HYJdevelop 的個人部落格 - 分享技術心得與生活點滴",
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
      'application/atom+xml': '/atom.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <ThemeColorMeta />
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#fcfaf7] text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300 antialiased selection:bg-neutral-200 dark:selection:bg-neutral-800`}>
        <Providers>
          <Menu />
          {/* 修改處：為 main 加上 max-w-7xl (最大寬度 1280px)、mx-auto (水平置中) 與 px (左右內邊距避免貼邊) */}
          <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}