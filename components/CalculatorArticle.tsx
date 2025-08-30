import React from 'react';
import { Article } from '@/lib/types/calculator';

interface CalculatorArticleProps {
  article: Article;
  locale: string;
}

export default function CalculatorArticle({ article, locale }: CalculatorArticleProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{article.title}</h2>
      
      <div className="text-gray-700 leading-relaxed mb-6">
        {article.introduction}
      </div>

      {article.sections.map((section, index) => (
        <section key={index} className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {section.heading}
          </h3>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {section.content}
          </div>
          
          {section.subSections && section.subSections.map((subSection, subIndex) => (
            <div key={subIndex} className="ml-6 mt-4">
              <h4 className="text-xl font-medium text-gray-800 mb-2">
                {subSection.heading}
              </h4>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {subSection.content}
              </div>
            </div>
          ))}
        </section>
      ))}

      <div className="border-t pt-6 mt-8">
        <div className="text-gray-700 leading-relaxed">
          {article.conclusion}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {locale === 'th' ? 'จำนวนคำ:' : 'Word count:'} {article.wordCount}
      </div>
    </article>
  );
}