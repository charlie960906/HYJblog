/** @type {import('next').NextConfig} */
const nextConfig = {
  
  // 💡 如果你是部署到自訂獨立網域，這裡保持空字串即可
  basePath: '',
  assetPrefix: '',

  images: {
    unoptimized: true,
  },

  // 💡 徹底移除無效且會引發警告的 allowedDevOrigins 欄位
  experimental: {},
};

export default nextConfig;