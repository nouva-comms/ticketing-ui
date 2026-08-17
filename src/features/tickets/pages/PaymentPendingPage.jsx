import { QRCodeSVG } from "qrcode.react";
import { Box, Typography, Divider, Button, CircularProgress } from "@mui/material";
import { Clock } from "lucide-react";

const PaymentPendingCard = ({ eventName, qrisPayload, loading, onConfirm }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 2, md: 5 } }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "#fff",
          borderRadius: 4,
          border: "1px solid",
          borderColor: "border.main",
          boxShadow: "0 20px 50px -20px rgba(3,47,217,.25)",
          p: { xs: 3, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 22, color: "primary.main" }}>
            Menunggu Pembayaran
          </Typography>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "#F4D03F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Clock size={22} color="#fff" />
          </Box>
        </Box>

        <Typography sx={{ fontSize: 13, color: "text.secondary", textAlign: "center", lineHeight: 1.6, mb: 2.5 }}>
          {eventName
            ? `Pendaftaran kamu untuk "${eventName}" sudah kami terima.`
            : "Pendaftaran kamu sudah kami terima."}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          {loading || !qrisPayload ? (
            <Box sx={{ width: 220, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress size={28} />
            </Box>
          ) : (
            <QRCodeSVG value={qrisPayload} size={220} />
          )}
        </Box>

        <Typography sx={{ fontSize: 11, color: "text.secondary", textAlign: "center", mb: 3 }}>
          Scan pakai aplikasi e-wallet/mobile banking apa pun yang mendukung QRIS
        </Typography>

        <Button
          fullWidth
          onClick={onConfirm}
          variant="contained"
          disabled={loading || !qrisPayload}
          sx={{
            borderRadius: 100,
            textTransform: "none",
            py: 1.4,
            fontWeight: 700,
            bgcolor: "primary.main",
            boxShadow: "none",
            "&:hover": { bgcolor: "#021F8F", boxShadow: "none" },
          }}
        >
          Konfirmasi Pembayaran
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPendingCard;