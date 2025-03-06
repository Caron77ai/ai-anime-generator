import { SiteConfig } from "@/types/siteConfig";
import { BsGithub, BsTwitterX, BsWechat } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { SiBuymeacoffee, SiJuejin } from "react-icons/si";

const OPEN_SOURCE_URL = 'https://github.com/Caron77'

const baseSiteConfig = {
  name: "AI Anime Generator",
  description:
    "Transform your creative ideas into stunning anime art with our advanced AI Anime Generator, perfect for artists, creators, and enthusiasts alike, offering limitless creative potential.",
  url: "https://aianimegenerators.com",
  ogImage: "https://landingpage.weijunext.com/og.png",
  metadataBase: '/',
  keywords: ["ai anime generator", "ai anime art", "anime image generator", "anime art creator", "ai art generator", "create anime art", "anime art tool", "high-resolution anime images", "customizable anime art", "ai art technology", "anime avatar creator", "comic book illustration tool", "anime wallpaper generator", "digital art projects", "anime content creation", "social media anime art", "ai art for videos", "anime backgrounds generator", "personalized anime art", "advanced ai art tool"],
  authors: [
    {
      name: "Caron77",
      url: "https://x.com/Caron7_7",
      twitter: 'https://x.com/Caron7_7',
    }
  ],
  creator: '@Caron77',
  openSourceURL: 'https://github.com/Caron77',
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  nextThemeColor: 'light', // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/logo.png",
  },
  headerLinks: [
    { name: 'repo', href: OPEN_SOURCE_URL, icon: BsGithub },
    { name: 'twitter', href: "https://x.com/Caron7_7", icon: BsTwitterX },
    { name: 'buyMeCoffee', href: "https://www.buymeacoffee.com/caron77", icon: SiBuymeacoffee }
  ],
  footerLinks: [
    { name: 'email', href: "mailto:caron77ai@gmail.com", icon: MdEmail },
    { name: 'twitter', href: "https://x.com/Caron7_7", icon: BsTwitterX },
    { name: 'github', href: "https://github.com/Caron77", icon: BsGithub },
    { name: 'buyMeCoffee', href: "https://www.buymeacoffee.com/caron77", icon: SiBuymeacoffee },
    { name: 'juejin', href: "https://juejin.cn/user/*****", icon: SiJuejin },
    { name: 'weChat', href: "https://ainavi.world/", icon: BsWechat }
  ],
  footerProducts: [
    { url: 'https://www.aitoolsss.com/', name: 'AI Toolsss' },
    { url: 'https://aianimegenerators.com', name: 'AI Anime Generators' },
    { url: 'https://landingpage.weijunext.com/', name: 'Landing Page Boilerplate' },
    { url: 'https://nextjs.weijunext.com/', name: 'Next.js Practice' },
    // { url: 'https://starter.weijunext.com/', name: 'Next.js Starter' },
    // { url: 'https://githubbio.com', name: 'Github Bio Generator' },
    // { url: 'https://github.com/weijunext/indie-hacker-tools', name: 'Indie Hacker Tools' },
  ]
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
}
