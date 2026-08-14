import { useMemo } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, CreditCard, Mail } from "lucide-react";

const fmtIDR = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

const genRefId = () => {
  try {
    return crypto.randomUUID().replace(/-/g, "");
  } catch {
    return (Date.now().toString(16) + Math.random().toString(16).slice(2))
      .padEnd(32, "0")
      .slice(0, 32);
  }
};

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { buyer, items = [], total = 0 } = location.state || {};

  const refId = useMemo(() => genRefId(), []);
  const paidAt = useMemo(() => {
    const d = new Date();
    const bulan = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
    ];
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}.${pad(d.getMinutes())}`;
  }, []);

  const grandTotal = items.length ? items.reduce((sum, it) => sum + it.price * it.qty, 0) : total;
  const eventName = items[0]?.name;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F5F6FA", display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 0, sm: 3 } }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          minHeight: { xs: "100vh", sm: "auto" },
          borderRadius: { xs: 0, sm: 4 },
          background: "linear-gradient(160deg, #E7EBFB 0%, #FFFFFF 55%, #F3F6FF 100%)",
          border: { xs: "none", sm: "1px solid" },
          borderColor: "border.main",
          boxShadow: { xs: "none", sm: "0 20px 50px -20px rgba(3,47,217,.25)" },
          p: { xs: 3.5, sm: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "#00C875",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2.5,
          }}
        >
          <Check size={28} color="#fff" strokeWidth={3} />
        </Box>

        <Typography sx={{ fontWeight: 800, fontSize: 24, color: "primary.main", mb: 1 }}>
          Pembayaran Berhasil!
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.6, mb: 3, maxWidth: 300 }}>
          {eventName
            ? `Pendaftaran kamu untuk "${eventName}" sudah kami terima.`
            : "Pendaftaran kamu sudah kami terima."}
        </Typography>

        <Divider sx={{ width: "100%", mb: 2.5 }} />

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, textAlign: "left" }}>
          <Box>
            <Typography sx={{ fontSize: 11.5, color: "text.secondary", mb: 0.5 }}>Status</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#00C875" }} />
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Berhasil</Typography>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontSize: 11.5, color: "text.secondary", mb: 0.5 }}>Tanggal</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{paidAt}</Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: 11.5, color: "text.secondary", mb: 0.5 }}>Ref ID</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 12.5, wordBreak: "break-all", color: "primary.main" }}>
              {refId}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: 11.5, color: "text.secondary", mb: 0.5 }}>Total Bayar</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{fmtIDR(grandTotal)}</Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: 11.5, color: "text.secondary", mb: 0.8 }}>Metode Pembayaran</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                bgcolor: "primary.background",
                borderRadius: 2.5,
                p: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 1.5,
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CreditCard size={18} color="#fff" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>Transfer Bank</Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Virtual Account</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            bgcolor: "#F0F4FF",
            borderRadius: 2.5,
            p: 1.5,
            mt: 3,
            width: "100%",
            textAlign: "left",
          }}
        >
          <Mail size={16} color="#032FD9" style={{ marginTop: 2, flexShrink: 0 }} />
          <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.6 }}>
            Bukti pembayaran ini juga akan dikirim ke email
            {buyer?.email ? <> <b>{buyer.email}</b></> : " yang kamu daftarkan"}.
          </Typography>
        </Box>

        <Button
          fullWidth
          onClick={() => navigate("/")}
          variant="contained"
          sx={{
            mt: 3,
            borderRadius: 100,
            textTransform: "none",
            py: 1.4,
            fontWeight: 700,
            bgcolor: "#0A0A0C",
            boxShadow: "none",
            "&:hover": { bgcolor: "#000", boxShadow: "none" },
          }}
        >
          Kembali ke Beranda
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSuccessPage;