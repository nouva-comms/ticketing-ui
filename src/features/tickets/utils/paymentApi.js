import { fetchApi } from "../../../services/fetchWithNgrokBypass";
const API_BASE_URL = "http://localhost:5700";

export const createQrisPayment = async (orderId, amount) => {
  const response = await fetchApi(`${API_BASE_URL}/payments/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, amount }),
  });

  if (!response.ok) throw new Error("Gagal membuat transaksi pembayaran");
  return response.json(); // { orderId, amount, totalPayment, qrisPayload }
};

export const checkPaymentStatus = async (orderId, amount) => {
  const response = await fetchApi(
    `${API_BASE_URL}/payments/status?orderId=${orderId}&amount=${amount}`
  );
  if (!response.ok) throw new Error("Gagal cek status pembayaran");
  return response.json(); // { status: "pending" | "completed" }
};