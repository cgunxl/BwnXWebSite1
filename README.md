# BwnXCalculator

A comprehensive calculator hub offering 430 specialized calculators across 17 languages. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- **430+ Calculators** - From basic math to complex financial calculations
- **17 Languages** - Full localization with region-specific content
- **Dark Futuristic Theme** - Modern UI with mint/teal accents and smooth animations
- **Client-Side Calculations** - All calculations happen in your browser for privacy
- **SEO Optimized** - Complete with sitemap, robots.txt, and structured data
- **Mobile-First Design** - Responsive across all devices
- **Search Functionality** - Find calculators quickly with command palette
- **FAQ & How-to Content** - Comprehensive help for each calculator

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
bwnxcalculator/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── [category]/           # Category pages
│   │   │   └── [slug]/           # Calculator pages
│   │   ├── about/                # Static pages
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── contact/
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home redirect
│   ├── sitemap.ts                # Dynamic sitemap
│   └── robots.ts                 # Robots.txt
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── CalculatorForm.tsx        # Main calculator form
│   ├── FAQ.tsx                   # FAQ component
│   ├── Header.tsx                # Navigation header
│   └── SearchModal.tsx           # Search functionality
├── data/                         # Calculator data
│   └── calculators.ts            # Calculator definitions
├── lib/                          # Utilities
│   └── calculator-engine.ts      # Calculation logic
├── messages/                     # i18n translations
│   ├── en.json                   # English
│   ├── th.json                   # Thai
│   ├── es.json                   # Spanish
│   └── ...                       # 14 more languages
├── types/                        # TypeScript types
│   └── calculator.ts             # Calculator interfaces
└── middleware.ts                 # i18n middleware
```

## 🧮 Calculator Categories

- **Finance** (40 calculators) - Loans, investments, taxes, ROI
- **Health** (24 calculators) - BMI, BMR, calories, nutrition
- **Education** (41 calculators) - GPA, statistics, math formulas
- **Engineering** (20 calculators) - Electrical, mechanical, structural
- **Lifestyle** (20 calculators) - Age, dates, cooking, travel
- **Insurance** (8 calculators) - Life, health, auto insurance
- **Technology** (14 calculators) - Bandwidth, hosting, crypto
- **Mathematics** (19 calculators) - Advanced math, statistics
- **Conversion** (18 calculators) - Units, currencies, measurements
- **Business** (15 calculators) - ROI, pricing, payroll
- **Environment** (7 calculators) - Carbon footprint, solar
- **Logistics** (7 calculators) - Shipping, travel costs
- **Household** (11 calculators) - Budget, utilities, renovation
- **Fun** (14 calculators) - Games, astrology, entertainment

## 🌍 Supported Languages

1. English (en) 🇺🇸
2. Thai (th) 🇹🇭
3. Spanish (es) 🇪🇸
4. Portuguese (pt) 🇵🇹
5. German (de) 🇩🇪
6. French (fr) 🇫🇷
7. Japanese (ja) 🇯🇵
8. Korean (ko) 🇰🇷
9. Chinese (zh) 🇨🇳
10. Arabic (ar) 🇸🇦
11. Hindi (hi) 🇮🇳
12. Indonesian (id) 🇮🇩
13. Russian (ru) 🇷🇺
14. Italian (it) 🇮🇹
15. Dutch (nl) 🇳🇱
16. Vietnamese (vi) 🇻🇳
17. Persian (fa) 🇮🇷

## 🎨 Design System

### Color Palette
- **Background**: Dark graphite (#0B0D10, #0F1115, #151922)
- **Accent**: Mint/Teal (#00FFC6, #00E6A8, #66FFF5)
- **Text**: Light gray (#E6F7F5, #B3C6C2, #869590)
- **Surfaces**: Layered grays with subtle transparency

### Components
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Rounded with glow effects and micro-interactions
- **Inputs**: Clean with focus states and validation
- **Animations**: Smooth transitions with reduced motion support

## 🔧 Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts

## 📊 Performance Features

- **Client-Side Calculations** - No server round trips
- **Code Splitting** - Lazy loading for optimal performance
- **Image Optimization** - Next.js Image component
- **SEO Optimization** - Complete meta tags, sitemap, structured data
- **Accessibility** - WCAG AA compliant
- **Mobile-First** - Responsive design with touch-friendly interactions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Compatible with Next.js static export
- **AWS**: Use Amplify or custom deployment
- **Docker**: Use the included Dockerfile

## 📈 SEO Strategy

- **7,310 URLs** - 430 calculators × 17 languages
- **Structured Data** - FAQ, HowTo, and Calculator schemas
- **Hreflang** - Proper language targeting
- **Sitemap** - Auto-generated with all pages
- **Meta Tags** - Complete Open Graph and Twitter cards
- **Internal Linking** - Related calculators and categories

## 🔒 Privacy & Security

- **No Data Collection** - All calculations happen locally
- **GDPR Compliant** - Cookie consent and privacy controls
- **HTTPS Only** - Secure data transmission
- **No Tracking** - Privacy-first approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your calculator or improvement
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

- **Email**: cgunxlcb@gmail.com
- **Response Time**: Within 24 hours
- **Availability**: 24/7

## 🎯 Roadmap

- [ ] Add more calculators (targeting 500+)
- [ ] Implement user accounts and saved calculations
- [ ] Add calculator sharing and embedding
- [ ] Create mobile app versions
- [ ] Add advanced charting and visualization
- [ ] Implement calculator API for developers

---

**BwnXCalculator** - Making complex calculations simple, accessible, and available to everyone worldwide. 🌍