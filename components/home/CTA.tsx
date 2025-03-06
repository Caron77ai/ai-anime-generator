/* eslint-disable react/no-unescaped-entities */
import CTAButton from "./CTAButton";

interface CTAProps {
  locale: {
    title: string;
    description: string;
  };
  CTALocale: {
    title: string;
  };
}

export default function CTA({ locale, CTALocale }: CTAProps) {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              {locale.title}
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              {locale.description}
            </p>
          </div>
          <div>
            <CTAButton locale={CTALocale} />
          </div>
        </div>
      </div>
    </div>
  );
}
