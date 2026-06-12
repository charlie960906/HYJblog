import { generateAtomFeed } from '@/lib/feed';

export const dynamic = 'force-static';

export async function GET() {
  const atom = generateAtomFeed();

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
