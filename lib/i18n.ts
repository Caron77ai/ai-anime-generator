import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const locales = ["", "en", "en-US", "zh", "zh-CN", "zh-TW", 'zh-HK', 'ja', "ar", "es", "ru"];
export const localeNames: any = {
  en: "🇺🇸 English",
  zh: "🇨🇳 中文",
  ja: "🇯🇵 日本語",
  ar: "🇸🇦 العربية",
  es: "🇪🇸 Español",
  ru: "🇷🇺 Русский",
};
export const defaultLocale = "en";

// If you wish to automatically redirect users to a URL that matches their browser's language setting,
// you can use the `getLocale` to get the browser's language.
export function getLocale(headers: any): string {
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

const dictionaries: any = {
  en: () => import("@/locales/en.json").then((module) => module.default),
  zh: () => import("@/locales/zh.json").then((module) => module.default),
  ja: () => import("@/locales/ja.json").then((module) => module.default),
  ar: () => import("@/locales/ar.json").then((module) => module.default),
  es: () => import("@/locales/es.json").then((module) => module.default),
  ru: () => import("@/locales/ru.json").then((module) => module.default),
};

export async function getDictionary(locale: string) {
  // 如果传入的 locale 不在 dictionaries 中，使用默认语言
  const dictionaryFunction = dictionaries[locale] || dictionaries[defaultLocale];

  try {
    const dict = await dictionaryFunction();
    return {
      // ... 其他翻译
      AnimeGenerator: {
        title: dict.animeGeneratorTitle || "Generate Anime Image",
        description: dict.animeGeneratorDescription || "Enter a description to generate an anime image:",
        generateButton: dict.animeGeneratorGenerateButton || "Generate",
        generatingButton: dict.animeGeneratorGeneratingButton || "Generating...",
        resultTitle: dict.animeGeneratorResultTitle || "Generated Image",
        inputPlaceholder: dict.animeGeneratorInputPlaceholder || "Enter your description here",
        errorMessage: dict.animeGeneratorErrorMessage || "An error occurred while generating the image",
      },
      // 添加其他需要的翻译
      Hero: dict.Hero || {},
      CTAButton: dict.CTAButton || {},
      SocialProof: dict.SocialProof || {},
      Feature: dict.Feature || {},
      Pricing: dict.Pricing || {},
      WallOfLove: dict.WallOfLove || {},
      FAQ: dict.FAQ || {},
      CTA: dict.CTA || {},
    };
  } catch (error) {
    console.error(`Failed to load dictionary for locale: ${locale}`, error);
    // 如果加载失败，返回一个包含默认值的对象
    return {
      AnimeGenerator: {
        title: "Generate Anime Image",
        description: "Enter a description to generate an anime image:",
        generateButton: "Generate",
        generatingButton: "Generating...",
        resultTitle: "Generated Image",
        inputPlaceholder: "Enter your description here",
        errorMessage: "An error occurred while generating the image",
      },
      // 其他翻译项使用空对象
      Hero: {},
      CTAButton: {},
      SocialProof: {},
      Feature: {},
      Pricing: {},
      WallOfLove: {},
      FAQ: {},
      CTA: {},
    };
  }
}
