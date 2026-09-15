import { authHeader } from "./authApi";
import { fetchApi } from "./fetchWithNgrokBypass";

const API_BASE_URL = "https://satchel-hatchling-cardiac.ngrok-free.dev";

export const getParticipantsByCategory = async (ticketCategoryId) => {
  const response = await fetchApi(
    `${API_BASE_URL}/participant/by-ticket-category?ticketCategoryId=${ticketCategoryId}`,
    { headers: { ...authHeader() } }
  );
  if (!response.ok) throw new Error("Gagal mengambil data partisipan");
  return response.json();
};