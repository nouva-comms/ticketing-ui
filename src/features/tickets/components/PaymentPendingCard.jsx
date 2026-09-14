import { Box, Typography, Divider, CircularProgress, Button, IconButton } from "@mui/material";
import { Clock, RefreshCw, Download } from "lucide-react";

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

const PaymentPendingCard = ({ eventName, qrisPayload, loading, secondsLeft, expired, onRefresh }) => {
  const qrUrl = qrisPayload
    ? `https://api.qrserver.com/v1/create-qr-code/?size=280x280&format=jpg&data=${encodeURIComponent(qrisPayload)}`
    : null;

  const handleDownload = async () => {
    if (!qrUrl) return;
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "qris-pembayaran.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Gagal download QR:", err);
    }
  };

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
          {loading || !qrUrl ? (
            <Box sx={{ width: 220, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress size={28} />
            </Box>
          ) : expired ? (
            <Box
              sx={{
                width: 220,
                height: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                bgcolor: "#F7F8FA",
                borderRadius: 2,
              }}
            >
              <IconButton
                onClick={onRefresh}
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "primary.main",
                  color: "#fff",
                  "&:hover": { bgcolor: "#021F8F" },
                }}
              >
                <RefreshCw size={24} />
              </IconButton>
              <Typography sx={{ fontSize: 12.5, color: "text.secondary", textAlign: "center" }}>
                QR sudah tidak berlaku.
                <br />
                Klik untuk buat ulang.
              </Typography>
            </Box>
          ) : (
            <Box
              component="img"
              src={qrUrl}
              alt="QR Code pembayaran"
              sx={{ width: 220, height: 220, borderRadius: 2 }}
            />
          )}
        </Box>

        {!expired && qrUrl && typeof secondsLeft === "number" && (
          <Typography sx={{ fontSize: 12.5, textAlign: "center", color: "text.secondary", mb: 2 }}>
            QR berlaku selama{" "}
            <Typography component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
              {formatTime(secondsLeft)}
            </Typography>
          </Typography>
        )}

        {!expired && qrUrl && (
          <Button
            fullWidth
            onClick={handleDownload}
            startIcon={<Download size={16} />}
            variant="outlined"
            sx={{
              borderRadius: 100,
              textTransform: "none",
              py: 1,
              fontWeight: 600,
              mb: 2,
              borderColor: "border.main",
              color: "text.primary",
              "&:hover": { borderColor: "primary.main", color: "primary.main" },
            }}
          >
            Download QR (JPG)
          </Button>
        )}

        <Typography sx={{ fontSize: 11, color: "text.secondary", textAlign: "center", mb: 2 }}>
          Scan pakai aplikasi e-wallet/mobile banking apa pun yang mendukung QRIS
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentPendingCard;