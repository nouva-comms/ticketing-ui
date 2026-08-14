import { Box, Typography } from "@mui/material";
import { ChevronRight, Check } from "lucide-react";

const UiStepper = ({ steps = [], activeStep = 0 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "flex-start", sm: "center" },
        gap: { xs: 0.75, sm: 1.5 },
        backgroundColor: "primary.main",
        color: "#fff",
        px: { xs: 1.5, sm: 3 },
        py: 1.25,
        overflowX: "auto",
      }}
    >
      {steps.map((step, index) => {
        const isDone = index < activeStep;
        const isActive = index === activeStep;
        return (
          <Box
            key={step.label}
            sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, sm: 1.5 }, flexShrink: 0 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "12px",
                  fontWeight: 600,
                  backgroundColor: isActive || isDone ? "#fff" : "transparent",
                  color: isActive || isDone ? "primary.main" : "#fff",
                  border: isActive || isDone ? "none" : "1px solid rgba(255,255,255,0.6)",
                }}
              >
                {isDone ? <Check size={13} /> : index + 1}
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: "nowrap",
                  opacity: isActive || isDone ? 1 : 0.75,
                }}
              >
                {step.label}
              </Typography>
            </Box>
            {index < steps.length - 1 && (
              <ChevronRight size={16} style={{ opacity: 0.7, flexShrink: 0 }} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default UiStepper;