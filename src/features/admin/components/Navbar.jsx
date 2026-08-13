import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu as MenuIcon,
  Search,
  Settings,
  UserRound,
} from "lucide-react";

import { useState } from "react";

import UiButtonIcon from "../../../components/ui/UiButtonIcon";
import UiBaseIcon from "../../../components/ui/UiBaseIcon";

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 72;
const NAVBAR_HEIGHT = 68;

const Navbar = ({ sidebarOpen = true, onMobileMenuClick }) => {
  const [profileAnchor, setProfileAnchor] = useState(null);

  const profileMenuOpen = Boolean(profileAnchor);

  const handleOpenProfile = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setProfileAnchor(null);
  };

  const handleProfileClick = () => {
    handleCloseProfile();

    console.log("My Profile");
  };

  const handleSettingsClick = () => {
    handleCloseProfile();

    console.log("Settings");
  };

  const handleLogout = () => {
    handleCloseProfile();

    console.log("Logout");

    /*
     * Nanti implementasi logout:
     *
     * localStorage.removeItem("token");
     * navigate("/login");
     */
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: NAVBAR_HEIGHT,

          backgroundColor: "#FFFFFF",

          color: "text.primary",

          borderBottom: "1px solid",

          borderColor: "border.main",

          left: {
            xs: 0,

            md: sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
          },

          width: {
            xs: "100%",

            md: sidebarOpen
              ? `calc(100% - ${SIDEBAR_WIDTH}px)`
              : `calc(100% - ${SIDEBAR_COLLAPSED_WIDTH}px)`,
          },

          transition: "left 0.25s ease, width 0.25s ease",

          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            height: NAVBAR_HEIGHT,

            minHeight: `${NAVBAR_HEIGHT}px !important`,

            px: {
              xs: 1.5,
              sm: 2,
              md: 2.5,
            },

            gap: 1.5,
          }}
        >
          {/* =================================================
              MOBILE MENU
          ================================================== */}
          <Box
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <UiButtonIcon title="Open menu" onClick={onMobileMenuClick}>
              <MenuIcon size={21} />
            </UiButtonIcon>
          </Box>

          {/* =================================================
              PAGE TITLE
          ================================================== */}
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",

                fontWeight: 700,

                color: "text.primary",

                lineHeight: 1.2,
              }}
            >
              Dashboard
            </Typography>

            <Typography
              sx={{
                fontSize: "11px",

                color: "text.secondary",

                mt: 0.35,
              }}
            >
              Ticketing Management System
            </Typography>
          </Box>

          {/* MOBILE TITLE */}
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },

              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",

                fontWeight: 700,
              }}
            >
              Dashboard
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* =================================================
              SEARCH
          ================================================== */}
          <TextField
            placeholder="Search..."
            size="small"
            sx={{
              display: {
                xs: "none",
                md: "block",
              },

              width: {
                md: 180,
                lg: 230,
              },

              "& .MuiOutlinedInput-root": {
                height: 36,

                borderRadius: "8px",

                backgroundColor: "#F8F9FB",
              },

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "border.main",
              },

              "& .MuiInputBase-input": {
                fontSize: "12px",
              },

              "& .MuiInputBase-input::placeholder": {
                color: "text.secondary",

                opacity: 1,
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} color="#626C7A" />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* =================================================
              NOTIFICATION
          ================================================== */}
          <UiButtonIcon title="Notifications" bordered>
            <Badge
              badgeContent={4}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "status.danger",

                  color: "#FFFFFF",

                  fontSize: "8px",

                  minWidth: 15,

                  height: 15,

                  padding: 0,
                },
              }}
            >
              <Bell size={18} />
            </Badge>
          </UiButtonIcon>

          {/* Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: 30,

              alignSelf: "center",

              mx: 0.5,
            }}
          />

          {/* =================================================
              PROFILE BUTTON
          ================================================== */}
          <Box
            onClick={handleOpenProfile}
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 1,

              cursor: "pointer",

              px: 0.5,

              py: 0.5,

              borderRadius: "9px",

              "&:hover": {
                backgroundColor: "rgba(98,108,122,0.06)",
              },
            }}
          >
            <Avatar
              sx={{
                width: 34,

                height: 34,

                borderRadius: "9px",

                backgroundColor: "primary.main",

                fontSize: "11px",

                fontWeight: 700,
              }}
            >
              AD
            </Avatar>

            <Box
              sx={{
                display: {
                  xs: "none",
                  lg: "block",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",

                  fontWeight: 600,

                  lineHeight: 1.3,

                  color: "text.primary",
                }}
              >
                Administrator
              </Typography>

              <Typography
                sx={{
                  fontSize: "11px",

                  color: "text.secondary",

                  mt: 0.2,
                }}
              >
                Super Admin
              </Typography>
            </Box>

            <ChevronDown size={15} color="#626C7A" />
          </Box>
        </Toolbar>
      </AppBar>

      {/* =====================================================
          PROFILE DROPDOWN
      ====================================================== */}
      <Menu
        anchorEl={profileAnchor}
        open={profileMenuOpen}
        onClose={handleCloseProfile}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            elevation: 0,

            sx: {
              mt: 1,

              width: 220,

              borderRadius: "12px",

              border: "1px solid",

              borderColor: "border.main",

              boxShadow: "0 8px 30px rgba(14, 13, 53, 0.10)",

              overflow: "hidden",
            },
          },
        }}
      >
        {/* USER HEADER */}
        <Box
          sx={{
            px: 2,

            py: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",

              fontWeight: 600,

              color: "text.primary",
            }}
          >
            Administrator
          </Typography>

          <Typography
            sx={{
              fontSize: "11px",

              color: "text.secondary",

              mt: 0.25,
            }}
          >
            admin@ticketing.com
          </Typography>
        </Box>

        <Divider />

        {/* MY PROFILE */}
        <MenuItem
          onClick={handleProfileClick}
          sx={{
            minHeight: 42,

            gap: 1.25,

            px: 1.75,

            fontSize: "13px",

            color: "text.primary",

            "&:hover": {
              backgroundColor: "rgba(3,47,217,0.05)",
            },
          }}
        >
          <UiBaseIcon variant="default" active={false}>
            <UserRound size={17} />
          </UiBaseIcon>
          My Profile
        </MenuItem>

        {/* SETTINGS */}
        <MenuItem
          onClick={handleSettingsClick}
          sx={{
            minHeight: 42,

            gap: 1.25,

            px: 1.75,

            fontSize: "13px",

            color: "text.primary",

            "&:hover": {
              backgroundColor: "rgba(3,47,217,0.05)",
            },
          }}
        >
          <UiBaseIcon variant="default" active={false}>
            <Settings size={17} />
          </UiBaseIcon>
          Settings
        </MenuItem>

        <Divider />

        {/* LOGOUT */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            minHeight: 42,

            gap: 1.25,

            px: 1.75,

            fontSize: "13px",

            color: "status.danger",

            "&:hover": {
              backgroundColor: "rgba(244,67,54,0.06)",
            },
          }}
        >
          <UiBaseIcon variant="default" active={false}>
            <LogOut size={17} />
          </UiBaseIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
