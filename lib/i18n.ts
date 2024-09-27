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
      PrivacyPolicy: {
        title: dict.PrivacyPolicy?.title || "Privacy Policy",
        introduction: dict.PrivacyPolicy?.introduction || "This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.",
        personalInfo: {
          title: dict.PrivacyPolicy?.personalInfo?.title || "Personal information we collect",
          content: dict.PrivacyPolicy?.personalInfo?.content || "When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device."
        },
        useOfInfo: {
          title: dict.PrivacyPolicy?.useOfInfo?.title || "How we use your personal information",
          content: dict.PrivacyPolicy?.useOfInfo?.content || "We use the information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations)."
        },
        sharingInfo: {
          title: dict.PrivacyPolicy?.sharingInfo?.title || "Sharing your personal Information",
          content: dict.PrivacyPolicy?.sharingInfo?.content || "We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you."
        },
        changes: {
          title: dict.PrivacyPolicy?.changes?.title || "Changes",
          content: dict.PrivacyPolicy?.changes?.content || "We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons."
        },
        contactInfo: dict.PrivacyPolicy?.contactInfo || "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at [your-email@example.com]."
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
