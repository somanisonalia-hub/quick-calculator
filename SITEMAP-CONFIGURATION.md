# Static Sitemap Configuration

## Overview
All sitemaps are now **statically generated** and stored in the `public/` folder. They are NOT generated at runtime.

## Sitemap Structure

### 1. Main Sitemap Index
**File:** `public/sitemap.xml`

```xml
<sitemapindex>
  <sitemap>
    <loc>https://quick-calculator.org/sitemap-en.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://quick-calculator.org/sitemap-es.xml</loc>
  </sitemap>
  <!-- ... other languages ... -->
</sitemapindex>
```

### 2. Language-Specific Sitemaps

| Language | File | URLs | Calculators | Status |
|----------|------|------|-------------|---------|
| English (EN) | `sitemap-en.xml` | 180 | 168 | Full set ✅ |
| Spanish (ES) | `sitemap-es.xml` | 180 | 168 | Full set ✅ |
| Portuguese (PT) | `sitemap-pt.xml` | 180 | 168 | Full set ✅ |
| French (FR) | `sitemap-fr.xml` | 180 | 168 | Full set ✅ |
| **German (DE)** | `sitemap-de.xml` | **42** | **30** | **Limited ⚡** |
| **Dutch (NL)** | `sitemap-nl.xml` | **42** | **30** | **Limited ⚡** |

### Limited Calculators for DE/NL
German and Dutch sitemaps include only 30 selected calculators (defined in `src/lib/DE_NL_SELECTED_CALCULATORS.json`):

**Categories breakdown:**
- Financial: 13 calculators
- Health: 6 calculators  
- Utilities: 6 calculators
- Math: 5 calculators

**Selected calculators include:**
- mortgage-calculator
- loan-calculator
- interest-calculator
- tax-calculator
- retirement-calculator
- bmi-calculator
- tdee-calculator
- calorie-deficit-calculator
- ... and 22 more

## Generation

### How to Regenerate Sitemaps

```bash
npm run generate-sitemaps
```

This will:
1. ✅ Scan all calculator JSON files in `content/calculators/`
2. ✅ Generate full sitemaps for EN, ES, PT, FR (168 calculators each)
3. ✅ Generate limited sitemaps for DE, NL (30 calculators each)
4. ✅ Create sitemap index at `public/sitemap.xml`
5. ✅ Include all static pages and category pages

### When to Regenerate

Regenerate sitemaps when:
- ✅ Adding new calculators
- ✅ Removing calculators
- ✅ Updating DE/NL selected calculator list
- ✅ Before deploying to production

## Runtime vs. Static

### ❌ OLD (Runtime Generation - DISABLED)
Previously, sitemaps were generated at runtime using:
- `src/app/sitemap.ts` *(disabled)*
- `src/app/sitemap-index.ts` *(disabled)*
- `src/app/[lang]/sitemap.ts` *(disabled)*

**These files are now renamed to `.disabled` and won't be used.**

### ✅ NEW (Static Generation - ACTIVE)
All sitemaps are pre-generated and stored in `public/`:
- `public/sitemap.xml` (index)
- `public/sitemap-en.xml`
- `public/sitemap-es.xml`
- `public/sitemap-pt.xml`
- `public/sitemap-fr.xml`
- `public/sitemap-de.xml` ⚡ Limited
- `public/sitemap-nl.xml` ⚡ Limited

## SEO Benefits

✅ **Faster:** No runtime generation overhead  
✅ **Reliable:** Always available, never fails  
✅ **Complete:** All 168 calculators indexed (EN/ES/PT/FR)  
✅ **Optimized:** Limited set for DE/NL (30 calculators)  
✅ **Standards:** Full XML sitemap protocol compliance  
✅ **Dated:** Includes lastmod dates for search engines

## File Sizes

```
-rw-r--r--  625B  sitemap.xml (index)
-rw-r--r--   16K  sitemap-en.xml (180 URLs)
-rw-r--r--   16K  sitemap-es.xml (180 URLs)
-rw-r--r--   16K  sitemap-pt.xml (180 URLs)
-rw-r--r--   16K  sitemap-fr.xml (180 URLs)
-rw-r--r--   4K   sitemap-de.xml (42 URLs) ⚡
-rw-r--r--   4K   sitemap-nl.xml (42 URLs) ⚡
```

## Verification

### Check Sitemap Index
```bash
curl https://quick-calculator.org/sitemap.xml
```

### Check DE Sitemap (Limited)
```bash
curl https://quick-calculator.org/sitemap-de.xml
# Should show only 30 calculators + static pages (42 URLs total)
```

### Check EN Sitemap (Full)
```bash
curl https://quick-calculator.org/sitemap-en.xml
# Should show all 168 calculators + static pages (180 URLs total)
```

## Robots.txt Reference

Make sure `public/robots.txt` points to the sitemap:

```txt
User-agent: *
Allow: /

Sitemap: https://quick-calculator.org/sitemap.xml
```

## Implementation Details

**Generator Script:** `scripts/generate-static-sitemaps.js`

**Key Features:**
- Reads calculators from `content/calculators/*.json`
- Filters DE/NL using `DE_NL_SELECTED_CALCULATORS.json`
- Generates proper XML with priorities and change frequencies
- Includes all static pages (about, contact, privacy, etc.)
- Includes category pages (financial, health, math, etc.)
- Updates lastmod dates automatically

## Summary

✅ **Runtime generation:** Disabled  
✅ **Static files:** Active in `public/`  
✅ **Sitemap index:** Connected properly  
✅ **DE/NL:** Limited to 30 calculators  
✅ **EN/ES/PT/FR:** Full 168 calculators  
✅ **Command:** `npm run generate-sitemaps`

**Perfect for SEO and performance!** 🚀
