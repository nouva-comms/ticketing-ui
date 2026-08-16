/**
 * Application Settings
 * Konfigurasi global aplikasi seperti API endpoints, timeout, dll
 */

// ============================================
// API CONFIGURATION
// ============================================
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "https://rlhhz9pp-5700.asse.devtunnels.ms/ap",
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// ============================================
// AUTHENTICATION
// ============================================
export const AUTH_CONFIG = {
  TOKEN_KEY: "authToken",
  USER_KEY: "currentUser",
  REFRESH_TOKEN_KEY: "refreshToken",
  TOKEN_EXPIRY_KEY: "tokenExpiry",
};

// ============================================
// STORAGE CONFIGURATION
// ============================================
export const STORAGE_CONFIG = {
  USE_LOCAL_STORAGE: true,
  USE_SESSION_STORAGE: false,
  PREFIX: "nouva_", // Prefix untuk localStorage keys
};

// ============================================
// UI CONFIGURATION
// ============================================
export const UI_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  TOAST_DURATION: 3000, // 3 seconds
  DIALOG_ANIMATION_DURATION: 300, // ms
  DEBOUNCE_DELAY: 300, // ms untuk search
  THROTTLE_DELAY: 500, // ms untuk scroll/resize
};

// ============================================
// PAGINATION
// ============================================
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// ============================================
// FILE UPLOAD
// ============================================
export const FILE_UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5 MB
  ALLOWED_FORMATS: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
  UPLOAD_TIMEOUT: 60000, // 60 seconds
};

// ============================================
// CACHE CONFIGURATION
// ============================================
export const CACHE_CONFIG = {
  ENABLED: true,
  TTL: 5 * 60 * 1000, // 5 minutes
  MAX_SIZE: 50, // Maximum number of cached items
};

// ============================================
// FEATURE FLAGS
// ============================================
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: false,
  ENABLE_DEBUG_MODE: process.env.NODE_ENV === "development",
  ENABLE_ERROR_TRACKING: true,
  ENABLE_PERFORMANCE_MONITORING: false,
};

// ============================================
// API ENDPOINTS
// ============================================
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  REFRESH_TOKEN: "/auth/refresh-token",
  GET_CURRENT_USER: "/auth/me",

  // Tickets
  GET_TICKETS: "/tickets",
  GET_TICKET: "/tickets/:id",
  CREATE_TICKET: "/tickets",
  UPDATE_TICKET: "/tickets/:id",
  DELETE_TICKET: "/tickets/:id",

  // Events
  GET_EVENTS: "/events",
  GET_EVENT: "/events/:id",
  CREATE_EVENT: "/events",
  UPDATE_EVENT: "/events/:id",
  DELETE_EVENT: "/events/:id",
  GET_EVENT_PARTICIPANTS: "/events/:id/participants",

  // Users
  GET_USERS: "/users",
  GET_USER: "/users/:id",
  UPDATE_PROFILE: "/users/profile",
  CHANGE_PASSWORD: "/users/change-password",

  // Payments
  GET_PAYMENTS: "/payments",
  GET_PAYMENT: "/payments/:id",
  CREATE_PAYMENT: "/payments",
  UPDATE_PAYMENT: "/payments/:id",
  VERIFY_PAYMENT: "/payments/:id/verify",
};

// ============================================
// ROUTE PATHS
// ============================================
export const ROUTE_PATHS = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // User routes
  DASHBOARD: "/dashboard",
  EVENTS: "/events",
  EVENT_DETAIL: "/events/:id",
  TICKETS: "/tickets",
  TICKET_CREATE: "/tickets/create",
  TICKET_DETAIL: "/tickets/:id",
  PAYMENT_SUCCESS: "/tickets/payment-success",

  // Admin routes
  ADMIN_DASHBOARD: "/admin",
  ADMIN_EVENTS: "/admin/events",
  ADMIN_EVENT_CREATE: "/admin/events/create",
  ADMIN_EVENT_DETAIL: "/admin/events/:id",
  ADMIN_EVENT_PARTICIPANTS: "/admin/events/:id/participants",
};

// ============================================
// NOTIFICATION SETTINGS
// ============================================
export const NOTIFICATION_CONFIG = {
  POSITION: "top-right", // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  AUTO_CLOSE: true,
  AUTO_CLOSE_DURATION: 5000, // 5 seconds
  SHOW_PROGRESS: true,
};

// ============================================
// ERROR MESSAGES
// ============================================
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Terjadi kesalahan jaringan. Silakan coba lagi.",
  SERVER_ERROR: "Terjadi kesalahan server. Silakan hubungi administrator.",
  UNAUTHORIZED: "Anda tidak memiliki akses. Silakan login kembali.",
  FORBIDDEN: "Anda tidak diizinkan mengakses resource ini.",
  NOT_FOUND: "Resource tidak ditemukan.",
  VALIDATION_ERROR: "Data yang Anda masukkan tidak valid.",
  TIMEOUT_ERROR: "Permintaan timeout. Silakan coba lagi.",
};

// ============================================
// SUCCESS MESSAGES
// ============================================
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login berhasil!",
  LOGOUT_SUCCESS: "Logout berhasil!",
  CREATE_SUCCESS: "Data berhasil dibuat!",
  UPDATE_SUCCESS: "Data berhasil diperbarui!",
  DELETE_SUCCESS: "Data berhasil dihapus!",
  PAYMENT_SUCCESS: "Pembayaran berhasil!",
};

// ============================================
// ENVIRONMENT
// ============================================
export const ENVIRONMENT = {
  NODE_ENV: process.env.NODE_ENV,
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_STAGING: process.env.NODE_ENV === "staging",
};
