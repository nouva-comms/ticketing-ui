/**
 * Application Messages
 * Pesan dan label yang digunakan di seluruh aplikasi
 */

// ============================================
// VALIDATION MESSAGES
// ============================================
export const VALIDATION_MESSAGES = {
  FIELD_REQUIRED: "Field ini wajib diisi",
  INVALID_EMAIL: "Format email tidak valid",
  INVALID_PHONE: "Nomor telepon tidak valid",
  INVALID_URL: "URL tidak valid",
  MIN_LENGTH: (min) => `Minimal ${min} karakter`,
  MAX_LENGTH: (max) => `Maksimal ${max} karakter`,
  INVALID_FORMAT: "Format tidak valid",
  PASSWORD_MISMATCH: "Password tidak sesuai",
  WEAK_PASSWORD: "Password terlalu lemah. Gunakan kombinasi huruf, angka, dan simbol",
  FILE_TOO_LARGE: (maxSize) => `File terlalu besar. Maksimal ${maxSize}MB`,
  INVALID_FILE_TYPE: "Tipe file tidak didukung",
};

// ============================================
// FORM LABELS
// ============================================
export const FORM_LABELS = {
  // Personal
  FULL_NAME: "Nama Lengkap",
  EMAIL: "Email",
  PHONE: "Nomor Telepon",
  WHATSAPP: "No. WhatsApp",
  IDENTITY_TYPE: "Tipe Identitas",
  IDENTITY_NUMBER: "Nomor Identitas",
  GENDER: "Jenis Kelamin",
  AGE: "Usia",
  ADDRESS: "Alamat",
  CITY: "Kota",
  PROVINCE: "Provinsi",
  COUNTRY: "Negara",

  // Ticket
  TICKET_NAME: "Nama Tiket",
  TICKET_CATEGORY: "Kategori Tiket",
  TICKET_PRICE: "Harga Tiket",
  TICKET_QUANTITY: "Jumlah Tiket",
  TICKET_STATUS: "Status Tiket",

  // Event
  EVENT_TITLE: "Judul Event",
  EVENT_DESCRIPTION: "Deskripsi Event",
  EVENT_DATE: "Tanggal Event",
  EVENT_TIME: "Waktu Event",
  EVENT_LOCATION: "Lokasi Event",
  EVENT_STATUS: "Status Event",

  // Payment
  PAYMENT_METHOD: "Metode Pembayaran",
  PAYMENT_AMOUNT: "Jumlah Pembayaran",
  PAYMENT_STATUS: "Status Pembayaran",
  CARD_NUMBER: "Nomor Kartu",
  CARD_HOLDER: "Nama Pemegang Kartu",
  CARD_EXPIRY: "Berlaku Sampai",
  CARD_CVV: "CVV",

  // Auth
  USERNAME: "Nama Pengguna",
  PASSWORD: "Password",
  CONFIRM_PASSWORD: "Konfirmasi Password",
  OLD_PASSWORD: "Password Lama",
  NEW_PASSWORD: "Password Baru",
  REMEMBER_ME: "Ingat saya",

  // Other
  SEARCH: "Cari",
  FILTER: "Filter",
  SORT: "Urutkan",
  SUBMIT: "Kirim",
  CANCEL: "Batal",
  SAVE: "Simpan",
  DELETE: "Hapus",
  EDIT: "Edit",
  VIEW: "Lihat",
  ADD: "Tambah",
  BACK: "Kembali",
  NEXT: "Selanjutnya",
  PREVIOUS: "Sebelumnya",
  CONTINUE: "Lanjutkan",
};

// ============================================
// ACTION BUTTONS
// ============================================
export const ACTION_BUTTONS = {
  LOGIN: "Masuk",
  LOGOUT: "Keluar",
  REGISTER: "Daftar",
  SIGN_UP: "Buat Akun",
  SUBMIT: "Kirim",
  SAVE: "Simpan",
  UPDATE: "Perbarui",
  DELETE: "Hapus",
  CANCEL: "Batal",
  CONFIRM: "Konfirmasi",
  YES: "Ya",
  NO: "Tidak",
  OK: "OK",
  CLOSE: "Tutup",
  CONTINUE: "Lanjutkan",
  BACK: "Kembali",
  NEXT: "Selanjutnya",
  PREVIOUS: "Sebelumnya",
  SKIP: "Lewati",
  CLEAR: "Hapus Semua",
  RESET: "Reset",
  APPLY: "Terapkan",
  DOWNLOAD: "Unduh",
  UPLOAD: "Unggah",
};

// ============================================
// CONFIRMATION MESSAGES
// ============================================
export const CONFIRMATION_MESSAGES = {
  DELETE_ITEM: (itemName) => `Apakah Anda yakin ingin menghapus ${itemName}?`,
  LOGOUT_CONFIRM: "Apakah Anda yakin ingin keluar?",
  UNSAVED_CHANGES: "Anda memiliki perubahan yang belum disimpan. Lanjutkan tanpa menyimpan?",
  CANCEL_CONFIRM: "Apakah Anda yakin ingin membatalkan?",
};

// ============================================
// EMPTY STATE MESSAGES
// ============================================
export const EMPTY_STATE_MESSAGES = {
  NO_DATA: "Tidak ada data",
  NO_TICKETS: "Tidak ada tiket",
  NO_EVENTS: "Tidak ada event",
  NO_PAYMENTS: "Tidak ada pembayaran",
  NO_USERS: "Tidak ada pengguna",
  NO_RESULTS: "Tidak ada hasil yang ditemukan",
  NO_NOTIFICATIONS: "Tidak ada notifikasi",
  EMPTY_LIST: "Daftar kosong",
};

// ============================================
// PLACEHOLDER TEXTS
// ============================================
export const PLACEHOLDERS = {
  SEARCH: "Cari...",
  ENTER_NAME: "Masukkan nama...",
  ENTER_EMAIL: "Masukkan email...",
  ENTER_PHONE: "Masukkan nomor telepon...",
  ENTER_ADDRESS: "Masukkan alamat...",
  ENTER_PASSWORD: "Masukkan password...",
  CONFIRM_PASSWORD: "Konfirmasi password...",
  SELECT_OPTION: "Pilih opsi...",
  SELECT_DATE: "Pilih tanggal...",
  SELECT_TIME: "Pilih waktu...",
};

// ============================================
// LOADING MESSAGES
// ============================================
export const LOADING_MESSAGES = {
  LOADING: "Memuat...",
  SUBMITTING: "Mengirim...",
  SAVING: "Menyimpan...",
  DELETING: "Menghapus...",
  UPLOADING: "Mengunggah...",
  DOWNLOADING: "Mengunduh...",
  PROCESSING: "Memproses...",
};

// ============================================
// ERROR MESSAGES
// ============================================
export const ERROR_MESSAGES_DETAILED = {
  NETWORK_ERROR: "Terjadi kesalahan jaringan. Silakan periksa koneksi Anda dan coba lagi.",
  SERVER_ERROR: "Terjadi kesalahan server. Silakan hubungi administrator.",
  TIMEOUT: "Permintaan timeout. Silakan coba lagi.",
  UNAUTHORIZED: "Anda tidak memiliki akses. Silakan login kembali.",
  FORBIDDEN: "Anda tidak diizinkan mengakses resource ini.",
  NOT_FOUND: "Resource tidak ditemukan.",
  CONFLICT: "Data yang Anda masukkan sudah ada.",
  VALIDATION_ERROR: "Data yang Anda masukkan tidak valid.",
  DUPLICATE_EMAIL: "Email sudah terdaftar.",
  INVALID_CREDENTIALS: "Email atau password salah.",
  SESSION_EXPIRED: "Sesi Anda telah berakhir. Silakan login kembali.",
  PAYMENT_FAILED: "Pembayaran gagal. Silakan coba lagi.",
  INSUFFICIENT_BALANCE: "Saldo tidak mencukupi.",
};

// ============================================
// SUCCESS MESSAGES
// ============================================
export const SUCCESS_MESSAGES_DETAILED = {
  LOGIN_SUCCESS: "Login berhasil! Selamat datang.",
  LOGOUT_SUCCESS: "Logout berhasil. Sampai jumpa lagi!",
  REGISTER_SUCCESS: "Pendaftaran berhasil! Silakan login.",
  CREATE_SUCCESS: "Data berhasil dibuat.",
  UPDATE_SUCCESS: "Data berhasil diperbarui.",
  DELETE_SUCCESS: "Data berhasil dihapus.",
  SAVE_SUCCESS: "Perubahan berhasil disimpan.",
  PAYMENT_SUCCESS: "Pembayaran berhasil diproses.",
  UPLOAD_SUCCESS: "File berhasil diunggah.",
  PASSWORD_CHANGED: "Password berhasil diubah.",
};

// ============================================
// DIALOG TITLES
// ============================================
export const DIALOG_TITLES = {
  CONFIRM_DELETE: "Hapus Konfirmasi",
  CONFIRM_ACTION: "Konfirmasi",
  ERROR: "Terjadi Kesalahan",
  SUCCESS: "Berhasil",
  WARNING: "Peringatan",
  INFO: "Informasi",
};

// ============================================
// TABS & SECTIONS
// ============================================
export const TABS = {
  OVERVIEW: "Ringkasan",
  DETAILS: "Detail",
  SETTINGS: "Pengaturan",
  HISTORY: "Riwayat",
  PARTICIPANTS: "Peserta",
  PAYMENTS: "Pembayaran",
  TICKETS: "Tiket",
  EVENTS: "Event",
  PROFILE: "Profil",
  SECURITY: "Keamanan",
};

// ============================================
// STATUS LABELS
// ============================================
export const STATUS_LABELS = {
  ACTIVE: "Aktif",
  INACTIVE: "Tidak Aktif",
  PENDING: "Menunggu",
  PROCESSING: "Diproses",
  COMPLETED: "Selesai",
  FAILED: "Gagal",
  CANCELLED: "Dibatalkan",
  APPROVED: "Disetujui",
  REJECTED: "Ditolak",
  DRAFT: "Konsep",
  PUBLISHED: "Dipublikasikan",
  ONGOING: "Berlangsung",
  PAUSED: "Dijeda",
  ARCHIVED: "Diarsipkan",
};

// ============================================
// TIME & DATE
// ============================================
export const DATE_TIME_LABELS = {
  TODAY: "Hari Ini",
  YESTERDAY: "Kemarin",
  TOMORROW: "Besok",
  THIS_WEEK: "Minggu Ini",
  LAST_WEEK: "Minggu Lalu",
  THIS_MONTH: "Bulan Ini",
  LAST_MONTH: "Bulan Lalu",
  THIS_YEAR: "Tahun Ini",
  LAST_YEAR: "Tahun Lalu",
  ALL_TIME: "Semua Waktu",
};

// ============================================
// HELP & INFO MESSAGES
// ============================================
export const HELP_MESSAGES = {
  PASSWORD_REQUIREMENTS: "Password harus minimal 8 karakter dengan kombinasi huruf besar, huruf kecil, angka, dan simbol.",
  PHONE_FORMAT: "Nomor telepon harus dimulai dengan kode negara atau 0 dan terdiri dari 10-15 digit.",
  FILE_SIZE_INFO: "File maksimal 5MB. Format yang didukung: jpg, png, pdf, doc, docx.",
};
