import AnimeGenerator from '@/components/AnimeGenerator';
import { getDictionary } from "@/lib/i18n";

export default async function GenerateImagePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="container mx-auto p-4">
      <AnimeGenerator locale={dict.AnimeGenerator} />
    </div>
  );
}