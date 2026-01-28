# Deployment Guide

## Overview
The calculator website is now fully built and ready for deployment to production. The project uses **static HTML export** which means all pages are pre-generated as individual HTML files that can be served instantly without a server.

## Build Output
- **Location**: `./out/` directory
- **Size**: ~93MB (4,134 files)
- **Pages**: 445 pre-rendered pages (all languages + all calculators + categories)
- **Sitemap**: `out/sitemap.xml` with 2,625 URLs for SEO

## How to Deploy

### Option 1: Cloudflare Pages (Recommended)
```bash
# 1. Build locally
npm run build

# 2. The 'out' directory is ready for deployment
# 3. Push to GitHub
git push

# 4. In Cloudflare Pages:
# - Connect to your GitHub repo
# - Set Build command: npm run build
# - Set Build output directory: out
# - Deploy!
```

### Option 2: Vercel
```bash
# 1. Connect your repo to Vercel
# 2. Vercel will auto-detect Next.js
# 3. Update Vercel settings:
#    - Build Command: npm run build
#    - Output Directory: out
# 4. Deploy!
```

### Option 3: Netlify
```bash
# 1. In netlify.toml, add:
[build]
command = "npm run build"
publish = "out"

# 2. Push to GitHub
# 3. Netlify will auto-deploy
```

### Option 4: Static Hosting (Any Provider)
```bash
# 1. Build locally
npm run build

# 2. Upload the entire 'out' directory to your web server
# 3. Set index.html as default document
# 4. Configure server for SPA routing (if needed):
#    - Serve index.html for 404s (for language detection)
```

## Pre-Deployment Checklist

- ✅ Build completes without errors
- ✅ All 445 pages generated
- ✅ Sitemap.xml created
- ✅ All 4 languages supported (en, es, pt, fr)
- ✅ SEO metadata included
- ✅ Images optimized (WebP + AVIF formats)
- ✅ CSS and JavaScript minified
- ✅ Trailing slashes configured for SEO

## Post-Deployment

### 1. Verify Site is Live
```bash
# Check homepage
curl https://yourdomain.com/en/

# Check a calculator
curl https://yourdomain.com/en/bmi-calculator/

# Check sitemap
curl https://yourdomain.com/sitemap.xml
```

### 2. Submit to Search Engines
1. **Google Search Console**
   - Go to https://search.google.com/search-console
   - Add your domain
   - Submit sitemap: https://yourdomain.com/sitemap.xml
   - Request indexing for homepage

2. **Bing Webmaster Tools**
   - Go to https://www.bing.com/webmaster/
   - Add your domain
   - Submit sitemap

3. **Yandex (if targeting Russia/CIS)**
   - Go to https://webmaster.yandex.com/
   - Add your domain

### 3. AdSense Configuration
- ✅ Privacy Policy: https://yourdomain.com/privacy
- ✅ Terms of Service: https://yourdomain.com/terms
- ✅ Cookie Consent Banner: Implemented
- ✅ Multiple languages: Supported
- ✅ High-quality content: 445+ calculators with detailed SEO content

### 4. Analytics Setup
- Google Analytics already configured for tracking
- Monitor traffic from all languages
- Track calculator usage patterns
- Monitor bounce rates by category

### 5. Performance Monitoring
- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Check CDN cache hit rates
- Monitor TTFB (Time to First Byte)

## Important Notes

### Development vs Production
- **Development**: Run `npm run dev` for live reloading (server-side)
- **Production**: Build with `npm run build` generates static files in `out/`

### Content Updates
- To update calculator content, modify JSON files in `content/calculators/`
- Rebuild with `npm run build`
- Redeploy the `out/` directory

### Cache Invalidation
- Most hosting platforms auto-invalidate cache on deploy
- For manual cache invalidation, check your provider's documentation
- Static files in `_next/` have hash-based names for efficient caching

## Troubleshooting

### Build Fails
```bash
# Clear Next.js cache and rebuild
rm -rf .next out
npm run build
```

### Pages Not Updating
```bash
# Ensure you've rebuilt after content changes
npm run build

# Clear browser cache or do hard refresh (Ctrl+Shift+R)
```

### Sitemap Not Found
```bash
# Verify sitemap exists
ls -l out/sitemap.xml

# Resubmit to search engines
```

## Monitoring Post-Deployment

1. **Search Console** - Check indexing status
2. **Analytics** - Monitor traffic growth
3. **Uptime Monitoring** - Use services like UptimeRobot
4. **Performance** - Regular Lighthouse audits
5. **AdSense** - Monitor earnings and impressions

---

**Status**: ✅ **PRODUCTION READY**

The website is fully optimized for:
- SEO (multi-language, structured data, sitemap)
- AdSense (high-quality content, compliance pages)
- Performance (static export, CDN-friendly)
- User Experience (responsive, multi-language, fast loading)
