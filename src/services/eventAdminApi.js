import { authHeader } from "./authApi";

const API_BASE_URL = "http://localhost:5700";

export const getMyEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/event/all`, {
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal mengambil data event");
  return response.json();
};