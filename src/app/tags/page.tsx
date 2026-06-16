import { getAllTagsWithCount } from '@/lib/posts';
import TagCloudD3 from '@/components/TagCloudD3';

export const metadata = {
  title: '標籤雲 - HYJBLOG',
  description: '按標籤瀏覽文章',
};

export default function TagsPage() {
  const tags = getAllTagsWithCount();

  if (tags.length === 0) {
    // 💡 修正處：未找到標籤的畫面同樣加上 max-w-7xl mx-auto，保持對齊
    return (
      <div className="w-full pt-16 pb-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            標籤雲
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">共有 0 個標籤</p>
        </div>
        <p className="text-center text-neutral-600 dark:text-neutral-400 py-12">還擺沒有標籤</p>
      </div>
    );
  }

  return (
    /* 💡 修改處：
       在最外層的容器加入了 max-w-7xl mx-auto w-full，
       這能確保標籤雲頁面與文章分類總覽頁面的最大寬度（1280px）和水平中央留白完全同步！
    */
    <div className="w-full pt-16 pb-12 max-w-7xl mx-auto space-y-10">
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
        {/* 傳入從 Posts 抓到的原始帶有 count 的 tags 陣列 */}
        <TagCloudD3 tags={tags} />
      </div>
    </div>
  );
}