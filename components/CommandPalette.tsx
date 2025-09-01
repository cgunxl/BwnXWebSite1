'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllCalculators, getCalculatorBySlug } from '@/lib/calculators/registry';
import { calculatorKeywords } from '@/lib/seo/keyword-research';

interface CommandPaletteProps {
  locale: string;
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  slug: string;
  name: string;
  category: string;
  icon: string;
  aliases: string[];
}

export default function CommandPalette({ locale, isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: CommandItem[] = useMemo(() => {
    const ids = getAllCalculators();
    return ids.map((slug) => {
      const meta = getCalculatorBySlug(slug);
      const kw = (calculatorKeywords as any)[slug];
      const locKw = kw?.[locale] || kw?.en;
      const aliases: string[] = [];
      if (locKw) {
        if (locKw.primary) aliases.push(locKw.primary);
        if (Array.isArray(locKw.secondary)) aliases.push(...locKw.secondary);
        if (Array.isArray(locKw.longTail)) aliases.push(...locKw.longTail);
        if (Array.isArray(locKw.questions)) aliases.push(...locKw.questions);
        if (Array.isArray(locKw.local)) aliases.push(...locKw.local);
        if (Array.isArray(locKw.voice)) aliases.push(...locKw.voice);
      }
      // Fallback aliases
      aliases.push(slug.replace(/-/g, ' '));
      aliases.push(meta?.name || slug);
      return {
        slug,
        name: meta?.name || slug,
        category: meta?.category || 'Calculator',
        icon: meta?.icon || '🧮',
        aliases: aliases.map((s) => String(s).toLowerCase()),
      };
    });
  }, [locale]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items
      .filter((it) => it.aliases.some((a) => a.includes(q)))
      .slice(0, 20);
  }, [items, query]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation within palette
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const target = results[activeIndex];
        if (target) selectItem(target);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, results, activeIndex]);

  const selectItem = (item: CommandItem) => {
    onClose();
    router.push(`/${locale}/calculator/${item.slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-w-2xl mx-auto mt-24 rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={locale === 'th' ? 'ค้นหาเครื่องคิดเลข…' : 'Search calculators…'}
            className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 py-1"
          />
          <span className="text-xs text-gray-500 hidden sm:inline">Esc</span>
        </div>
        <div className="max-h-96 overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              {locale === 'th' ? 'ไม่พบรายการ' : 'No matches'}
            </div>
          ) : (
            results.map((it, idx) => (
              <button
                key={it.slug}
                onClick={() => selectItem(it)}
                className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                  idx === activeIndex ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-2xl">{it.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-gray-100 truncate">{it.name}</div>
                  <div className="text-xs text-gray-500 truncate">{it.category}</div>
                </div>
                <div className="text-[10px] text-gray-500 border rounded px-1 py-0.5">
                  {locale.toUpperCase()}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

