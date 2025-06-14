import { Platform } from 'react-native';

// Enhanced typography system with better hierarchy
export const Typography = {
  // Font families with fallbacks
  fontFamily: {
    regular: Platform.select({
      ios: 'Outfit-Regular',
      android: 'Outfit-Regular',
      web: 'Outfit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
    medium: Platform.select({
      ios: 'Outfit-Medium',
      android: 'Outfit-Medium', 
      web: 'Outfit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
    semiBold: Platform.select({
      ios: 'Outfit-SemiBold',
      android: 'Outfit-SemiBold',
      web: 'Outfit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
    bold: Platform.select({
      ios: 'Outfit-Bold',
      android: 'Outfit-Bold',
      web: 'Outfit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
  },
  
  // Type scale following 8pt grid system
  scale: {
    // Display text
    display: {
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    
    // Headings
    h1: {
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: -0.25,
    },
    h2: {
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
    },
    h3: {
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0,
    },
    h4: {
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0,
    },
    
    // Body text
    body: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    
    // UI text
    caption: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.25,
    },
    overline: {
      fontSize: 10,
      lineHeight: 16,
      letterSpacing: 1,
    },
  },
};

// Enhanced font style objects
export const OutfitRegular = { 
  fontFamily: Typography.fontFamily.regular,
  fontWeight: '400' as const,
};

export const OutfitMedium = { 
  fontFamily: Typography.fontFamily.medium,
  fontWeight: '500' as const,
};

export const OutfitSemiBold = { 
  fontFamily: Typography.fontFamily.semiBold,
  fontWeight: '600' as const,
};

export const OutfitBold = { 
  fontFamily: Typography.fontFamily.bold,
  fontWeight: '700' as const,
};

// Text style presets
export const TextStyles = {
  display: {
    ...OutfitBold,
    ...Typography.scale.display,
  },
  h1: {
    ...OutfitBold,
    ...Typography.scale.h1,
  },
  h2: {
    ...OutfitSemiBold,
    ...Typography.scale.h2,
  },
  h3: {
    ...OutfitSemiBold,
    ...Typography.scale.h3,
  },
  h4: {
    ...OutfitMedium,
    ...Typography.scale.h4,
  },
  body: {
    ...OutfitRegular,
    ...Typography.scale.body,
  },
  bodyMedium: {
    ...OutfitMedium,
    ...Typography.scale.body,
  },
  bodySmall: {
    ...OutfitRegular,
    ...Typography.scale.bodySmall,
  },
  caption: {
    ...OutfitRegular,
    ...Typography.scale.caption,
  },
  overline: {
    ...OutfitMedium,
    ...Typography.scale.overline,
    textTransform: 'uppercase' as const,
  },
};