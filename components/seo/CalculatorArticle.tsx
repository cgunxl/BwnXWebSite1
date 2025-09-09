'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface CalculatorArticleProps {
  title: string;
  content: string;
  locale: string;
}

export function CalculatorArticle({ title, content, locale }: CalculatorArticleProps) {
  return (
    <div className="mt-12 bg-surface-1 rounded-xl p-6 border border-stroke-soft">
      <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-accent" />
        {title}
      </h2>
      
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-3xl font-bold text-text-primary mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">{children}</h3>,
            p: ({ children }) => <p className="text-text-secondary mb-4 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside text-text-secondary mb-4 space-y-2">{children}</ol>,
            li: ({ children }) => <li className="text-text-secondary">{children}</li>,
            strong: ({ children }) => <strong className="text-text-primary font-semibold">{children}</strong>,
            em: ({ children }) => <em className="text-accent">{children}</em>,
            code: ({ children }) => <code className="bg-surface-2 text-accent px-2 py-1 rounded text-sm font-mono">{children}</code>,
            pre: ({ children }) => <pre className="bg-bg-base border border-stroke-soft rounded-lg p-4 overflow-x-auto mb-4">{children}</pre>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-accent pl-4 italic text-text-secondary my-4">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-accent hover:text-accent-2 underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}