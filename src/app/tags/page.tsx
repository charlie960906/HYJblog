import { getAllTagsWithCount } from '@/lib/posts';
import TagCloudD3 from '@/components/TagCloudD3';

export const metadata = {
  title: '標籤雲 - HYJBLOG',
  description: '按標籤瀏覽文章',
};

export default function TagsPage() {
  const tags = getAllTagsWithCount();

  if (tags.length === 0) {
    return (
      /* 💡 修正處：無標籤畫面同步對齊首頁與詳情頁 */
      <main className="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl w-full">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              標籤雲
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">共有 0 個標籤</p>
          </div>
          <p className="text-center text-neutral-600 dark:text-neutral-400 py-12">還沒有標籤</p>
        </div>
      </main>
    );
  }

  return (
    /* 💡 關鍵修改：
       1. 改用 <main> 配合 pt-24 md:pt-28 頂出安全區，不被 Menu 遮擋
       2. 加上 px-4 sm:px-6 lg:px-8 確保左右縮排不論在手機或桌機都跟首頁 100% 精準對齊
       3. 限制 max-w-4xl mx-auto，讓 D3 標籤雲與全站維持一致的置中視覺比例
    */
    <main className="min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl w-full space-y-10 overflow-visible">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 tracking-tight">
            標籤雲
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm">
            共有 {tags.length} 個標籤
          </p>
        </div>

        {/* 漸顯平滑上升動畫 */}
        <div className="animate-page-in w-full">
          {/* D3 標籤雲元件會自動適應我們新給予的 max-w-4xl 寬度縮放 */}
          <TagCloudD3 tags={tags} />
        </div>
      </div>
    </main>
  );
}