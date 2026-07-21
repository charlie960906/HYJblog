/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  // 💡 正式開啟純靜態導出模式！執行 next build 後將自動生成 out/ 資料夾
  output: 'export',

  basePath: '',
  assetPrefix: '',

  images: {
    unoptimized: true,
  },

  // 💡 符合新版規格：只有在本地 npm run dev 時才啟用區網熱重載白名單
  // 雲端打包時此區塊自動抽離，確保編譯安全不噴配置無效警告
  ...(isDev && {
    allowedDevOrigins: ['10.14.0.2', '10.13.185.85', '192.168.1.190', 'localhost:3000'],
  }),

  experimental: {},
};

export default nextConfig;