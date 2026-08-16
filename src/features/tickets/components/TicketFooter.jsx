import { Typography, Box } from "@mui/material";
import UiButton from "../../../components/ui/UiButton";
import UiButtonIcon from "../../../components/ui/UiButtonIcon";
import { ChevronLeft } from "lucide-react";
import UiBaseIcon from "../../../components/ui/UiBaseIcon";

const formatCurrency = (n) => `Rp${Number(n || 0).toLocaleString("id-ID")}`;

const TicketFooter = ({
  total = 0,
  onBack,
  onAction,
  actionLabel = "Lanjutkan",
}) => {
  return (
    <Box
      sx={{
        display: { xs: "block", md: "none" },
        position: "sticky",
        bottom: 0,
        backgroundColor: "#fff",
        borderTop: "1px solid",
        borderColor: "border.main",
        pt: 1.5,
        pb: 1.5,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>Total Bayar</Typography>
        <Typography sx={{ fontWeight: 700 }}>
          {formatCurrency(total)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        {onBack && (
          <UiButtonIcon active={true} size="large" bordered={true} onClick={onBack}>
            <UiBaseIcon>
              <ChevronLeft color="#032FD9"/>
            </UiBaseIcon>
          </UiButtonIcon>
        )}
        <UiButton fullWidth size="large" onClick={onAction}>
          {actionLabel}
        </UiButton>
      </Box>
    </Box>
  );
};

export default TicketFooter;
