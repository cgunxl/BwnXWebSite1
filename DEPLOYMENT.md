# Deployment Guide

## 🚀 Universal Calculator Hub - Deployment Instructions

This project can be deployed to both **Vercel** and **GitHub Pages**.

### 📊 Project Stats
- **430 Calculators** × **17 Languages** = **7,310 Unique URLs**
- **Locales**: EN, ES, PT, DE, FR, JA, KO, ZH, TH, AR, HI, ID, RU, IT, NL, VI, FA
- **Categories**: Finance, Health, Education, Engineering, Lifestyle, and more

---

## 🔷 Vercel Deployment

### Automatic Deployment
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and deploy

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables (Vercel)
Set these in Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_DEPLOY_TARGET=vercel
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
```

---

## 🐙 GitHub Pages Deployment

### Setup
1. Enable GitHub Pages in your repository settings
2. Set source to "GitHub Actions"

### Automatic Deployment
The `.github/workflows/deploy.yml` file handles automatic deployment on push to main branch.

### Manual Build for GitHub Pages
```bash
# Set environment for GitHub Pages
cp .env.github .env.production

# Build with GitHub Pages configuration
NEXT_PUBLIC_DEPLOY_TARGET=github npm run build

# The static files will be in the 'out' directory
```

### GitHub Pages URL
Your site will be available at:
```
https://cgunxl.github.io/BwnXWebSite1/
```

---

## 🔧 Configuration Files

### `next.config.mjs`
- Handles different deployment targets
- Sets basePath for GitHub Pages
- Configures static export when needed

### `vercel.json`
- Optimizes Vercel deployment
- Sets region to Singapore (sin1)
- Configures rewrites

### `.env.production` / `.env.github`
- Environment-specific variables
- Deploy target configuration
- Site URL settings

---

## 📝 Build Commands

```bash
# Development
npm run dev

# Production build (Vercel)
npm run build

# Production build (GitHub Pages)
npm run build:github

# Start production server
npm start
```

---

## ✅ Deployment Checklist

- [ ] All 430 calculators implemented
- [ ] 17 languages configured
- [ ] SEO metadata complete
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Performance optimized (LCP < 2.5s)
- [ ] Accessibility WCAG AA compliant
- [ ] Cross-browser tested
- [ ] Mobile responsive
- [ ] Analytics configured (optional)

---

## 🌍 Live URLs

- **Vercel**: https://bwn-x-web-site1.vercel.app
- **GitHub Pages**: https://cgunxl.github.io/BwnXWebSite1/

---

## 🆘 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### GitHub Pages 404
- Ensure `output: 'export'` is set in next.config.mjs
- Check basePath configuration
- Verify GitHub Actions workflow completed

### Vercel Issues
- Check build logs in Vercel dashboard
- Verify environment variables
- Ensure Node.js version compatibility (20.x)

---

## 📈 Performance Monitoring

After deployment, monitor:
- Core Web Vitals (LCP, FID, CLS)
- Page load times per locale
- Server response times
- Error rates

Use tools like:
- Google PageSpeed Insights
- WebPageTest
- Vercel Analytics
- Google Analytics

---

## 🔄 Updates & Maintenance

1. **Content Updates**: Edit calculator implementations in `lib/calculators/`
2. **Add Languages**: Update `lib/i18n/config.ts`
3. **New Calculators**: Add to `lib/calculators/all-calculators.ts`
4. **UI Changes**: Modify components in `components/`

Always test locally before deploying:
```bash
npm run dev
# Test at http://localhost:3000
```

---

## 📞 Support

For deployment issues:
- Check GitHub Actions logs
- Review Vercel build logs
- Verify environment variables
- Ensure all dependencies are installed

Happy Deploying! 🎉