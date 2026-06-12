/** @type {import('next').NextConfig} */
const nextConfig = {
  // 💡 1. 強制將網站打包輸出為標準純 HTML 網頁
  output: 'export',

  // 💡 2. 因為是自訂獨立網域，這裡全部保持空字串即可！
  basePath: '',
  assetPrefix: '',

  images: {
    unoptimized: true,
  },
  experimental: {
    allowedDevOrigins: ['192.168.1.190'],
  },
};

export default nextConfig;