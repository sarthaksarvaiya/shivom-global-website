/**
 * SHIVOM GLOBAL — Brand Assets Configuration
 * 
 * Centralized branding reference for the application.
 * 
 * NOTE: Old logos have been removed. Awaiting new logo design from user.
 * 
 * STRICT IMAGE REQUIREMENTS FOR NEW LOGO:
 * - Formats: PNG or JPEG only.
 * - Do NOT use SVG or vector files.
 * - Do NOT use temporary or alternative designs.
 * 
 * HOW TO INTEGRATE NEW LOGO ONCE PROVIDED:
 * 1. Place the new logo image file into /public/images/branding/ (e.g. /public/images/branding/logo.png)
 * 2. Set `logoPath: '/images/branding/logo.png'` below.
 * 3. Both Header and Footer will automatically display the new logo.
 *    When `logoPath` is empty (''), an elegant text brandmark is displayed as fallback.
 */

export interface BrandConfig {
  /** Commercial trading name */
  name: string;
  /** Legal entity name */
  legalName: string;
  /** Primary business tagline */
  tagline: string;
  /** High-end luxury micro-tagline for typographic brandmark */
  subTagline: string;
  /** 
   * Path to the primary logo image (relative to /public, e.g. '/images/branding/logo.png')
   * Keep empty string ('') until the new PNG or JPEG logo is provided.
   */
  logoPath: string;
  /** Accessible alt text for the logo */
  logoAlt: string;
  /** Optional launcher/favicon icon path (PNG/JPEG) */
  faviconPath: string;
}

export const BRAND_CONFIG: BrandConfig = {
  name: 'Shivom Global Trade',
  legalName: 'SHIVOM GLOBAL',
  tagline: 'Indian Tea Sourcing & Export',
  subTagline: 'INDIAN TEA EXPORTERS',
  // Active primary luxury brandmark (PNG format)
  logoPath: '/images/branding/logo.png',
  logoAlt: 'SHIVOM GLOBAL — Indian Tea Sourcing & Export',
  // Active Google Search compliant favicon (48x48 PNG)
  faviconPath: '/favicon-48x48.png',
};
