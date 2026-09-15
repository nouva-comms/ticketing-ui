import { authHeader } from "./authApi";

const API_BASE_URL = "https://satchel-hatchling-cardiac.ngrok-free.dev";

export const getFacilities = async () => {
  const response = await fetch(`${API_BASE_URL}/facility/all`, {
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal mengambil data fasilitas");
  return response.json(); // [{ facilityId, name }]
};

export const createFacility = async (name) => {
  const facilityId =
    "FAC-" +
    name
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const response = await fetch(`${API_BASE_URL}/facility/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ facilityId, name }),
  });

  if (!response.ok) {
    if (response.status === 409) throw new Error("Fasilitas dengan nama serupa sudah ada.");
    throw new Error("Gagal menambahkan fasilitas");
  }
  return response.json();
};

export const deleteFacility = async (facilityId) => {
  const response = await fetch(`${API_BASE_URL}/facility/delete/${facilityId}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal menghapus fasilitas");
};