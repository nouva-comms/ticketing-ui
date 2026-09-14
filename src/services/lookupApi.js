const API_BASE_URL = "http://localhost:5700";

export const getGenders = async () => {
  const res = await fetch(`${API_BASE_URL}/gender/all`);
  if (!res.ok) throw new Error("Gagal memuat data gender");
  return res.json(); // [{ genderId, name }]
};

export const getSizes = async () => {
  const res = await fetch(`${API_BASE_URL}/size/all`);
  if (!res.ok) throw new Error("Gagal memuat data ukuran baju");
  return res.json(); // [{ sizeId, name }]
};