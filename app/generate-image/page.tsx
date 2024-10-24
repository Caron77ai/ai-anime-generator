import AnimeGenerator from '@/components/AnimeGenerator';
import { AnimeGeneratorDictionary, getDictionary } from "@/lib/i18n";

// 使用导入的类型
type AnimeGeneratorLocale = AnimeGeneratorDictionary;

export default async function GenerateImagePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  // 使用类型断言确保 dict.AnimeGenerator 符合 AnimeGeneratorLocale 接口
  const animeGeneratorLocale: AnimeGeneratorLocale = {
    title: dict.AnimeGenerator.title || "",
    description: dict.AnimeGenerator.description || "",
    generateButton: dict.AnimeGenerator.generateButton || "",
    generatingButton: dict.AnimeGenerator.generatingButton || "",
    resultTitle: dict.AnimeGenerator.resultTitle || "",
    inputPlaceholder: dict.AnimeGenerator.inputPlaceholder || "",
    errorMessage: dict.AnimeGenerator.errorMessage || "",
    invalidResponseFormat: dict.AnimeGenerator.invalidResponseFormat,
    remainingGenerations: dict.AnimeGenerator.remainingGenerations || "已使用生成次数: {used}/{total}",
  };

  return (
    <div className="container mx-auto p-4">
      <AnimeGenerator locale={animeGeneratorLocale} />
    </div>
  );
}