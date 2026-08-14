import { Box, LinearProgress, Typography } from "@mui/material";

const UiProgressBar = ({
  value,
  label,
  showPercentage = true,
  height = 8,
  labelPosition = "top", // "top" | "right"
}) => {
  const percentageText = `${Math.round(value)}%`;

  const bar = (
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height,
        borderRadius: "10px",
        backgroundColor: "#E6E9ED",
        "& .MuiLinearProgress-bar": {
          borderRadius: "10px",
          backgroundColor: "primary.main",
        },
      }}
    />
  );

  if (labelPosition === "right") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ flex: 1 }}>{bar}</Box>
        {showPercentage && (
          <Typography sx={{ minWidth: 34, fontSize: "10px", color: "text.secondary", textAlign: "right" }}>
            {percentageText}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box>
      {(label || showPercentage) && (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
          {label && <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>{label}</Typography>}
          {showPercentage && (
            <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "text.primary" }}>
              {percentageText}
            </Typography>
          )}
        </Box>
      )}
      {bar}
    </Box>
  );
};

export default UiProgressBar;