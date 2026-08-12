import { Box } from "@mui/material";
import BurstIcon from "./BurstIcon";

const Logo = ({ onDark = false, size = 38 }) => {
  const iconBg = onDark ? "#fff" : "#032FD9";
  const markFill = onDark ? "#032FD9" : "#fff";
  const textColor = onDark ? "#fff" : "#0E0D35";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: "30%",
          bgcolor: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <BurstIcon fill={markFill} size={size * 0.58} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 0.95 }}>
        <Box component="span" sx={{ fontSize: 11, letterSpacing: "0.22em", fontWeight: 500, color: textColor }}>
          NOUVA
        </Box>
        <Box component="span" sx={{ fontSize: 16, fontWeight: 800, fontStyle: "italic", color: textColor }}>
          RUNNING
        </Box>
      </Box>
    </Box>
  );
};

export default Logo;
