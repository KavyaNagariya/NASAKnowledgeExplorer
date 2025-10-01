/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/handler/signup', destination: '/handler/sign-up', permanent: false },
      { source: '/handler/signin', destination: '/handler/sign-in', permanent: false },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
      },
      {
        protocol: 'https',
        hostname: 'images-assets.nasa.gov',
      },
      {
        protocol: 'https',
        hostname: '**.nasa.gov',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
}

module.exports = nextConfig
