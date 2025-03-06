'use client';

import React from 'react';

interface Section {
  title: string;
  content?: string;
  items?: string[];
  subsections?: Section[];
}

interface PrivacyPolicyProps {
  locale: {
    title: string;
    description: string;
    lastUpdated: string;
    introduction: string;
    sections: Section[];
    contactInfo: string;
  };
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ locale }) => {
  const renderSection = (section: Section, level: number = 2) => {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
      <div key={section.title} className="mt-4">
        <HeadingTag className={`text-${4 - level}xl font-semibold mb-2`}>{section.title}</HeadingTag>
        {section.content && <div dangerouslySetInnerHTML={{ __html: section.content }} />}
        {section.items && (
          <ul className="list-disc pl-5 mt-2">
            {section.items.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )}
        {section.subsections && section.subsections.map(subsection => renderSection(subsection, level + 1))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{locale.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{locale.lastUpdated}</p>
      <p className="mb-6">{locale.description}</p>
      <div className="space-y-4">
        <p>{locale.introduction}</p>
        {locale.sections.map(section => renderSection(section))}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p dangerouslySetInnerHTML={{ __html: locale.contactInfo }} />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;