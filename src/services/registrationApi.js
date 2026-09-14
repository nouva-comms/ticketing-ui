const API_BASE_URL = "http://localhost:5700";

export const submitRegistration = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/participant/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Gagal menyimpan pendaftaran");
  }
  return res.json();
};