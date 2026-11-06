# SEO Audit Report — SHIVOM GLOBAL TRADE

**Audit Date:** November 6, 2026  
**Audited Target:** `https://www.shivomglobaltrade.com/` (Production on Vercel)  
**Repository Branch:** `main`  
**Compliance Standard:** Google Search Essentials & Strict Engineering Rules (Phase 1 Inspection Only)

---

## 1. Executive Summary & Overall Assessment

An exhaustive, non-destructive audit of both the local repository and the live production domain (`https://www.shivomglobaltrade.com/`) reveals that while the technical website architecture (React 18 + Vite 6) is lightweight and serves semantic content rapidly, **the website is suffering from critical canonical and metadata misalignment that directly impedes Google Search from associating the site with its primary branded keyword: `shivom global trade`**.

### Overall SEO Health Score: **62 / 100**
- **Hosting & Infrastructure:** 95/100 (Clean HTTPS, HTTP/2, automated Vercel apex-to-www 308 redirect)
- **Technical SEO (Crawlability):** 60/100 (Discrepancy: `robots.txt` and `sitemap.xml` point to old `*.vercel.app` preview domain)
- **On-Page & Keyword Alignment:** 55/100 (Title, Description, and OpenGraph omit the full brand name `"Shivom Global Trade"` and focus solely on `"SHIVOM GLOBAL"`)
- **Structured Data (Schema.org):** 50/100 (Entity ID and canonical URLs reference `shivom-global-website.vercel.app` instead of the custom domain, splitting brand equity)

---

## 2. Critical Issues (Directly Impeding Google Indexing & Brand Rankings)

### Issue C-01: Canonical URL & Domain Fragmentation
- **Severity:** CRITICAL
- **Location:** [`index.html:9`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/index.html#L9)
- **Observed Behavior:**
  ```html
  <link rel="canonical" href="https://shivom-global-website.vercel.app/" />
  ```
- **Impact:** The production website (`https://www.shivomglobaltrade.com/`) explicitly instructs Googlebot: *"Do not index this custom domain; treat `https://shivom-global-website.vercel.app/` as the primary canonical source."* This strips organic search ranking authority away from `shivomglobaltrade.com` and suppresses it in Google Search results for `shivom global trade`.

### Issue C-02: Sitemap & Robots.txt Canonical Inconsistency
- **Severity:** CRITICAL
- **Location:** [`public/robots.txt:8`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/public/robots.txt#L8) & [`public/sitemap.xml:4`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/public/sitemap.xml#L4)
- **Observed Behavior:**
  - `robots.txt` directive: `Sitemap: https://shivom-global-website.vercel.app/sitemap.xml`
  - `sitemap.xml` location: `<loc>https://shivom-global-website.vercel.app/</loc>`
- **Impact:** Googlebot fetching the sitemap via `https://www.shivomglobaltrade.com/robots.txt` is told the sitemap belongs to an entirely different domain, triggering cross-domain sitemap ownership warnings in Google Search Console and preventing index coverage of `www.shivomglobaltrade.com`.

### Issue C-03: Entity Brand Name Mismatch in Schema.org JSON-LD
- **Severity:** CRITICAL
- **Location:** [`index.html:29-72`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/index.html#L29-L72)
- **Observed Behavior:**
  ```json
  {
    "@type": "Organization",
    "@id": "https://shivom-global-website.vercel.app/#organization",
    "name": "SHIVOM GLOBAL",
    "legalName": "SHIVOM GLOBAL",
    "url": "https://shivom-global-website.vercel.app/",
    ...
  }
  ```
- **Impact:** Google Knowledge Graph cannot resolve the identity of `SHIVOM GLOBAL TRADE`. The name is listed strictly as `"SHIVOM GLOBAL"`, and the URLs point to Vercel preview URLs.

---

## 3. High-Priority Issues (On-Page SEO & Keyword Discoverability)

### Issue H-01: HTML `<title>` Omits Primary Search Keyword
- **Location:** [`index.html:7`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/index.html#L7)
- **Current Title:** `SHIVOM GLOBAL — Indian Tea Sourcing & Export Desk | Bulk & Private Label`
- **Issue:** The phrase `"Shivom Global Trade"` does not appear anywhere in the title tag. When users or prospective international buyers search `"shivom global trade"`, Google looks for exact and strong semantic title matches.
- **Recommended Title:** `Shivom Global Trade | Indian Tea Exporter & Supplier`

### Issue H-02: Meta Description Omits Brand Query & Exporter Classification
- **Location:** [`index.html:8`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/index.html#L8)
- **Current Description:** `Credible Indian B2B tea sourcing and export desk. Source Assam CTC, Orthodox, Darjeeling, and Green Tea to your exact specification with counter-sample evaluation.`
- **Issue:** Brand name `"Shivom Global Trade"` is completely absent from the snippet that Google displays in Search SERPs.
- **Recommended Description:** `Shivom Global Trade is an India-based tea sourcing and export company supplying Assam CTC, Orthodox, Darjeeling and Green Tea to international buyers.`

### Issue H-03: Open Graph and Twitter Card Inconsistencies
- **Location:** [`index.html:11-27`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/index.html#L11-L27)
- **Current Behavior:** `og:url` and `og:image` reference `https://shivom-global-website.vercel.app/`. While the image filename is `Shivom%20Global%20Trade.png`, the social title and site name omit `Trade`.

---

## 4. Medium-Priority Improvements

### Issue M-01: H1 Headline Semantic Balance
- **Location:** [`src/features/hero/components/HeroSection.tsx:68`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/src/features/hero/components/HeroSection.tsx#L68)
- **Current H1:** `Source the Indian Tea You Need`
- **Assessment:** While compelling as a B2B conversion headline, having no brand mention or primary commercial category (`Indian Tea Exporter & Supplier`) in the primary H1 leaves search engine crawlers relying entirely on the eyebrow badge and paragraph text.

### Issue M-02: Missing Alternate Names in Schema.org
- **Location:** [`index.html:36-37`](file:///Users/sarthak/SHIVOM%20GLOBAL%20WEBSITE/index.html#L36-L37)
- **Assessment:** Adding `"alternateName": ["Shivom Global", "Shivom Global Trade India"]` into the `Organization` schema ensures that queries for both `Shivom Global` and `Shivom Global Trade` map to the same Google entity.

---

## 5. Technical SEO Audit Breakdown

| Parameter | Observed Status | Status | Evidence / Note |
| :--- | :--- | :--- | :--- |
| **HTTPS Support** | Enabled | PASS | Valid SSL/TLS certificate via Vercel Edge. |
| **WWW vs Non-WWW** | 308 Permanent Redirect | PASS | `https://shivomglobaltrade.com/` redirects cleanly to `https://www.shivomglobaltrade.com/`. |
| **HTTP to HTTPS** | 308 Permanent Redirect | PASS | Port 80 requests redirect to Port 443 immediately. |
| **Robots.txt HTTP Status** | 200 OK | PASS | Accessible at `/robots.txt`. |
| **Robots.txt Content** | Misconfigured URL | FAIL | Sitemap URL points to `.vercel.app`. |
| **Sitemap HTTP Status** | 200 OK | PASS | Accessible at `/sitemap.xml`. |
| **Sitemap Content** | Misconfigured `<loc>` | FAIL | `<loc>` points to `.vercel.app`. |
| **Meta Robots** | Default (Index, Follow) | PASS | No accidental `noindex` or `nofollow` directives present. |
| **Mobile Responsiveness** | Semantic Viewport Defined | PASS | `width=device-width, initial-scale=1.0` present; fluid responsive grid across viewports. |
| **Googlebot User-Agent** | 200 OK | PASS | Verified live: Googlebot receives HTTP 200 without bot blocking or challenge loops. |

