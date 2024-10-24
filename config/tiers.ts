import { siteConfig } from "@/config/site";
import { Tier as ImportedTier } from "@/types/pricing";

// 在这里定义并导出 TiersEnum
export enum TiersEnum {
  Free = "free",
  Basic = "basic",
  Pro = "pro",
  Customize = "customize"
}

// 修改 Tier 类型定义，移除 priceId，添加 plan_id
export type Tier = Omit<ImportedTier, 'priceId'> & {
  buttonColor: "primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined;
  buttonVariant: string;
  plan_id: string;
};

// TIERS_EN 和其他 TIERS 数组的定义保持不变

export const TIERS_EN: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Free Plan",
    price: "Free",
    href: siteConfig.openSourceURL || "#",
    description: "Access basic features and generate up to 10 images in total.",
    features: [
      "Free",
      "Generate up to 10 images in total",
      "Basic features",
      "Access to AI anime generator",
    ],
    buttonText: "Get started",
    buttonColor: "primary",
    buttonVariant: "solid",
    plan_id: "price_free",
  },
  {
    key: TiersEnum.Basic,
    title: "Basic Plan",
    href: siteConfig.authors[0].twitter || "#",
    description: "For $9.9/month, enjoy up to 1,000 image generations, advanced customization options, and priority support.",
    price: "$9.9/month",
    features: [
      "Up to 1,000 image generations",
      "Advanced customization options",
      "Priority support",
    ],
    buttonText: "Subscribe",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1Q7U7vP1MdvuF76F4R2GSjQZ", // 已更新
  },
  {
    key: TiersEnum.Pro,
    title: "Pro Plan",
    href: siteConfig.authors[0].twitter || "#",
    description: "For $99/year, enjoy up to 10,000 image generations, advanced customization options, and priority support.",
    price: "$99/year",
    features: [
      "Up to 12,000 image generations",
      "Advanced customization options",
      "Exclusive style",
      "One-on-one service",
    ],
    buttonText: "Subscribe",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1QD1G4P1MdvuF76FjnZuNjUK", // 已更新
  },
];

// 修改 TIERS_ZH 数组中的 buttonColor
const TIERS_ZH: Tier[] = [
  {
    key: TiersEnum.Free,
    title: "免费计划",
    price: "免费",
    href: siteConfig.openSourceURL || "#",
    description: "访问基本功能，总共可生成10张图片。",
    features: [
      "免费",
      "总共可生成10张图片",
      "基本功能",
      "访问AI动漫生成器",
    ],
    buttonText: "开始",
    buttonColor: "primary", // 或者其他允许的值
    buttonVariant: "solid",
    plan_id: "price_free", // 添加免费计划的价格ID（如果需要）
  },
  {
    key: TiersEnum.Basic,
    title: "基础计划",
    href: siteConfig.authors[0].twitter || "#",
    description: "每月$9.9，享受1000张图片生成、高级自定义选项和优先支持。",
    price: "$9.9/月",
    features: [
      "最多1,000张图片生成",
      "高级自定义选项",
      "优先支持",
    ],
    buttonText: "订阅",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1Q7U7vP1MdvuF76F4R2GSjQZ", // 已更新
  },
  {
    key: TiersEnum.Pro,
    title: "专业版",
    href: siteConfig.authors[0].twitter || "#",
    description: "每年$99，享受12000张图片生成、先进的自定义选项和优先支持。",
    price: "$99/年",
    features: [
      "最多12,000张图片生成",
      "高级自定义选项",
      "专属风格",
      "一对一服务",
    ],
    buttonText: "订阅",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1QD1G4P1MdvuF76FjnZuNjUK", // 已更新
  },
];

export const TIERS_JA: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "無料プラン",
    price: "無料",
    href: siteConfig.openSourceURL || "#",
    description: "基本機能にアクセスし、合計10枚までの画像を生成できます。",
    features: [
      "無料",
      "合計10枚までの画像生成",
      "基本機能",
      "AIアニメ生成器へのアクセス",
    ],
    buttonText: "始める",
    buttonColor: "primary",
    buttonVariant: "solid",
    plan_id: "price_free", // 添加免费计划的价格ID（如果需要）
  },
  {
    key: TiersEnum.Basic,
    title: "ベーシックプラン",
    href: siteConfig.authors[0].twitter || "#",
    description: "月額$9.9で、最大1,000枚の画像生成、詳細なカスタマイズオプション、優先サポートをご利用いただけます。",
    price: "$9.9/月",
    features: [
      "最大1,000枚の画像生成",
      "詳細なカスタマイズオプション",
      "優先サポート",
    ],
    buttonText: "購読する",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1Q7U7vP1MdvuF76F4R2GSjQZ", // 已更新
  },
  {
    key: TiersEnum.Pro,
    title: "プロプラン",
    href: siteConfig.authors[0].twitter || "#",
    description: "年間$99で、最大12,000枚の画像生成、詳細なカスタマイズオプション、優先サポートをご利用いただけます。",
    price: "$99/年",
    features: [
      "最大12,000枚の画像生成",
      "詳細なカスタマイズオプション",
      "専用スタイル",
      "一対一のサービス",
    ],
    buttonText: "購読する",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1QD1G4P1MdvuF76FjnZuNjUK", // 已更新
  },
];

export const TIERS_AR: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "الخطة المجانية",
    price: "مجاني",
    href: siteConfig.openSourceURL || "#",
    description: "الوصول إلى الميزات الأساسية وإنشاء ما يصل إلى 10 صور إجمالاً.",
    features: [
      "مجاني",
      "إنشاء ما يصل إلى 10 صور إجمالاً",
      "ميزات أساسية",
      "الوصول إلى مولد الأنمي بالذكاء الاصطناعي",
    ],
    buttonText: "ابدأ الآن",
    buttonColor: "primary",
    buttonVariant: "solid",
    plan_id: "price_free", // 添加免费计划的价格ID（如果需要）
  },
  {
    key: TiersEnum.Basic,
    title: "الخطة الأساسية",
    href: siteConfig.authors[0].twitter || "#",
    description: "بـ $9.9 شهريًا، استمتع بإمكانية توليد ما يصل إلى 1,000 صورة، خيارات تخصيص متقدمة، ودعم ذو أولوية.",
    price: "$9.9/شهر",
    features: [
      "توليد ما يصل إلى 1,000 صورة",
      "خيارات تخصيص متقدمة",
      "دعم ذو أولوية",
    ],
    buttonText: "اشترك الآن",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1Q7U7vP1MdvuF76F4R2GSjQZ", // 已更新
  },
  {
    key: TiersEnum.Pro,
    title: "الخطة الاحترافية",
    href: siteConfig.authors[0].twitter || "#",
    description: "بـ 99$ سنويًا، استمتع بإمكانية توليد ما يصل إلى 12,000 صورة، خيارات تخصيص متقدمة، ودعم مميز.",
    price: "$99/سنة",
    features: [
      "توليد ما يصل إلى 12,000 صورة",
      "خيارات تخصيص متقدمة",
      "أسلوب حصري",
      "خدمة فردية",
    ],
    buttonText: "اشترك الآن",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1QD1G4P1MdvuF76FjnZuNjUK", // 已更新
  },
];

export const TIERS_ES: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Plan Gratuito",
    price: "Gratuito",
    href: siteConfig.openSourceURL || "#",
    description:
      "Accede a las funciones básicas y genera hasta 10 imágenes en total.",
    features: [
      "Gratuito",
      "Genera hasta 10 imágenes en total",
      "Funciones básicas",
      "Acceso al generador de anime con IA",
    ],
    buttonText: "Comenzar",
    buttonColor: "primary",
    buttonVariant: "solid",
    plan_id: "price_free", // 添加免费计划的价格ID（如果需要）
  },
  {
    key: TiersEnum.Basic,
    title: "Plan Básico",
    href: siteConfig.authors[0].twitter || "#",
    description: "Por $9.9 al mes, disfruta de hasta 1,000 generaciones de imágenes, opciones avanzadas de personalización y soporte prioritario.",
    price: "$9.9/mes",
    features: [
      "Hasta 1,000 generaciones de imágenes",
      "Opciones avanzadas de personalización",
      "Soporte prioritario",
    ],
    buttonText: "Suscribirse",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1Q7U7vP1MdvuF76F4R2GSjQZ", // 已更新
  },
  {
    key: TiersEnum.Pro,
    title: "Plan Profesional",
    href: siteConfig.authors[0].twitter || "#",
    description: "Por $99 al año, disfruta de hasta 12,000 generaciones de imágenes, opciones avanzadas de personalización y soporte prioritario.",
    price: "$99/año",
    features: [
      "Hasta 12,000 generaciones de imágenes",
      "Opciones avanzadas de personalización",
      "Estilo exclusivo",
      "Servicio personalizado",
    ],
    buttonText: "Suscribirse",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1QD1G4P1MdvuF76FjnZuNjUK", // 已更新
  },
];

export const TIERS_RU: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Бесплатный план",
    price: "Бесплатно",
    href: siteConfig.openSourceURL || "#",
    description:
      "Доступ к основным функциям и возможность создавать до 10 изображений в общей сложности.",
    features: [
      "Бесплатно",
      "Создание до 10 изображений в общей сложности",
      "Основные функции",
      "Доступ к генератору аниме с ИИ",
    ],
    buttonText: "Начать",
    buttonColor: "primary",
    buttonVariant: "solid",
    plan_id: "price_free", // 添加免费计划的价格ID（如果需要）
  },
  {
    key: TiersEnum.Basic,
    title: "Базовый план",
    href: siteConfig.authors[0].twitter || "#",
    description: "За $9.9 в месяц вы получите до 1,000 генераций изображений, расширенные параметры настройки и приоритетную поддержку.",
    price: "$9.9/месяц",
    features: [
      "До 1,000 генераций изображений",
      "Расширенные параметры настройки",
      "Приоритетная поддержка",
    ],
    buttonText: "Подписаться",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1Q7U7vP1MdvuF76F4R2GSjQZ", // 已更新
  },
  {
    key: TiersEnum.Pro,
    title: "Профессиональный план",
    href: siteConfig.authors[0].twitter || "#",
    description: "За $99 в год вы получите до 12,000 генераций изображений, расширенные параметры настройки и приоритетную поддержку.",
    price: "$99/год",
    features: [
      "До 12,000 генераций изображений",
      "Расширенные параметры настройки",
      "Эксклюзивный стиль",
      "Индивидуальное обслуживание",
    ],
    buttonText: "Подписаться",
    buttonColor: "default",
    buttonVariant: "flat",
    plan_id: "price_1QD1G4P1MdvuF76FjnZuNjUK", // 已更新
  },
];

interface TiersCollection {
  [key: `TIERS_${string}`]: Array<Tier>;
}

export const ALL_TIERS = {
  TIERS_EN,
  TIERS_ZH,
  TIERS_JA,
  TIERS_AR,
  TIERS_ES,
  TIERS_RU,
};
