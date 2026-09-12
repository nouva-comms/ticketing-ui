import { authHeader } from "./authApi";

const API_BASE_URL = "http://localhost:5700";

export const getFacilities = async () => {
  const response = await fetch(`${API_BASE_URL}/facility/all`, {
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal mengambil data fasilitas");
  return response.json(); // [{ facilityId, name }]
};