# SEO Verification Checklist — SHIVOM GLOBAL TRADE

Use this checklist during post-implementation verification to ensure the website passes all Google Search Essentials requirements before deployment.

---

## 1. Technical HTTP & Canonical Checks

- [ ] **HTTP 200 Status:** `curl -sI https://www.shivomglobaltrade.com/` returns `HTTP/2 200`.
- [ ] **Apex to WWW Redirect:** `curl -sI https://shivomglobaltrade.com/` returns `308 Permanent Redirect` to `https://www.shivomglobaltrade.com/`.
- [ ] **HTTP to HTTPS Redirect:** `curl -sI http://www.shivomglobaltrade.com/` returns `308 Permanent Redirect` to `https://www.shivomglobaltrade.com/`.
- [ ] **Canonical Tag:** `<link rel="canonical" href="https://www.shivomglobaltrade.com/" />` is rendered in `<head>`.
- [ ] **Zero Noindex Directives:** No `<meta name="robots" content="noindex">` or HTTP `X-Robots-Tag: noindex`.

---

## 2. Crawler Access & Sitemap Checks

- [ ] **Robots.txt Accessible:** `https://www.shivomglobaltrade.com/robots.txt` returns `HTTP 200`.
- [ ] **Robots.txt Sitemap URL:** Explicitly points to `https://www.shivomglobaltrade.com/sitemap.xml`.
- [ ] **XML Sitemap Accessible:** `https://www.shivomglobaltrade.com/sitemap.xml` returns `HTTP 200`.
- [ ] **XML Sitemap Validity:** Contains valid `<loc>https://www.shivomglobaltrade.com/</loc>` with updated `<lastmod>`.
- [ ] **Googlebot Simulation:** `curl -sL -A "Googlebot/2.1"` returns `200 OK` with full HTML payload.

---

## 3. On-Page SEO & Metadata Checks

- [ ] **Page Title:** `<title>Shivom Global Trade | Indian Tea Exporter &amp; Supplier</title>` (53 characters — optimal length).
- [ ] **Meta Description:** Matches exact brand and commercial scope without truncation or ellipsis.
- [ ] **OpenGraph URL & Image:** Points to `https://www.shivomglobaltrade.com/`.
- [ ] **OpenGraph Title:** References `Shivom Global Trade | Indian Tea Exporter & Supplier`.
- [ ] **Single H1 Tag:** Only one `<h1>` present on the page (`HeroSection.tsx`).

---

## 4. Structured Data (Schema.org JSON-LD) Checks

- [ ] **Schema Type:** `Organization` and `WebSite` present in `@graph`.
- [ ] **Schema URLs:** Both `@id` and `url` match `https://www.shivomglobaltrade.com/`.
- [ ] **Brand Name:** `name` is `"Shivom Global Trade"`.
- [ ] **Alternate Names:** Includes `"SHIVOM GLOBAL"`, `"Shivom Global Trade India"`.
- [ ] **Statutory Integrity:** Legal name, GSTIN (`24KWEPS2703C1ZQ`), address (`Bhavnagar, Gujarat, India`), and telephone (+91 97370 30437) are authentic and uncompromised.
- [ ] **Rich Results Test:** Validates with 0 errors on Google Rich Results validator.

---

## 5. Build, Regression & Functional Checks

- [ ] **TypeScript Build:** `npm run build` succeeds with zero errors.
- [ ] **FOUC Prevention:** Inline critical CSS and empty `#root` remain intact.
- [ ] **Contact Form / WhatsApp Flow:** WhatsApp links, inquiry modals, and grade selection function seamlessly.

