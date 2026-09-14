import { authHeader } from "./authApi";

const API_BASE_URL = "http://localhost:5700";

export const getMyEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/event/all`, {
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal mengambil data event");
  return response.json();
};

export const getEventById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/event/get/${id}`, {
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal mengambil detail event");
  return response.json();
};

export const createEvent = async (dto) => {
  const response = await fetch(`${API_BASE_URL}/event/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(dto),
  });
  if (!response.ok) throw new Error("Gagal membuat event");
  return response.json();
};

export const updateEvent = async (id, dto) => {
  const response = await fetch(`${API_BASE_URL}/event/update/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(dto),
  });
  if (!response.ok) throw new Error("Gagal memperbarui event");
  return response.json();
};

export const deleteEvent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/event/delete/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!response.ok) throw new Error("Gagal menghapus event");
};