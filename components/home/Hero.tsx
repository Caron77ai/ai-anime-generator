"use client";
import { LineText } from "@/components/LineText";
// import CTAButton from "@/components/home/CTAButton"; // 移除这个导入
import { motion } from "framer-motion";
// import Image from 'next/image'; // 不再需要

// 修改类型定义，使CTALocale变为可选参数
type HeroProps = {
  locale: any;
  CTALocale?: any; // 使用可选参数标记
};

const Hero = ({ locale, CTALocale }: HeroProps) => {
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
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 pt-8 md:pt-16 text-center">
          <h1>
            {locale.title1} <LineText>{locale.title2}</LineText> {locale.title3}
          </h1>
          <p className="mx-auto mt-4 max-w-6xl text-2xl tracking-tight text-slate-700 dark:text-slate-400">
            {locale.description}
          </p>
          {/* Product Hunt Featured Badge - 更新后的链接 */}
          <a href="https://www.producthunt.com/posts/ai-anime-generator-10?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-ai&#0045;anime&#0045;generator&#0045;10" target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=546918&theme=light&t=1745757505607" alt="AI Anime Generator - text to image anime image generator | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" />
          </a>
        </section>
      </motion.div>
      {/* 移除CTAButton组件 */}
    </>
  );
};

export default Hero;
