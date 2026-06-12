import Link from "next/link";

export const metadata = {
  title: "404 - 頁面未找到",
  description: "抱歉，您訪問的頁面不存在。",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-neutral-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center space-y-8 animate-page-in">
        <div className="relative h-48 flex items-center justify-center mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-400 border-l-blue-400 animate-spin [animation-direction:reverse] [animation-duration:3s]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500">
                  404
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            哎呀，找不到頁面
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            頁面可能已被刪除，或是 URL 有誤。
          </p>
        </div>

        <p className="text-neutral-500 dark:text-neutral-500 leading-relaxed">
          你可以回到首頁，或透過標籤找找其他文章。
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl active:translate-y-0"
          >
            返回首頁
          </Link>
          <Link
            href="/tags"
            className="px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium transition-all hover:-translate-y-0.5"
          >
            瀏覽標籤
          </Link>
        </div>

        <div className="pt-4 text-xs text-neutral-400 dark:text-neutral-600">
          <p>錯誤代碼：404 Not Found</p>
        </div>
      </div>
    </div>
  );
}
