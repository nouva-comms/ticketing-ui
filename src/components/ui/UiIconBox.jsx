import { Box } from "@mui/material";

const UiIconBox = ({
  children,
  background = "primary.background",
  color = "primary.main",
  size = 34,
  radius = "8px",
  sx = {},
  ...props
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: radius,
        backgroundColor: background,
        color: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default UiIconBox;