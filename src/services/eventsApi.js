import { fetchApi } from "./fetchWithNgrokBypass";
const API_BASE_URL = "https://episode-dosage-unmovable.ngrok-free.dev";

const computeStatus = (startDate) => (new Date(startDate) > new Date() ? "COMMING SOON" : "OPEN");

const normalizeCard = (event, category) => ({
  id: category.ticketCategoryId,
  name: event.title,
  description: category.description,
  date: new Date(event.startDate).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  venue: event.location,
  city: "",
  image: category.base64 || null,
  status: computeStatus(event.startDate),
  cats: [category.title],
  price: Number(category.price),
});

export const getPublicEvents = async () => {
  const eventsRes = await fetchApi(`${API_BASE_URL}/event/all`);
  if (!eventsRes.ok) throw new Error("Gagal memuat daftar event");
  const events = await eventsRes.json();

  const nested = await Promise.all(
    events.map(async (ev) => {
      const catRes = await fetchApi(`${API_BASE_URL}/ticket-category/by-eventid?eventId=${ev.eventId}`);
      const categories = catRes.ok ? await catRes.json() : [];
      return categories.map((cat) => normalizeCard(ev, cat));
    })
  );

  return nested.flat();
};

export const getPublicCategoryDetail = async (ticketCategoryId) => {
  const [catRes, termsRes, facilitiesRes] = await Promise.all([
    fetchApi(`${API_BASE_URL}/ticket-category/${ticketCategoryId}`),
    fetchApi(`${API_BASE_URL}/category-terms-condition/by-ticket-category?ticketCategoryId=${ticketCategoryId}`),
    fetchApi(`${API_BASE_URL}/category-facility/by-ticket-category?ticketCategoryId=${ticketCategoryId}`),
  ]);

  if (!catRes.ok) throw new Error("Kategori tidak ditemukan");

  const category = await catRes.json();
  const terms = termsRes.ok ? await termsRes.json() : [];
  const facilities = facilitiesRes.ok ? await facilitiesRes.json() : [];

  const fmtDate = (iso) => new Date(iso).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  const fmtTime = (iso) => new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return {
    id: category.ticketCategoryId,
    eventId: category.eventId,
    name: category.event.title,
    categoryName: category.title,
    date: fmtDate(category.event.startDate),
    dateRange: `${fmtDate(category.event.startDate)} - ${fmtDate(category.event.endDate)}`,
    time: `${fmtTime(category.event.startDate)} - ${fmtTime(category.event.endDate)}`,
    venue: category.event.location,
    city: "",
    image: category.base64 || null,
    price: Number(category.price),
    description: category.description,
    terms: terms.map((t) => t.description),
    facilities: facilities.map((f) => f.facility?.name || f.facilityId),
  };
};