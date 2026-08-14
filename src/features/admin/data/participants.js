export const PARTICIPANTS = [
  { id: 1, eventId: "demo", name: "Andi Prasetyo", email: "andi.prasetyo@email.com", phone: "081234567890", category: "10K", registeredAt: "12 Agu 2026, 14.20", status: "Terkonfirmasi" },
  { id: 2, eventId: "demo", name: "Rina Wulandari", email: "rina.wulandari@email.com", phone: "082198765432", category: "5K", registeredAt: "13 Agu 2026, 09.05", status: "Terkonfirmasi" },
  { id: 3, eventId: "demo", name: "Fajar Nugraha", email: "fajar.nugraha@email.com", phone: "085711223344", category: "10K", registeredAt: "13 Agu 2026, 16.42", status: "Menunggu Pembayaran" },
  { id: 4, eventId: "demo", name: "Dewi Anggraini", email: "dewi.anggraini@email.com", phone: "081345566778", category: "Half Marathon", registeredAt: "14 Agu 2026, 08.15", status: "Terkonfirmasi" },
  { id: 5, eventId: "demo", name: "Bima Setiawan", email: "bima.setiawan@email.com", phone: "089977665544", category: "5K", registeredAt: "14 Agu 2026, 10.30", status: "Dibatalkan" },
  { id: 6, eventId: "demo", name: "Citra Lestari", email: "citra.lestari@email.com", phone: "081122334455", category: "10K", registeredAt: "14 Agu 2026, 11.58", status: "Terkonfirmasi" },
];

export const getParticipantsByEventId = (eventId) => {
  // Hanya peserta yang statusnya sudah "Terkonfirmasi" (sudah bayar) yang ditampilkan.
  const confirmed = PARTICIPANTS.filter((p) => p.status === "Terkonfirmasi");

  const matched = confirmed.filter((p) => String(p.eventId) === String(eventId));

  // Fallback: karena id event dari localStorage sifatnya dinamis, tampilkan semua
  // peserta terkonfirmasi (contoh) biar halaman tetap bisa di-preview.
  return matched.length ? matched : confirmed;
};