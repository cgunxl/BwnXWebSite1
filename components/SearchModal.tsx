'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Calculator, X } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { calculators, categories } from '@/data/calculators';
import { SearchResult } from '@/types/calculator';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  locale
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const searchQuery = query.toLowerCase();

    // Search calculators
    calculators.forEach(calc => {
      const name = calc.localizedContent?.[locale]?.name || calc.name;
      const description = calc.localizedContent?.[locale]?.description || calc.description;
      const keywords = calc.keywords.join(' ').toLowerCase();

      if (
        name.toLowerCase().includes(searchQuery) ||
        description.toLowerCase().includes(searchQuery) ||
        keywords.includes(searchQuery)
      ) {
        searchResults.push({
          id: calc.id,
          name,
          description,
          category: calc.category,
          slug: calc.slug,
          icon: calc.icon,
          emoji: calc.emoji,
          score: 0
        });
      }
    });

    // Sort by relevance
    searchResults.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const queryLower = searchQuery;

      // Exact matches first
      if (aName === queryLower) return -1;
      if (bName === queryLower) return 1;

      // Starts with query
      if (aName.startsWith(queryLower) && !bName.startsWith(queryLower)) return -1;
      if (bName.startsWith(queryLower) && !aName.startsWith(queryLower)) return 1;

      // Contains query
      if (aName.includes(queryLower) && !bName.includes(queryLower)) return -1;
      if (bName.includes(queryLower) && !aName.includes(queryLower)) return 1;

      return aName.localeCompare(bName);
    });

    setResults(searchResults.slice(0, 10)); // Limit to 10 results
    setSelectedIndex(0);
  }, [query, locale]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelectResult(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    const category = categories.find(cat => cat.id === result.category);
    if (category) {
      router.push(`/${locale}/${category.id}/${result.slug}`);
      onClose();
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.localizedName?.[locale] || category?.name || categoryId;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Search size={20} className="text-text-muted" />
          <input
            ref={inputRef}
            placeholder="Search calculators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 bg-bg-raised border border-stroke-soft rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-accent-2 transition-colors"
          />
        </div>

        {query && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="text-center py-8 text-text-muted">
                No calculators found for "{query}"
              </div>
            ) : (
              results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleSelectResult(result)}
                  className={clsx(
                    'w-full p-3 text-left rounded-xl transition-colors',
                    'hover:bg-surface-1/50',
                    index === selectedIndex && 'bg-surface-1/50 border border-stroke-soft'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{result.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-text-primary truncate">
                        {result.name}
                      </div>
                      <div className="text-sm text-text-muted truncate">
                        {result.description}
                      </div>
                      <div className="text-xs text-text-muted mt-1">
                        {getCategoryName(result.category)}
                      </div>
                    </div>
                    <Calculator size={16} className="text-text-muted" />
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {!query && (
          <div className="text-center py-8 text-text-muted">
            Start typing to search calculators...
          </div>
        )}
      </div>
    </Modal>
  );
};