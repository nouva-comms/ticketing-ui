import { Box, Typography } from "@mui/material";

const UiSummaryBox = ({ label, value, background = "#F7F8FA", valueColor = "text.primary" }) => {
  return (
    <Box sx={{ backgroundColor: background, borderRadius: "9px", p: 1.5 }}>
      <Typography sx={{ fontSize: "10px", color: "text.secondary" }}>{label}</Typography>
      <Typography sx={{ mt: 0.5, fontSize: "20px", fontWeight: 700, color: valueColor }}>
        {value}
      </Typography>
    </Box>
  );
};

export default UiSummaryBox;