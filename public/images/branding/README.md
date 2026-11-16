# Brand Image Assets Directory

This folder is reserved for the new SHIVOM GLOBAL branding assets.

## Strict Image Requirements
- **Accepted Formats:** PNG (`.png`) or JPEG (`.jpg`, `.jpeg`) only.
- **Prohibited Formats:** SVG (`.svg`) or vector files are strictly NOT permitted.
- **Color Profile:** RGB / sRGB.
- **Transparency:** PNG with transparent background is recommended for header and footer placement.

## Asset Placement Guide
1. **Header & Footer Logo:**
   - Suggested filename: `logo.png`
   - Recommended resolution: 400px–800px width with transparent background.
   - Activate by setting `logoPath: '/images/branding/logo.png'` in `src/constants/branding.ts`.

2. **Launcher / Favicon Icon:**
   - Suggested filename: `favicon.png`
   - Recommended resolution: 192×192px or 512×512px PNG square.
   - Activate in `index.html` via `<link rel="icon" type="image/png" href="/images/branding/favicon.png" />`.

3. **Social Sharing / OpenGraph Image:**
   - Suggested filename: `og-brand.jpg` or `og-brand.png`
   - Recommended resolution: 1200×630px.
