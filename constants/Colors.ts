/**
 * Modern color system with improved accessibility and visual hierarchy
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fafafa",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#11181C",
    background: "#fafafa",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
};

// Enhanced color system with semantic naming and accessibility
export const ColorSystem = {
  // Primary colors
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    500: "#3b82f6", // Your current primary
    600: "#2563eb",
    700: "#1d4ed8",
    900: "#1e3a8a",
  },
  
  // Semantic colors with better contrast
  semantic: {
    success: {
      light: "#dcfce7",
      DEFAULT: "#16a34a", // Improved from #42b968
      dark: "#15803d",
    },
    warning: {
      light: "#fef3c7",
      DEFAULT: "#d97706",
      dark: "#92400e",
    },
    error: {
      light: "#fee2e2",
      DEFAULT: "#dc2626", // Improved from #fcaea4
      dark: "#991b1b",
    },
    info: {
      light: "#dbeafe",
      DEFAULT: "#2563eb", // Improved from #8cc5ff
      dark: "#1d4ed8",
    },
  },
  
  // Neutral grays with better hierarchy
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  
  // Surface colors for cards and containers
  surface: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
  },
};

// Legacy support
export const C = {
  success: ColorSystem.semantic.success.DEFAULT,
  info: ColorSystem.semantic.info.DEFAULT,
  error: ColorSystem.semantic.error.DEFAULT,
  "1": ColorSystem.primary[500],
  "2": "#261E58",
  "3": "#0C0A1C",
  "4": "#E8E4FF",
  "5": "#B0A4FD",
};