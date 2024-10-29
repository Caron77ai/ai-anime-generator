"use client";
import { LineText } from "@/components/LineText";
import CTAButton from "@/components/home/CTAButton";
import { motion } from "framer-motion";
import Image from 'next/image';

const Hero = ({ locale, CTALocale }: { locale: any; CTALocale: any }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1],
          scale: {
            type: "tween",
          },
        }}
      >
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-16 md:pt-24 text-center">
          <h1>
            {locale.title1} <LineText>{locale.title2}</LineText> {locale.title3}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-2xl tracking-tight text-slate-700 dark:text-slate-400">
            {locale.description}
          </p>
          {/* Product Hunt Badge */}
          <a
            href="https://www.producthunt.com/posts/ai-anime-generator-10?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-ai&#0045;anime&#0045;generator&#0045;10"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6"
          >
            <Image
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=546918&theme=light"
              alt="AI Anime Generator - text to image anime image generator | Product Hunt"
              width={250}
              height={54}
              priority
              className="w-[250px] h-[54px]"
            />
          </a>
        </section>
      </motion.div>
      <CTAButton locale={CTALocale}></CTAButton>
    </>
  );
};

export default Hero;
