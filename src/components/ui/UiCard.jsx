import { Box } from "@mui/material";

const UiCard = ({ children, padding = 2, minHeight, sx = {}, ...props }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: "10px",
        boxSizing: "border-box",
        p: padding,
        ...(minHeight ? { minHeight } : {}),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default UiCard;