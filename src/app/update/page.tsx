import type { ReactNode } from 'react';
import UpdateClient from './UpdateClient';

const updates: {
  datetime: string;
  title: string;
  content: ReactNode;
}[] = [
    {
    datetime: '2026-09-18 22:41',
    title: '完善markdawn解析的内容，增加了程式高亮和複製按鈕',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>字體大小正確顯示</li>
        <li>增加程式碼高亮功能</li>
        <li>新增程式碼複製按鈕</li>
      </ul>
    ),
  },
  {
    datetime: '2026-09-17 10:56',
    title: '優化網站 優化無障礙功能，改善使用者體驗，提升網站效能與可訪問性',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>優化網站的無障礙功能，改善使用者體驗</li>
        <li>提升網站效能與可訪問性，讓更多人能夠順利使用網站</li>
        <li>改善網站的整體設計與互動性</li>
      </ul>
    ),
  },
  {
    datetime: '2026-09-17 10:12',
    title: '將圖片從.jpg轉為.webp格式，以此減少網站流量與加快載入速度',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>將網站內的圖片從.jpg格式轉為.webp格式</li>
        <li>減少網站流量，提升載入速度</li>
        <li>改善使用者體驗，讓網站更快更流暢</li>
      </ul>
    ),
  },
  {
    datetime: '2026-09-13 22:03',
    title: '完成8月Review文章與更新網站內容',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>完成8月Review文章</li>
        <li>更新網站內容與功能</li>
        <li>修正程式碼警告</li>
      </ul>
    ),
  },
  {
    datetime: '2026-08-22 09:53',
    title: 'MENU排版更新、頁尾整理與個人About頁面新增',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>MENU排版更新 把Home Folder Tags 改到左邊，右邊search剩Icon並增加GITHUB連結跟加上外框</li>
        <li>頁尾加上連結，統計數據</li>
        <li>新增個人About頁面，介紹個人頁面</li>
      </ul>
    ),
  },
  {
    datetime: '2026-08-22 09:53',
    title: '寵物系統優化、目錄元件更新與程式碼警告修正',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>寵物現在會跟著視窗移動，不會跑出視窗外</li>
        <li>目錄現在會跟著視窗移動，尬這個找了一段時間才修好，才發現有其他地放把它黏住了</li>
        <li>修正程式碼警告</li>
      </ul>
    ),
  },
  {
    datetime: '2026-08-22 09:18',
    title: '網頁程式碼警告和網站寵物按鈕遮蓋問題修正',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>修正網頁程式碼警告</li>
        <li>修正網站寵物按鈕遮蓋問題</li>
      </ul>
    ),
  },
  {
    datetime: '2026-08-06 22:34',
    title: '網站內容與頁面功能更新',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>更新文章頁面的閱讀與導覽體驗</li>
        <li>調整分類抽屜、特色文章與目錄元件</li>
        <li>重新產生 RSS 與 Atom 訂閱內容</li>
      </ul>
    ),
  },
  {
    datetime: '2026-08-05 22:18',
    title: '新增文章與草稿內容',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>新增 Blockchain Dictionary 文章</li>
        <li>新增 Pixiuscam 與電動重型設備相關內容</li>
        <li>補充文章資料，讓部落格內容更完整</li>
      </ul>
    ),
  },
  {
    datetime: '2026-07-24 21:46',
    title: '修正分享功能',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>修正文章分享按鈕的行為</li>
        <li>調整分享元件的資料處理方式</li>
        <li>同步補充電動重型設備文章內容</li>
      </ul>
    ),
  },
  {
    datetime: '2026-07-23 07:56',
    title: '修正文章文字',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>修正 2026 年 7 月 22 日文章中的文字錯誤</li>
      </ul>
    ),
  },
  {
    datetime: '2026-07-22 22:35',
    title: '重新產生訂閱摘要',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>重新產生 RSS 與 Atom 訂閱檔案</li>
        <li>更新 Giscus 評論元件的 API 使用方式</li>
        <li>支援評論區塊跟隨深色模式切換</li>
      </ul>
    ),
  },
  {
    datetime: '2026-07-22 20:35',
    title: '補充生活文章與媒體',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>更新 2026 年 7 月 22 日的生活紀錄</li>
        <li>新增照片與影片素材</li>
        <li>補充文章中的心得與日常內容</li>
      </ul>
    ),
  },
  {
    datetime: '2026-07-21 15:10',
    title: 'Pets 系統與螢幕適配更新',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>更新 Pets 系統 Beta 2.0</li>
        <li>改善桌面與行動裝置的畫面適配</li>
        <li>調整寵物互動、首頁與分類頁面的呈現</li>
      </ul>
    ),
  },
  {
    datetime: '2026-07-19 21:13',
    title: '新增 ZeroJudge 與文章圖片',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>更新 ZeroJudge 題目的圖片資源</li>
        <li>補充 C++ 文章與相關圖片</li>
        <li>同步更新 RSS 與 Atom 訂閱內容</li>
      </ul>
    ),
  },
  {
    datetime: '2026-06-24 22:44',
    title: '加入 PWA 與頁面動畫',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>加入 PWA manifest，支援將網站安裝至裝置</li>
        <li>優化頁面轉場與標籤雲呈現</li>
        <li>改善首頁 Hero 區塊的畫面適配</li>
      </ul>
    ),
  },
  {
    datetime: '2026-06-23 21:36',
    title: '修正訂閱、連結網址及LICENSE',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>修正 RSS、Atom 與 sitemap 使用的網站網址</li>
        <li>更新訂閱摘要內容與版權資訊</li>
        <li>改善分類與標籤的中文關鍵字處理</li>
        <li>更新 LICENSE 檔案內容</li>
      </ul>
    ),
  },
  {
    datetime: '2026-06-23 14:18',
    title: 'category,tag chinese keyword search error fixed',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>修正分類與標籤的中文關鍵字搜尋錯誤</li>
        <li>瘋狂優化優化找蟲蟲</li>
      </ul>
    ),
  },
  {
    datetime: '2026-06-17 20:22',
    title: '6月Review文章更新',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>上架新文章</li>
        <li>這個月很棒很棒 :)</li>
      </ul>
    ),
  },
  {
    datetime: '2026-06-16 21:33',
    title: '螢幕安全退縮',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>首頁兩邊安全退縮避免被擋住</li>
        <li>文章內部兩邊安全退縮</li>
      </ul>
    ),
  },
  {
    datetime: '2026-06-14 21:35',
    title: '搜尋文章系統優化',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>搜尋文章系統Bug排除</li>
        <li>優化搜尋結果的呈現</li>
      </ul>
    ),
  },
  {
    datetime: '2026-06-12 22:44',
    title: '舊文章轉移',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>將舊文章從原網站轉移至新網站</li>
      </ul>
    ),
  },
  {
    datetime: '2026-06-12 22:12',
    title: '修正網站網址',

    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>更新domain為 hyjblog.hyjdevelop.com</li>
      </ul>
    ),
  }, 
  {
    datetime: '2026-06-12 19:57',
    title: '這一世的網站太醜了，下一世我要成為更美的網站',
    content: (
      <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>網站基本架構</li>
        <li>.md檔案讀取功能</li>
        <li>基本的頁面導航</li>
      </ul>
    ),
  },
];

export const metadata = {
  title: '更新紀錄',
  description: '這裡列出網站最新更新內容。',
};

export default function UpdatePage() {
  return <UpdateClient updates={updates} />;
}
