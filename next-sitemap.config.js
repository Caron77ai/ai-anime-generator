/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://aianimegenerators.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/api/*',
    '/server-sitemap.xml',
    '/dashboard/*',
    '/admin/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/dashboard/*', '/admin/*'],
      },
    ],
  },
  additionalPaths: async (config) => [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/about', changefreq: 'monthly', priority: 0.8 },
    { loc: '/pricing', changefreq: 'weekly', priority: 0.8 },
    { loc: '/generator', changefreq: 'daily', priority: 0.9 },
    { loc: '/blog', changefreq: 'weekly', priority: 0.8 },
  ],
} 