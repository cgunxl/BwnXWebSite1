'use client';

import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';

interface ExternalLinksProps {
  links: Array<{
    text: string;
    url: string;
    rel: string;
  }>;
  locale: string;
}

export function ExternalLinks({ links, locale }: ExternalLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className="mt-12 bg-surface-1 rounded-xl p-6 border border-stroke-soft">
      <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-accent" />
        {locale === 'th' ? 'แหล่งอ้างอิง' : 
         locale === 'es' ? 'Referencias' : 
         'References'}
      </h2>
      
      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel={link.rel}
            className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors duration-200 group"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span className="underline underline-offset-4">{link.text}</span>
          </a>
        ))}
      </div>
      
      <p className="text-sm text-text-muted mt-4">
        {locale === 'th' ? 
          'ลิงก์ภายนอกเหล่านี้ให้ข้อมูลเพิ่มเติมจากแหล่งที่เชื่อถือได้' : 
         locale === 'es' ? 
          'Estos enlaces externos proporcionan información adicional de fuentes confiables' : 
          'These external links provide additional information from trusted sources'}
      </p>
    </div>
  );
}