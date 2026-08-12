import { Box } from "@mui/material";
import useInView from "../../hooks/useInView";

const UiSlashDivider = () => {
  const [ref, inView] = useInView(0.5);

  return (
    <Box ref={ref} sx={{ position: "relative", height: 2, bgcolor: "border.main" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "primary.main",
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 1.1s cubic-bezier(.16,1,.3,1)",
        }}
      />
    </Box>
  );
};

export default UiSlashDivider;
