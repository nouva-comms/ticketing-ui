import { Box } from "@mui/material";

const PageContainer = ({ children, sx = {}, ...props }) => (
  <Box
    sx={{
      maxWidth: 1240,
      mx: "auto",
      px: { xs: 2, md: 6 },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

export default PageContainer;