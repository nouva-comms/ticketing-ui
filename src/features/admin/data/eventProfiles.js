// Data "Event" (profile) — sementara di-hardcode di sini.
// Nanti kalau backend/database sudah siap, fungsi getEventProfileById
// tinggal diganti isinya jadi pemanggilan API, tanpa perlu ubah halaman yang memakainya.

export const EVENT_PROFILES = [
  {
    id: "kavaya-run-2026",
    name: "Kavaya Run 2026",
    date: "18 Agustus - 28 September 2026",
    venue: "Alun-alun Engku Putri",
    city: "Kota Batam, Kepulauan Riau",
    description:
      "Kavaya Run kembali hadir sebagai salah satu agenda unggulan dalam rangkaian ASEAN Sports Day 2026. Mengusung tema \"Healthy Youth, Happy Future\", ajang sport tourism ini mengajak peserta menikmati kombinasi tantangan fisik dan suasana kota Batam.\n\nStart dan finish dipusatkan di Alun-Alun Engku Putri, dengan kuota peserta terbatas mengingat pentingnya kenyamanan dan keamanan rute.",
    image: "/images/runEvent.jpg",
    avatar: null,
    social: {
      instagram: "",
      facebook: "",
      youtube: "",
      tiktok: "",
    },
  },
  {
    id: "nouva-city-marathon-2027",
    name: "Nouva City Marathon 2027",
    date: "1 Januari 2027",
    venue: "Nagoya Hill",
    city: "Batam Centre",
    description:
      "Nouva City Marathon menandai awal tahun dengan lari bersama menyusuri jalanan utama Kota Batam. Tersedia beberapa kategori jarak untuk pelari pemula hingga berpengalaman.",
    image: "/images/runEvent.jpg",
    avatar: null,
    social: {
      instagram: "",
      facebook: "",
      youtube: "",
      tiktok: "",
    },
  },
];

export const getEventProfileById = (id) => {
  const found = EVENT_PROFILES.find((e) => String(e.id) === String(id));
  // Fallback: kalau id tidak cocok (misal masih id lama dari Tiket Kategori),
  // tampilkan data contoh pertama biar halaman tetap bisa di-preview.
  return found || EVENT_PROFILES[0];
};