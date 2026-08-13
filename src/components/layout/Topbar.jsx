import { Box, Typography, Avatar } from "@mui/material";

const Topbar = ({ title }) => {
  return (
    <Box
      component="header"
      sx={{
        height: 72,
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "border.main",
        backgroundColor: "#fff",
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 20, color: "text.primary" }}>
        {title}
      </Typography>
      <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: 14 }}>
        NR
      </Avatar>
    </Box>
  );
};

export default Topbar;
