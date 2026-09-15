import { authHeader } from "./authApi";
import { fetchApi } from "./fetchWithNgrokBypass";

const API_BASE_URL = "https://episode-dosage-unmovable.ngrok-free.dev";

const jsonHeaders = () => ({
  "Content-Type": "application/json",
  ...authHeader(),
});

export const getEventImages = async (eventId) => {
  const response = await fetchApi(`${API_BASE_URL}/event-information-image/by-eventid?eventId=${eventId}`, {
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal mengambil galeri foto");
  return response.json();
};

export const addEventImage = async (dto) => {
  const response = await fetchApi(`${API_BASE_URL}/event-information-image`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(dto),
  });
  if (!response.ok) throw new Error("Gagal menambahkan foto");
  return response.json();
};

export const deleteEventImage = async (eventInfoImageId) => {
  const response = await fetchApi(`${API_BASE_URL}/event-information-image/delete/${eventInfoImageId}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal menghapus foto");
};