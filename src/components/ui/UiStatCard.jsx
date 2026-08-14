import { Box, Typography } from "@mui/material";
import UiCard from "./UiCard";
import UiIconBox from "./UiIconBox";

const UiStatCard = ({ title, value, description, icon, iconBackground, valueFontSize }) => {
  return (
    <UiCard minHeight={118} sx={{ py: 1.75, position: "relative" }}>
      <Box sx={{ position: "absolute", top: 14, right: 14 }}>
        <UiIconBox background={iconBackground} color="primary.main" size={34}>
          {icon}
        </UiIconBox>
      </Box>

      <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "text.secondary", pr: 5 }}>
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 0.55,
          fontSize: valueFontSize || { xs: "23px", sm: "24px", md: "25px" },
          fontWeight: 700,
          lineHeight: 1.2,
          color: "text.primary",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </Typography>

      <Typography sx={{ mt: 1, fontSize: "11px", color: "text.secondary" }}>
        {description}
      </Typography>
    </UiCard>
  );
};

export default UiStatCard;