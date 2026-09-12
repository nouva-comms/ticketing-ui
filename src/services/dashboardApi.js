import { authHeader } from "./authApi";

const API_BASE_URL = "http://localhost:5700";

export const getDashboardData = async (eventId) => {
  const query = eventId ? `?eventId=${eventId}` : "";
  const response = await fetch(`${API_BASE_URL}/dashboard${query}`, {
    headers: { ...authHeader() },
  });

  if (!response.ok) throw new Error("Gagal mengambil data dashboard");
  return response.json();
  // { summary: {...}, overview: {...}, ticketSales: [...] }
};