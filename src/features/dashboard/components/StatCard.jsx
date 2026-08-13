import { Box, Typography } from "@mui/material";

const StatCard = ({ label, value, hint }) => {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 200,
        backgroundColor: "#fff",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: 3,
        p: 2.5,
      }}
    >
      <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 28, fontWeight: 700, color: "text.primary" }}>
        {value}
      </Typography>
      {hint && (
        <Typography sx={{ fontSize: 12, color: "status.success", mt: 0.5 }}>
          {hint}
        </Typography>
      )}
    </Box>
  );
};

export default StatCard;
