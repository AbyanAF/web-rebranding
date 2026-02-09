/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ... whitelist yang sudah ada sebelumnya (ArtStation, Unsplash, dll)
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pinterest.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.namu.wiki',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pin.it',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;