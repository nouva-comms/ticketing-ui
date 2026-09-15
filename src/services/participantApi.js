import { authHeader } from "./authApi";

const API_BASE_URL = "https://satchel-hatchling-cardiac.ngrok-free.dev";

export const getParticipantsByCategory = async (ticketCategoryId) => {
  const response = await fetch(
    `${API_BASE_URL}/participant/by-ticket-category?ticketCategoryId=${ticketCategoryId}`,
    { headers: { ...authHeader() } }
  );
  if (!response.ok) throw new Error("Gagal mengambil data partisipan");
  return response.json();
};