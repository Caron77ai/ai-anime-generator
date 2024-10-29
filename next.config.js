/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'aianimegenerators.com',
      'api.producthunt.com',
      'avatars.githubusercontent.com'
    ],
  },
  headers: async () => {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 