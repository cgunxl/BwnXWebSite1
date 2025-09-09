'use client';

import React, { useState } from 'react';
import { Search, Globe, Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { SearchModal } from './SearchModal';
import { clsx } from 'clsx';

interface HeaderProps {
  locale: string;
  onLanguageChange: (locale: string) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' }
];

const Header: React.FC<HeaderProps> = ({ locale, onLanguageChange }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === '/' || (e.ctrlKey && e.key === 'k')) {
      e.preventDefault();
      setIsSearchOpen(true);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-bg-base/80 backdrop-blur-md border-b border-stroke-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="text-2xl">🧮</div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">BwnXCalculator</h1>
                <p className="text-xs text-text-muted">430 Calculators • 17 Languages</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2"
              >
                <Search size={16} />
                Search
                <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-surface-1 rounded">/</kbd>
              </Button>

              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2"
                >
                  <Globe size={16} />
                  {currentLanguage?.flag} {currentLanguage?.name}
                </Button>

                {isLanguageOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-bg-raised border border-stroke-soft rounded-xl shadow-2xl z-50">
                    <div className="p-2 max-h-80 overflow-y-auto">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            onLanguageChange(lang.code);
                            setIsLanguageOpen(false);
                          }}
                          className={clsx(
                            'w-full p-3 text-left rounded-lg transition-colors',
                            'hover:bg-surface-1/50',
                            locale === lang.code && 'bg-surface-1/50'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{lang.flag}</span>
                            <span className="text-text-primary">{lang.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-stroke-soft">
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start"
                >
                  <Search size={16} className="mr-2" />
                  Search Calculators
                </Button>

                <div className="space-y-2">
                  <p className="text-sm text-text-muted">Language</p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.slice(0, 8).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsMobileMenuOpen(false);
                        }}
                        className={clsx(
                          'p-2 text-left rounded-lg transition-colors',
                          'hover:bg-surface-1/50',
                          locale === lang.code && 'bg-surface-1/50'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span className="text-sm text-text-primary">{lang.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        locale={locale}
      />
    </>
  );
};

export default Header;