/**
 * Application Constants
 * Definisi pilihan dan nilai yang sering digunakan di seluruh aplikasi
 */

// ============================================
// IDENTITY TYPES
// ============================================
export const IDENTITY_TYPES = {
  KTP: "ktp",
  SIM: "sim",
  PASSPORT: "passport",
};

export const IDENTITY_TYPE_OPTIONS = [
  { value: IDENTITY_TYPES.KTP, label: "KTP" },
  { value: IDENTITY_TYPES.SIM, label: "SIM" },
  { value: IDENTITY_TYPES.PASSPORT, label: "Paspor" },
];

// ============================================
// GENDER
// ============================================
export const GENDER = {
  MALE: "male",
  FEMALE: "female",
};

export const GENDER_OPTIONS = [
  { value: GENDER.MALE, label: "Laki-laki" },
  { value: GENDER.FEMALE, label: "Perempuan" },
];

// ============================================
// AGE RANGES
// ============================================
export const AGE_RANGES = {
  KIDS: "6-12",
  TEENAGER: "13-17",
  ADULT_YOUNG: "18-25",
  ADULT_MIDDLE: "26-35",
  ADULT_PRIME: "36-45",
  ADULT_SENIOR: "46-55",
  SENIOR_EARLY: "56-65",
  SENIOR: "66+",
};

export const AGE_OPTIONS = [
  { value: AGE_RANGES.KIDS, label: "6 - 12 Tahun" },
  { value: AGE_RANGES.TEENAGER, label: "13 - 17 Tahun" },
  { value: AGE_RANGES.ADULT_YOUNG, label: "18 - 25 Tahun" },
  { value: AGE_RANGES.ADULT_MIDDLE, label: "26 - 35 Tahun" },
  { value: AGE_RANGES.ADULT_PRIME, label: "36 - 45 Tahun" },
  { value: AGE_RANGES.ADULT_SENIOR, label: "46 - 55 Tahun" },
  { value: AGE_RANGES.SENIOR_EARLY, label: "56 - 65 Tahun" },
  { value: AGE_RANGES.SENIOR, label: "66 Tahun ke atas" },
];

// ============================================
// SHIRT SIZES
// ============================================
export const SHIRT_SIZES = {
  XS: "xs",
  S: "s",
  M: "m",
  L: "l",
  XL: "xl",
  XXL: "xxl",
};

export const SHIRT_SIZE_OPTIONS = [
  { value: SHIRT_SIZES.XS, label: "XS" },
  { value: SHIRT_SIZES.S, label: "S" },
  { value: SHIRT_SIZES.M, label: "M" },
  { value: SHIRT_SIZES.L, label: "L" },
  { value: SHIRT_SIZES.XL, label: "XL" },
  { value: SHIRT_SIZES.XXL, label: "XXL" },
];

// ============================================
// TICKET STATUS
// ============================================
export const TICKET_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

export const TICKET_STATUS_OPTIONS = [
  { value: TICKET_STATUS.PENDING, label: "Menunggu" },
  { value: TICKET_STATUS.CONFIRMED, label: "Dikonfirmasi" },
  { value: TICKET_STATUS.CANCELLED, label: "Dibatalkan" },
  { value: TICKET_STATUS.COMPLETED, label: "Selesai" },
];

// ============================================
// PAYMENT STATUS
// ============================================
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
};

export const PAYMENT_STATUS_OPTIONS = [
  { value: PAYMENT_STATUS.PENDING, label: "Menunggu" },
  { value: PAYMENT_STATUS.PROCESSING, label: "Diproses" },
  { value: PAYMENT_STATUS.COMPLETED, label: "Berhasil" },
  { value: PAYMENT_STATUS.FAILED, label: "Gagal" },
  { value: PAYMENT_STATUS.REFUNDED, label: "Kembali" },
];

// ============================================
// PAYMENT METHODS
// ============================================
export const PAYMENT_METHODS = {
  CREDIT_CARD: "credit_card",
  DEBIT_CARD: "debit_card",
  BANK_TRANSFER: "bank_transfer",
  E_WALLET: "e_wallet",
};

export const PAYMENT_METHOD_OPTIONS = [
  { value: PAYMENT_METHODS.CREDIT_CARD, label: "Kartu Kredit" },
  { value: PAYMENT_METHODS.DEBIT_CARD, label: "Kartu Debit" },
  { value: PAYMENT_METHODS.BANK_TRANSFER, label: "Transfer Bank" },
  { value: PAYMENT_METHODS.E_WALLET, label: "Dompet Digital" },
];

// ============================================
// EVENT STATUS
// ============================================
export const EVENT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const EVENT_STATUS_OPTIONS = [
  { value: EVENT_STATUS.DRAFT, label: "Konsep" },
  { value: EVENT_STATUS.PUBLISHED, label: "Dipublikasikan" },
  { value: EVENT_STATUS.ONGOING, label: "Berlangsung" },
  { value: EVENT_STATUS.COMPLETED, label: "Selesai" },
  { value: EVENT_STATUS.CANCELLED, label: "Dibatalkan" },
];

// ============================================
// USER ROLES
// ============================================
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest",
};

export const USER_ROLE_OPTIONS = [
  { value: USER_ROLES.ADMIN, label: "Admin" },
  { value: USER_ROLES.USER, label: "Pengguna" },
  { value: USER_ROLES.GUEST, label: "Tamu" },
];

// ============================================
// PAGINATION
// ============================================
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZES: [5, 10, 25, 50, 100],
};

// ============================================
// SORT ORDER
// ============================================
export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
};

// ============================================
// DATE FORMATS
// ============================================
export const DATE_FORMATS = {
  DISPLAY: "DD/MM/YYYY",
  DISPLAY_TIME: "DD/MM/YYYY HH:mm",
  ISO: "YYYY-MM-DD",
  ISO_TIME: "YYYY-MM-DDTHH:mm:ss",
};

// ============================================
// VALIDATION RULES
// ============================================
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 255,
  MIN_PHONE_LENGTH: 10,
  MAX_PHONE_LENGTH: 15,
};

// ============================================
// REGEX PATTERNS
// ============================================
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+62|0)[0-9]{9,12}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NUMERIC: /^[0-9]+$/,
};
