
import { siteConfig } from "@/config/site";
import { Tier, TiersEnum } from "@/types/pricing";

export const TIERS_EN: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Free Plan",
    price: "Free",
    href: siteConfig.openSourceURL || "#",
    description:
      "Access basic features and generate up to 10 images per month.",
    features: [
      "Free",
      "Generate up to 10 images per month",
      "Basic features",
      "Access to AI anime generator",
    ],
    buttonText: "Get started",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Pro Plan",
    href: siteConfig.authors[0].twitter || "#",
    description: "For $9.99/month, enjoy up to 10,000 image generations, advanced customization options, and priority support.",
    price: "$9.99/month",
    features: [
      "Up to 10,000 image generations",
      "Advanced customization options",
      "Exclusive style",
      "One-on-one service",
    ],
    buttonText: "Subscribe",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_ZH: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "免费计划",
    price: "免费",
    href: siteConfig.openSourceURL || "#",
    description: "访问基本功能，每月最多生成10张图片。",
    features: [
      "免费",
      "每月生成最多10张图片",
      "基本功能",
      "访问AI动漫生成器",
    ],
    buttonText: "开始",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "专业版",
    href: siteConfig.authors[0].twitter || "#",
    description: "每月$9.99，享受10000张图片生成、先进的自定义选项和优先支持。",
    price: "$9.99/月",
    features: [
      "最多10,000张图片生成",
      "高级自定义选项",
      "专属风格",
      "一对一服务",
    ],
    buttonText: "订阅",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_JA: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "無料プラン",
    price: "無料",
    href: siteConfig.openSourceURL || "#",
    description: "基本機能にアクセスし、毎月最大10枚の画像を生成できます。",
    features: [
      "無料",
      "毎月最大10枚の画像生成",
      "基本機能",
      "AIアニメ生成器へのアクセス",
    ],
    buttonText: "始める",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "プロプラン",
    href: siteConfig.authors[0].twitter || "#",
    description: "月額$9.99で、最大10,000枚の画像生成、詳細なカスタマイズオプション、優先サポートをご利用いただけます。",
    price: "$9.99/月",
    features: [
      "最大10,000枚の画像生成",
      "詳細なカスタマイズオプション",
      "専用スタイル",
      "一対一のサービス",
    ],
    buttonText: "今すぐ購読",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_AR: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "الخطة المجانية",
    price: "مجاني",
    href: siteConfig.openSourceURL || "#",
    description: "الوصول إلى الميزات الأساسية وإنشاء ما يصل إلى 10 صور شهريًا.",
    features: [
      "مجاني",
      "إنشاء ما يصل إلى 10 صور شهريًا",
      "ميزات أساسية",
      "الوصول إلى مولد الأنمي بالذكاء الاصطناعي",
    ],
    buttonText: "ابدأ الآن",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "الخطة الاحترافية",
    href: siteConfig.authors[0].twitter || "#",
    description: "بـ $9.99 شهريًا، استمتع بإمكانية توليد ما يصل إلى 10,000 صورة، خيارات تخصيص متقدمة، ودعم مميز.",
    price: "$9.99/شهر",
    features: [
      "توليد ما يصل إلى 10,000 صورة",
      "خيارات تخصيص متقدمة",
      "أسلوب حصري",
      "خدمة فردية",
    ],
    buttonText: "اشترك الآن",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_ES: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Plan Gratuito",
    price: "Gratuito",
    href: siteConfig.openSourceURL || "#",
    description:
      "Accede a las funciones básicas y genera hasta 10 imágenes al mes.",
    features: [
      "Gratuito",
      "Genera hasta 10 imágenes al mes",
      "Funciones básicas",
      "Acceso al generador de anime con IA",
    ],
    buttonText: "Comenzar",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Plan Profesional",
    href: siteConfig.authors[0].twitter || "#",
    description: "Por $9.99 al mes, disfruta de hasta 10,000 generaciones de imágenes, opciones avanzadas de personalización y soporte prioritario.",
    price: "$9.99/mes",
    features: [
      "Hasta 10,000 generaciones de imágenes",
      "Opciones avanzadas de personalización",
      "Estilo exclusivo",
      "Servicio personalizado",
    ],
    buttonText: "Suscribirse",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_RU: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Бесплатный план",
    price: "Бесплатно",
    href: siteConfig.openSourceURL || "#",
    description:
      "Доступ к основным функциям и возможность создавать до 10 изображений в месяц.",
    features: [
      "Бесплатно",
      "Создание до 10 изображений в месяц",
      "Основные функции",
      "Доступ к генератору аниме с ИИ",
    ],
    buttonText: "Начать",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "План Профессионал",
    href: siteConfig.authors[0].twitter || "#",
    description: "Всего за $9.99 в месяц вы получите до 10,000 генераций изображений, расширенные параметры настройки и приоритетную поддержку.",
    price: "$9.99/месяц",
    features: [
      "До 10,000 генераций изображений",
      "Расширенные параметры настройки",
      "Эксклюзивный стиль",
      "Индивидуальное обслуживание",
    ],
    buttonText: "Подписаться",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

interface TiersCollection {
  [key: `TIERS_${string}`]: Array<Tier>;
}

export const ALL_TIERS: TiersCollection = {
  TIERS_EN,
  TIERS_ZH,
  TIERS_JA,
  TIERS_AR,
  TIERS_ES,
  TIERS_RU
}