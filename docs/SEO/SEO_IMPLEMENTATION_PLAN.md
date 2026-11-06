# SEO Implementation Plan — SHIVOM GLOBAL TRADE

**Target Domain:** `https://www.shivomglobaltrade.com/`  
**Goal:** Align canonical identity, sitemaps, metadata, Open Graph, and Schema.org structured data to secure #1 branded search ranking for `shivom global trade` and related queries.

---

## Prioritized Implementation Items

### Item 1: Correct Canonical URL & Production Domain in `index.html`
- **File Path:** [`index.html`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/index.html)
- **Existing Implementation:**
  ```html
  <link rel="canonical" href="https://shivom-global-website.vercel.app/" />
  ```
- **Identified Issue:** Points search engine indexing authority to Vercel preview domain instead of the live production domain.
- **Proposed Correction:**
  ```html
  <link rel="canonical" href="https://www.shivomglobaltrade.com/" />
  ```
- **SEO Benefit:** Consolidates 100% of organic page rank, backlinks, and brand signals onto `www.shivomglobaltrade.com`.
- **Risk of Regression:** None.
- **Verification Method:** Run `npm run build`, inspect `dist/index.html`, and verify `<link rel="canonical">`.

---

### Item 2: Update HTML Title and Meta Description for Brand & Commercial Intent
- **File Path:** [`index.html`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/index.html)
- **Existing Implementation:**
  ```html
  <title>SHIVOM GLOBAL — Indian Tea Sourcing &amp; Export Desk | Bulk &amp; Private Label</title>
  <meta name="description" content="Credible Indian B2B tea sourcing and export desk. Source Assam CTC, Orthodox, Darjeeling, and Green Tea to your exact specification with counter-sample evaluation." />
  ```
- **Identified Issue:** Primary keyword `Shivom Global Trade` is absent in both title and meta description.
- **Proposed Correction:**
  ```html
  <title>Shivom Global Trade | Indian Tea Exporter &amp; Supplier</title>
  <meta name="description" content="Shivom Global Trade is an India-based tea sourcing and export company supplying Assam CTC, Orthodox, Darjeeling and Green Tea to international buyers." />
  ```
- **SEO Benefit:** Immediate exact-match title and snippet alignment for Google Search queries: `shivom global trade`, `shivom global`, `shivom global trade India`, `shivom global tea exporter`.
- **Risk of Regression:** None. Accurately describes existing business operations.
- **Verification Method:** Inspect rendered title and snippet in Google Search Console URL Inspection.

---

### Item 3: Update Open Graph & Twitter Social Metadata
- **File Path:** [`index.html`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/index.html)
- **Existing Implementation:**
  - `og:url` = `https://shivom-global-website.vercel.app/`
  - `og:site_name` = `SHIVOM GLOBAL`
  - `og:title` = `SHIVOM GLOBAL — Indian Tea Sourcing & Export Desk`
  - `og:image` = `https://shivom-global-website.vercel.app/Shivom%20Global%20Trade.png`
- **Identified Issue:** Uses obsolete preview URL and omits `Trade` in site name and title.
- **Proposed Correction:**
  - Update `og:url` and `og:image` to use `https://www.shivomglobaltrade.com/`.
  - Update `og:site_name` to `Shivom Global Trade`.
  - Update `og:title` to `Shivom Global Trade | Indian Tea Exporter & Supplier`.
  - Update `og:description` to match proposed meta description.
  - Update `twitter:title` and `twitter:image` to match.
- **SEO Benefit:** Clean social preview card across WhatsApp, LinkedIn, and Twitter when international buyers share links.
- **Risk of Regression:** None.
- **Verification Method:** Social card preview test and OpenGraph validator.

---

### Item 4: Enhance Schema.org JSON-LD Structured Data
- **File Path:** [`index.html`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/index.html)
- **Existing Implementation:**
  - Schema IDs and URLs use `https://shivom-global-website.vercel.app/`.
  - Entity names are strictly `"SHIVOM GLOBAL"`.
- **Identified Issue:** Knowledge Graph misses exact query variants (`Shivom Global Trade`, `Shivom Global Trade India`).
- **Proposed Correction:**
  - Update `@id` and `url` to `https://www.shivomglobaltrade.com/`.
  - Update `name` to `"Shivom Global Trade"`.
  - Add `"alternateName": ["SHIVOM GLOBAL", "Shivom Global Trade India", "Shivom Global Indian Tea Sourcing"]`.
  - Ensure `legalName`, `taxID` (GSTIN: 24KWEPS2703C1ZQ), and physical address details remain 100% accurate without alteration.
- **SEO Benefit:** Powers Google Rich Results and Knowledge Graph association for all brand name variations.
- **Risk of Regression:** None.
- **Verification Method:** Schema.org Validator / Google Rich Results Test tool.

---

### Item 5: Update `public/robots.txt`
- **File Path:** [`public/robots.txt`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/public/robots.txt)
- **Existing Implementation:**
  ```text
  User-agent: *
  Allow: /

  Disallow: /api/

  Sitemap: https://shivom-global-website.vercel.app/sitemap.xml
  ```
- **Identified Issue:** Sitemap directive points to `.vercel.app`.
- **Proposed Correction:**
  ```text
  User-agent: *
  Allow: /

  Disallow: /api/

  Sitemap: https://www.shivomglobaltrade.com/sitemap.xml
  ```
- **SEO Benefit:** Directs Googlebot cleanly to the custom domain sitemap.
- **Risk of Regression:** None.
- **Verification Method:** Fetch `https://www.shivomglobaltrade.com/robots.txt`.

---

### Item 6: Update `public/sitemap.xml`
- **File Path:** [`public/sitemap.xml`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/public/sitemap.xml)
- **Existing Implementation:**
  ```xml
  <url>
    <loc>https://shivom-global-website.vercel.app/</loc>
    <lastmod>2026-10-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ```
- **Identified Issue:** `<loc>` points to `.vercel.app`.
- **Proposed Correction:**
  ```xml
  <url>
    <loc>https://www.shivomglobaltrade.com/</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ```
- **SEO Benefit:** Enables Google Search Console to index `www.shivomglobaltrade.com` directly.
- **Risk of Regression:** None.
- **Verification Method:** XML validator and Search Console Sitemap submission.

