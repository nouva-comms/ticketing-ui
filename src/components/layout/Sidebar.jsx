import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/" },
  { label: "Buat Tiket", path: "/tickets/create" },
];

const Sidebar = () => {
  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        flexShrink: 0,
        minHeight: "100vh",
        borderRight: "1px solid",
        borderColor: "border.main",
        backgroundColor: "#fff",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        py: 3,
        px: 2,
      }}
    >
      <Typography
        sx={{ fontWeight: 700, fontSize: 20, color: "primary.main", px: 1, mb: 4 }}
      >
        Nouva Ticketing
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {NAV_ITEMS.map((item) => (
          <Box
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.path === "/"}
            sx={{
              textDecoration: "none",
              borderRadius: 2,
              px: 2,
              py: 1.2,
              fontSize: 14,
              fontWeight: 500,
              color: "text.secondary",
              "&.active": {
                backgroundColor: "primary.background",
                color: "primary.main",
                fontWeight: 700,
              },
              "&:hover": { backgroundColor: "#F5F6FA" },
            }}
          >
            {item.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
