import AnimeGenerator from '@/components/anime/AnimeGenerator';
import { getDictionary } from "@/lib/i18n";

export default async function AnimeGeneratorPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  console.log("AnimeGeneratorPage rendered with lang:", lang);

  try {
    const dict = await getDictionary(lang);

    const locale = {
      title: dict.animeGeneratorTitle,
      description: dict.animeGeneratorDescription,
      generateButton: dict.generateButton,
      generatingButton: dict.generatingButton,
      resultTitle: dict.resultTitle,
      inputPlaceholder: dict.inputPlaceholder,
      errorMessage: dict.errorMessage,
    };

    return (
      <div>
        <h1>{dict.animeGeneratorTitle}</h1>
        <AnimeGenerator locale={locale} />
      </div>
    );
  } catch (error) {
    console.error("Error loading dictionary:", error);
    return <div>Error loading page. Please try again later.</div>;
  }
}