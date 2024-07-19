
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
    title: "Customize",
    href: siteConfig.authors[0].twitter || "#",
    description: "Pay to customize an exclusive landing page.",
    price: "$188",
    features: [
      "Access to full code",
      "Secondary development",
      "Exclusive style",
      "One-on-one service",
      "More exquisite pages",
    ],
    buttonText: "Contact us",
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
    title: "定制",
    href: siteConfig.authors[0].twitter || "#",
    description: "支付定制专属落地页。",
    price: "$188",
    features: [
      "访问全部代码",
      "二次开发",
      "独家风格",
      "一对一服务",
      "更精致的页面",
    ],
    buttonText: "联系我们",
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
    title: "カスタマイズ",
    href: siteConfig.authors[0].twitter || "#",
    description: "専用のランディングページをカスタマイズするために支払います。",
    price: "$188",
    features: [
      "全コードへのアクセス",
      "二次開発",
      "独占スタイル",
      "1対1のサービス",
      "より精巧なページ",
    ],
    buttonText: "お問い合わせ",
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
    title: "تخصيص",
    href: siteConfig.authors[0].twitter || "#",
    description: "ادفع لتخصيص صفحة هبوط حصرية.",
    price: "$188",
    features: [
      "الوصول إلى كامل الكود",
      "التطوير الثانوي",
      "أسلوب حصري",
      "خدمة فردية",
      "صفحات أكثر دقة",
    ],
    buttonText: "اتصل بنا",
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
    title: "Personalizar",
    href: siteConfig.authors[0].twitter || "#",
    description: "Paga para personalizar una página de aterrizaje exclusiva.",
    price: "$188",
    features: [
      "Acceso a todo el código",
      "Desarrollo secundario",
      "Estilo exclusivo",
      "Servicio personalizado",
      "Páginas más exquisitas",
    ],
    buttonText: "Contáctanos",
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
    title: "Настройка",
    href: siteConfig.authors[0].twitter || "#",
    description: "Оплатите персонализацию эксклюзивной лендинг страницы.",
    price: "$188",
    features: [
      "Доступ ко всему коду",
      "Вторичная разработка",
      "Эксклюзивный стиль",
      "Индивидуальное обслуживание",
      "Более изысканные страницы",
    ],
    buttonText: "Связаться с нами",
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