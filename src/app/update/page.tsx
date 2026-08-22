import type { ReactNode } from 'react';

const updates: {
  datetime: string;
  title: string;
  content: ReactNode;
}[] = [
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
  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-x-hidden">
      <div className="mx-auto max-w-6xl w-full space-y-8">
        <section className="space-y-4">
          <div className="max-w-3xl">
            <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400">更新紀錄</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100">
             老黃修修補補打造了這個部落格
            </h1>
          </div>
        </section>

        <section className="grid gap-6 grid-cols-1">
          {updates.map((update) => (
            <article
              key={update.datetime + update.title}
              className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex min-h-36 flex-col gap-3">
                <div>
                  <h2 className="mt-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {update.title}
                  </h2>
                </div>

                <div>{update.content}</div>
                <p className="mt-auto self-end text-xs uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
                  {update.datetime}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
