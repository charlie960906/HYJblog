/** @type {import('next').NextConfig} */
const nextConfig = {
  // 💡 本地保持不開啟 export 模式，方便你日後進行其他擴充
  basePath: '',
  assetPrefix: '',

  images: {
    unoptimized: true,
  },

  // 💡 徹底移除引發警告的 allowedDevOrigins
  experimental: {},
};

export default nextConfig;