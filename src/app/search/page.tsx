import SearchPageClient from '@/components/SearchPageClient';

export const metadata = {
  title: '搜尋',
  description: '在站內搜尋文章',
};

export default function SearchPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full">
        <SearchPageClient />
      </div>
    </div>
  );
}
