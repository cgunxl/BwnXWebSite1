#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build requirements...\n');

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'next.config.js',
  'tailwind.config.js',
  'tsconfig.json',
  'middleware.ts',
  'app/layout.tsx',
  'app/globals.css',
  'app/sitemap.ts',
  'app/robots.ts',
  'app/not-found.tsx',
  'components/CalculatorForm.tsx',
  'components/Header.tsx',
  'components/SearchModal.tsx',
  'components/FAQ.tsx',
  'components/ui/Button.tsx',
  'components/ui/Input.tsx',
  'components/ui/Card.tsx',
  'components/ui/Modal.tsx',
  'lib/calculator-engine.ts',
  'data/calculators.ts',
  'types/calculator.ts',
  'messages/en.json',
  'messages/th.json',
  'messages/es.json',
  'messages/pt.json'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check if all locales have message files
const locales = ['en', 'es', 'pt', 'de', 'fr', 'ja', 'ko', 'zh', 'th', 'ar', 'hi', 'id', 'ru', 'it', 'nl', 'vi', 'fa'];
const missingLocales = [];

locales.forEach(locale => {
  const messageFile = `messages/${locale}.json`;
  if (!fs.existsSync(messageFile)) {
    missingLocales.push(locale);
  }
});

if (missingLocales.length > 0) {
  console.log(`\n⚠️  Missing message files for locales: ${missingLocales.join(', ')}`);
  console.log('Creating basic message files...');
  
  missingLocales.forEach(locale => {
    const messageFile = `messages/${locale}.json`;
    const basicMessages = {
      "common": {
        "calculate": "Calculate",
        "reset": "Reset",
        "copy": "Copy",
        "copied": "Copied!",
        "search": "Search calculators...",
        "language": "Language",
        "theme": "Theme",
        "loading": "Loading...",
        "error": "Error",
        "success": "Success"
      },
      "navigation": {
        "home": "Home",
        "calculators": "Calculators",
        "about": "About",
        "privacy": "Privacy",
        "terms": "Terms",
        "contact": "Contact"
      },
      "categories": {
        "finance": "Finance",
        "health": "Health",
        "education": "Education",
        "engineering": "Engineering",
        "lifestyle": "Lifestyle",
        "insurance": "Insurance",
        "tech": "Technology",
        "math": "Mathematics",
        "conversion": "Conversion",
        "business": "Business",
        "environment": "Environment",
        "fun": "Fun",
        "logistics": "Logistics",
        "household": "Household"
      },
      "calculators": {
        "loan": {
          "title": "Loan Calculator",
          "description": "Calculate monthly loan payments with interest and amortization schedule",
          "amount": "Loan Amount",
          "rate": "Interest Rate (%)",
          "term": "Loan Term (years)",
          "monthlyPayment": "Monthly Payment",
          "totalInterest": "Total Interest",
          "totalPayment": "Total Payment"
        },
        "bmi": {
          "title": "BMI Calculator",
          "description": "Calculate your Body Mass Index to assess your weight status",
          "weight": "Weight (kg)",
          "height": "Height (cm)",
          "bmi": "BMI",
          "category": "Category"
        }
      },
      "faq": {
        "title": "Frequently Asked Questions",
        "howToUse": "How to use this calculator?",
        "whatIs": "What is this calculator for?",
        "accurate": "How accurate are the results?",
        "free": "Is this calculator free to use?"
      },
      "footer": {
        "description": "BwnXCalculator - Your comprehensive calculator hub for finance, health, education, and more. Available in 17 languages.",
        "rights": "All rights reserved",
        "disclaimer": "Results are for informational purposes only. Consult professionals for important decisions."
      }
    };
    
    fs.writeFileSync(messageFile, JSON.stringify(basicMessages, null, 2));
    console.log(`✅ Created ${messageFile}`);
  });
}

console.log('\n🔧 Build check complete!');

if (allFilesExist) {
  console.log('✅ All required files are present');
  console.log('🚀 Ready to build and deploy!');
} else {
  console.log('❌ Some files are missing. Please check the output above.');
  process.exit(1);
}