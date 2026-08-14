import { Typography, Box } from "@mui/material";
import UiButton from "../../../components/ui/UiButton";

const formatCurrency = (n) => `Rp${Number(n || 0).toLocaleString("id-ID")}`;

const TicketFooter = ({ total = 0, onAction, actionLabel = "Lanjutkan" }) => {
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
        <Typography sx={{ fontWeight: 700 }}>{formatCurrency(total)}</Typography>
      </Box>
      <UiButton fullWidth size="large" onClick={onAction}>
        {actionLabel}
      </UiButton>
    </Box>
  );
};

export default TicketFooter;