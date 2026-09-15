import { fetchApi } from "./fetchWithNgrokBypass";
const API_BASE_URL = "https://satchel-hatchling-cardiac.ngrok-free.dev"; // sesuaikan ke alamat backend kamu

const TOKEN_KEY = "nouva_admin_token";

export const loginAdmin = async (email, password) => {
  const response = await fetchApi(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Email atau password salah");
  }

  const data = await response.json(); // { access_token }
  localStorage.setItem(TOKEN_KEY, data.access_token);
  return data.access_token;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const logoutAdmin = () => localStorage.removeItem(TOKEN_KEY);

export const isLoggedIn = () => !!getToken();

// Dipakai semua pemanggilan API admin lain nanti — otomatis sisipkan token
export const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};