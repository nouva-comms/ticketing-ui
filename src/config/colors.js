/**
 * Color Palette Configuration
 * Definisi warna yang digunakan di seluruh aplikasi
 */

// ============================================
// PRIMARY COLORS
// ============================================
export const PRIMARY_COLORS = {
  MAIN: "#0066CC",
  LIGHT: "#E6F2FF",
  DARK: "#0052A3",
  HOVER: "#0055B3",
};

// ============================================
// SECONDARY COLORS
// ============================================
export const SECONDARY_COLORS = {
  MAIN: "#6C5CE7",
  LIGHT: "#F0EBFC",
  DARK: "#5541D0",
};

// ============================================
// SUCCESS COLORS
// ============================================
export const SUCCESS_COLORS = {
  MAIN: "#27AE60",
  LIGHT: "#E8F8F5",
  DARK: "#1E8449",
};

// ============================================
// ERROR COLORS
// ============================================
export const ERROR_COLORS = {
  MAIN: "#E74C3C",
  LIGHT: "#FADBD8",
  DARK: "#C0392B",
};

// ============================================
// WARNING COLORS
// ============================================
export const WARNING_COLORS = {
  MAIN: "#F39C12",
  LIGHT: "#FCF3E6",
  DARK: "#D68910",
};

// ============================================
// INFO COLORS
// ============================================
export const INFO_COLORS = {
  MAIN: "#3498DB",
  LIGHT: "#EBF5FB",
  DARK: "#2874A6",
};

// ============================================
// NEUTRAL COLORS
// ============================================
export const NEUTRAL_COLORS = {
  // White shades
  WHITE: "#FFFFFF",
  
  // Gray shades
  GRAY_50: "#F9FAFB",
  GRAY_100: "#F3F4F6",
  GRAY_200: "#E5E7EB",
  GRAY_300: "#D1D5DB",
  GRAY_400: "#9CA3AF",
  GRAY_500: "#6B7280",
  GRAY_600: "#4B5563",
  GRAY_700: "#374151",
  GRAY_800: "#1F2937",
  GRAY_900: "#111827",
  
  // Black
  BLACK: "#000000",
};

// ============================================
// TEXT COLORS
// ============================================
export const TEXT_COLORS = {
  PRIMARY: "#1F2937", // Dark gray for main text
  SECONDARY: "#6B7280", // Medium gray for secondary text
  TERTIARY: "#9CA3AF", // Light gray for tertiary text
  MUTED: "#D1D5DB", // Very light gray for muted text
  INVERSE: "#FFFFFF", // White for text on dark backgrounds
};

// ============================================
// BACKGROUND COLORS
// ============================================
export const BACKGROUND_COLORS = {
  PRIMARY: "#FFFFFF",
  SECONDARY: "#F9FAFB",
  TERTIARY: "#F3F4F6",
  OVERLAY: "rgba(0, 0, 0, 0.5)",
};

// ============================================
// BORDER COLORS
// ============================================
export const BORDER_COLORS = {
  LIGHT: "#E5E7EB",
  MAIN: "#D1D5DB",
  DARK: "#9CA3AF",
  FOCUS: "#0066CC",
};

// ============================================
// STATUS COLORS
// ============================================
export const STATUS_COLORS = {
  SUCCESS: "#27AE60",
  ERROR: "#E74C3C",
  WARNING: "#F39C12",
  INFO: "#3498DB",
  PENDING: "#F39C12",
  PROCESSING: "#3498DB",
  COMPLETED: "#27AE60",
  CANCELLED: "#E74C3C",
};

// ============================================
// OPACITY LEVELS
// ============================================
export const OPACITY = {
  DISABLED: 0.5,
  HOVER: 0.8,
  FOCUS: 0.9,
  ACTIVE: 1,
  OVERLAY_LIGHT: 0.3,
  OVERLAY_MEDIUM: 0.5,
  OVERLAY_DARK: 0.7,
};

// ============================================
// COLOR UTILITIES
// ============================================
export const getColorWithOpacity = (color, opacity) => {
  if (!color.startsWith("rgb")) {
    // Convert hex to rgb
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

export const getStatusColor = (status) => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case "active":
    case "completed":
    case "success":
    case "approved":
      return STATUS_COLORS.SUCCESS;
    case "inactive":
    case "cancelled":
    case "error":
    case "failed":
    case "rejected":
      return STATUS_COLORS.ERROR;
    case "pending":
    case "draft":
      return STATUS_COLORS.PENDING;
    case "processing":
    case "ongoing":
    case "paused":
      return STATUS_COLORS.PROCESSING;
    default:
      return STATUS_COLORS.INFO;
  }
};
