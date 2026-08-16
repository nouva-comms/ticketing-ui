import { Box, Typography, Divider } from "@mui/material";
import { ShoppingBag, ChevronLeft } from "lucide-react";
import UiButton from "./UiButton";
import UiButtonIcon from "./UiButtonIcon";

const formatCurrency = (n) =>
  `Rp${Number(n || 0).toLocaleString("id-ID")}`;

const UiSummaryCard = ({
  title = "Rincian Pesanan",
  items = [],
  actionLabel = "Lanjutkan",
  onAction,
  onBack,
  disabled = false,
  loading = false,
}) => {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const total = subtotal;

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "border.main",
        backgroundColor: "#F7F9FC",
        borderRadius: "12px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ShoppingBag size={18} color="#032FD9" />
        <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          border: "1px solid",
          borderColor: "border.main",
          borderRadius: "10px",
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {items.map((it) => (
          <Box key={it.name}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              {it.name}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                x{it.qty}
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                {formatCurrency(it.price)}
              </Typography>
            </Box>
          </Box>
        ))}

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
            Subtotal
          </Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            {formatCurrency(subtotal)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 700 }}>Total Bayar</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {formatCurrency(total)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        {onBack && (
          <UiButtonIcon active={true} size="large" bordered onClick={onBack} title="Kembali">
            <ChevronLeft color="#032FD9"/>
          </UiButtonIcon>
        )}
        <UiButton
          fullWidth
          size="large"
          disabled={disabled}
          loading={loading}
          onClick={onAction}
        >
          {actionLabel}
        </UiButton>
      </Box>
    </Box>
  );
};

export default UiSummaryCard;