/**
 * Sada-e-Kisan Design System
 * Engineered for sunlight readability in outdoor agricultural environments
 * and high-contrast accessibility for low-literacy users.
 */

export const Colors = {
  // Surfaces & Backgrounds
  canvas: '#FAF6F0',          // Warm Ivory Sand
  surface: '#EAE0D5',         // Soft Earth Linen
  surfaceElevated: '#FFFFFF', // Pure Elevated Card Surface

  // Brand & Interactive Colors
  primary: '#1B4332',         // Deep Forest Green
  accent: '#8D4925',          // Rich Cognac

  // Typography
  textPrimary: '#2B2D42',     // Charcoal Slate
  textSecondary: '#5C677D',   // Muted Slate
  textInverse: '#FAF6F0',     // Light text on dark buttons/headers

  // Semantic Indicators
  healthy: '#2D6A4F',         // Healthy Crop / Verified
  warning: '#D97706',         // Moderate Severity / Review Needed
  critical: '#C85A32',        // Critical Disease / Error

  // Borders & Dividers
  border: '#D6CCC2',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 14,
  lg: 20,
  full: 9999,
} as const;

export const Accessibility = {
  touchTargetMin: 48, // Minimum 48x48dp touch target
} as const;

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  borderRadius: BorderRadius,
  accessibility: Accessibility,
} as const;

export default Theme;
