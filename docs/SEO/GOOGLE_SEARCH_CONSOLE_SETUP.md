# Google Search Console Setup & Verification Guide — SHIVOM GLOBAL TRADE

This guide outlines the exact, step-by-step procedure to add, verify, and monitor `www.shivomglobaltrade.com` in Google Search Console (GSC).

---

## 1. Property Type Selection (Domain vs. URL Prefix)

In Google Search Console, choose **Domain property** (Recommended) or **URL prefix**:

1. **Domain Property (Recommended):**
   - Property Name: `shivomglobaltrade.com`
   - Covers: `https://www.shivomglobaltrade.com`, `https://shivomglobaltrade.com`, `http://...`, and any future subdomains.
   - Verification Method: DNS TXT Record via Domain Registrar (GoDaddy, Namecheap, Cloudflare, etc.).

2. **URL Prefix Property (Secondary/Alternative):**
   - Property Name: `https://www.shivomglobaltrade.com/`
   - Verification Method: HTML Tag in `<head>` or Google Analytics / Tag Manager.

---

## 2. DNS TXT Verification Instructions

When setting up the Domain Property:
1. Log in to your domain registrar (where `shivomglobaltrade.com` nameservers are managed).
2. Go to **DNS Management / DNS Zone Editor**.
3. Add a new record:
   - **Type:** `TXT`
   - **Host / Name:** `@` (or leave blank depending on registrar)
   - **Value:** `google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` (Copied from GSC)
   - **TTL:** `Automatic` or `300` seconds (5 minutes)
4. Save the record.
5. In Google Search Console, click **VERIFY**.

---

## 3. Sitemap Submission Procedure

Once verified:
1. Navigate to **Sitemaps** in the left sidebar of Google Search Console.
2. Under "Add a new sitemap", enter:
   ```text
   sitemap.xml
   ```
   (Full URL: `https://www.shivomglobaltrade.com/sitemap.xml`)
3. Click **Submit**.
4. Confirm the status changes to **Success** and shows 1 discovered URL.

---

## 4. Robots.txt Testing & URL Inspection

1. Navigate to the **Robots.txt Tester** or **URL Inspection** tool.
2. Enter the homepage URL:
   ```text
   https://www.shivomglobaltrade.com/
   ```
3. Press **Enter**.
4. Click **Test Live URL**.
5. Verify:
   - "URL is available to Google"
   - "Page can be indexed"
   - "User-agent: Googlebot Smartphone"
   - Canonical selected by user: `https://www.shivomglobaltrade.com/`
   - Google-selected canonical matches user-declared canonical.
6. Click **Request Indexing** to prioritize Googlebot crawling.

---

## 5. Ongoing Monitoring & Health Checks

- **Performance Tab:** Track search queries for `shivom global trade`, `shivom global`, `shivom global trade india`, impressions, clicks, CTR, and average position.
- **Page Indexing:** Ensure zero 4xx or 5xx server errors and confirm the page is in the "Indexed" category.
- **Rich Results Status:** Confirm "Organization" and "WebSite" structured data are detected without errors or warnings.

