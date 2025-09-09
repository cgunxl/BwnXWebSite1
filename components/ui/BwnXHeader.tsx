'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';
import { locales, localeNames, type Locale } from '@/lib/i18n/config';
import { mergedCategories as calculatorCategories } from '@/lib/utils/categories';

interface BwnXHeaderProps {
  locale: Locale;
}

export default function BwnXHeader({ locale }: BwnXHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Change language handler
  const changeLanguage = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    window.location.href = segments.join('/');
  };

  // Get flag emoji for locale
  const getFlagEmoji = (locale: Locale): string => {
    const flags: Record<Locale, string> = {
      en: '🇺🇸', es: '🇪🇸', pt: '🇵🇹', de: '🇩🇪', fr: '🇫🇷',
      ja: '🇯🇵', ko: '🇰🇷', zh: '🇨🇳', th: '🇹🇭', ar: '🇸🇦',
      hi: '🇮🇳', id: '🇮🇩', ru: '🇷🇺', it: '🇮🇹', nl: '🇳🇱',
      vi: '🇻🇳', fa: '🇮🇷'
    };
    return flags[locale] || '🌐';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg-base/60 backdrop-blur-xl border-b border-stroke-soft' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${locale}`} 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-xl group-hover:bg-accent/30 transition-colors" />
              <span className="relative text-2xl font-bold bg-gradient-to-r from-accent to-accent-aqua bg-clip-text text-transparent">
                BwnX
              </span>
            </div>
            <span className="text-xl font-medium text-text-primary">
              Calculator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Category Links */}
            <div className="flex items-center space-x-6">
              {Object.entries(calculatorCategories).slice(0, 5).map(([key, category]) => {
                const categoryName = typeof category.name === 'string' 
                  ? category.name 
                  : (category.name?.[locale] || category.name?.en || 'Category');
                
                return (
                  <Link
                    key={key}
                    href={`/${locale}/${key}`}
                    className="nav-link"
                  >
                    <span className="flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{categoryName}</span>
                    </span>
                  </Link>
                );
              })}
              <button className="nav-link">
                More...
              </button>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <SearchBar locale={locale} />
            </div>
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="btn-icon flex items-center justify-center hover:bg-surface-2 transition-colors"
                aria-label="Change language"
              >
                <span className="text-xl">{getFlagEmoji(locale)}</span>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 glass-card p-2 animate-fade-in">
                  <div className="max-h-96 overflow-y-auto">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          changeLanguage(loc);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          locale === loc 
                            ? 'bg-accent/10 text-accent' 
                            : 'text-text-secondary hover:bg-surface-1 hover:text-text-primary'
                        }`}
                      >
                        <span className="text-lg">{getFlagEmoji(loc)}</span>
                        <span className="font-medium">{localeNames[loc]}</span>
                        <span className="text-xs uppercase opacity-60">{loc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden btn-icon"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden mt-4 glass-card p-4 animate-fade-in">
            <div className="mb-4">
              <SearchBar locale={locale} />
            </div>
            <div className="space-y-2">
              {Object.entries(calculatorCategories).map(([key, category]) => {
                const categoryName = typeof category.name === 'string' 
                  ? category.name 
                  : (category.name?.[locale] || category.name?.en || 'Category');
                
                return (
                  <Link
                    key={key}
                    href={`/${locale}/${key}`}
                    className="block px-4 py-2 rounded-lg text-text-secondary hover:bg-surface-1 hover:text-text-primary transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{categoryName}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}