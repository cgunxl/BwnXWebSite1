'use client';

import React from 'react';
import Link from 'next/link';

interface CalculatorCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  locale: string;
  color?: string;
  isNew?: boolean;
  isTrending?: boolean;
}

export default function CalculatorCard({
  slug,
  title,
  description,
  icon,
  category,
  locale,
  color = '#3B82F6',
  isNew = false,
  isTrending = false
}: CalculatorCardProps) {
  return (
    <Link href={`/${locale}/calculator/${slug}`}>
      <div className="group relative cursor-pointer">
        {/* Card Content */}
        <div className="glass-card p-6">
          {/* Badges */}
          <div className="absolute top-4 right-4 flex gap-2">
            {isNew && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-bold rounded-full animate-pulse">
                NEW
              </span>
            )}
            {isTrending && (
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs font-bold rounded-full flex items-center gap-1">
                🔥 HOT
              </span>
            )}
          </div>

          {/* Icon with Background */}
          <div className="mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{
                background: `linear-gradient(135deg, ${color}20, ${color}40)`,
                boxShadow: `0 4px 20px ${color}20`
              }}
            >
              {icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Category Tag */}
          <div className="flex items-center justify-between">
            <span 
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${color}15`,
                color: color
              }}
            >
              {category}
            </span>

            {/* Arrow Icon */}
            <div className="w-8 h-8 rounded-full bg-surface-1 flex items-center justify-center group-hover:bg-accent transition-all duration-300">
              <svg 
                className="w-4 h-4 text-text-secondary group-hover:text-bg-deep transition-colors transform group-hover:translate-x-0.5"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Category Card Component
export function CategoryCard({
  name,
  description,
  icon,
  count,
  color,
  href
}: {
  name: string;
  description: string;
  icon: string;
  count: number;
  color: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="
        group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
        rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500
        hover:-translate-y-3 cursor-pointer overflow-hidden
      ">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${color}, ${color} 10px, transparent 10px, transparent 20px)`
          }}></div>
        </div>

        {/* Floating Icon */}
        <div className="absolute -top-10 -right-10 text-8xl opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
          {icon}
        </div>

        {/* Content */}
        <div className="relative">
          {/* Icon */}
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}dd)`,
              boxShadow: `0 10px 30px ${color}40`
            }}
          >
            <span className="filter drop-shadow-lg">{icon}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            {name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {count} calculators
            </span>
            
            {/* Explore Button */}
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color }}>
              <span>Explore</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}