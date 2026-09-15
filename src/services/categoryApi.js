import { authHeader } from "./authApi";

const API_BASE_URL = "https://satchel-hatchling-cardiac.ngrok-free.dev";

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

export const getCategoryById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/ticket-category/${id}`, {
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal mengambil detail category");
  return response.json();
};

export const updateCategoryDetails = async (id, dto) => {
  const response = await fetch(`${API_BASE_URL}/ticket-category/${id}`, {
    method: "PATCH",
    headers: jsonHeaders(),
    body: JSON.stringify(dto),
  });
  if (!response.ok) throw new Error("Gagal memperbarui category");
  return response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${API_BASE_URL}/ticket-category/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal menghapus category");
};

export const getCategoryTerms = async (ticketCategoryId) => {
  const response = await fetch(
    `${API_BASE_URL}/category-terms-condition/by-ticket-category?ticketCategoryId=${ticketCategoryId}`,
    { headers: { ...authHeader() } }
  );
  if (!response.ok) throw new Error("Gagal mengambil syarat & ketentuan");
  return response.json();
};

export const deleteCategoryTerm = async (catTermsConditionId) => {
  await fetch(`${API_BASE_URL}/category-terms-condition/delete/${catTermsConditionId}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
};

export const getCategoryFacilities = async (ticketCategoryId) => {
  const response = await fetch(
    `${API_BASE_URL}/category-facility/by-ticket-category?ticketCategoryId=${ticketCategoryId}`,
    { headers: { ...authHeader() } }
  );
  if (!response.ok) throw new Error("Gagal mengambil fasilitas");
  return response.json();
};

export const deleteCategoryFacility = async (categoryFacilityId) => {
  await fetch(`${API_BASE_URL}/category-facility/delete/${categoryFacilityId}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
};