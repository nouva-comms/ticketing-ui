import { authHeader } from "./authApi";
import { fetchApi } from "./fetchWithNgrokBypass";

const API_BASE_URL = "https://satchel-hatchling-cardiac.ngrok-free.dev";

export const getDashboardData = async (eventId) => {
  const query = eventId ? `?eventId=${eventId}` : "";
  const response = await fetchApi(`${API_BASE_URL}/dashboard${query}`, {
    headers: { ...authHeader() },
  });

  if (!response.ok) throw new Error("Gagal mengambil data dashboard");
  return response.json();
  // { summary: {...}, overview: {...}, ticketSales: [...] }
};