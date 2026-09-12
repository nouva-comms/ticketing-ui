import { authHeader } from "./authApi";

const API_BASE_URL = "http://localhost:5700";

const jsonHeaders = () => ({
  "Content-Type": "application/json",
  ...authHeader(),
});

export const getMyCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/ticket-category`, {
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal mengambil data category");
  return response.json();
};

export const createCategory = async (dto) => {
  const response = await fetch(`${API_BASE_URL}/ticket-category/create`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(dto),
  });
  if (!response.ok) throw new Error("Gagal membuat category");
  return response.json();
};

export const addCategoryTerm = async (ticketCategoryId, description) => {
  const response = await fetch(`${API_BASE_URL}/category-terms-condition/create`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ ticketCategoryId, description }),
  });
  if (!response.ok) throw new Error("Gagal menyimpan syarat & ketentuan");
  return response.json();
};

export const addCategoryFacility = async (ticketCategoryId, facilityId) => {
  const response = await fetch(`${API_BASE_URL}/category-facility/create`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ ticketCategoryId, facilityId }),
  });
  if (!response.ok) throw new Error("Gagal menyimpan fasilitas");
  return response.json();
};