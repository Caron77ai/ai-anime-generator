/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://aianimegenerators.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
  additionalPaths: async (config) => {
    // 根据实际项目路由更新
    const routes = [
      '',                    // 首页
      '/generate-image',     // 生成图片页面
      '/billing',           // 账单页面
      '/success',           // 支付成功页面
      '/privacy-policy',    // 隐私政策
      '/[[...lang]]',       // 多语言路由
    ]

    return routes.map((route) => ({
      loc: route,
      changefreq: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    }))
  },
  exclude: [
    '/api/*',
    '/sign-in*',
    '/sign-up*',
    '/_*',
    '/404',
    '/500',
    '/success*',  // 排除支付成功页面
    '/billing*',  // 排除账单页面
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/generate-image',
          '/privacy-policy'
        ],
        disallow: [
          '/api/*',
          '/sign-in*',
          '/sign-up*',
          '/billing*',
          '/success*',
          '/admin/*',
          '/private/*'
        ]
      },
    ],
  },
} 