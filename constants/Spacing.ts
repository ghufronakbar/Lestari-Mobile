// 8pt grid spacing system for consistent layouts
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};

// Component-specific spacing
export const ComponentSpacing = {
  // Card padding
  cardPadding: Spacing.md,
  cardMargin: Spacing.sm,
  
  // Screen padding
  screenPadding: Spacing.md,
  screenPaddingHorizontal: Spacing.md,
  
  // Form elements
  inputSpacing: Spacing.md,
  buttonHeight: 48,
  
  // List items
  listItemPadding: Spacing.md,
  listItemSpacing: Spacing.sm,
};

// Border radius system
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Shadow system
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};