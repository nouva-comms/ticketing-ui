import { useState, useEffect } from "react";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  LayoutDashboard,
  CalendarDays,
  Plus,
  Ticket,
  Users,
  BarChart3,
  Banknote,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import UiButtonIcon from "../../../components/ui/UiButtonIcon";
import UiBaseIcon from "../../../components/ui/UiBaseIcon";
import { useNavigate, useLocation } from "react-router-dom";

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 72;

const Sidebar = ({ open = true, mobileOpen = false, onToggle, onClose }) => {
  /*
   * ============================================================
   * SUBMENU STATE
   * ============================================================
   */

  // Semua menu tertutup ketika pertama kali halaman dibuka.
  const [openMenus, setOpenMenus] = useState({
      tiket: false,
      laporan: false,
    });

  /*
   * ============================================================
   * ACTIVE MENU
   * ============================================================
   */

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  // Sinkronkan menu aktif & submenu terbuka sesuai URL saat ini
  useEffect(() => {
    if (location.pathname === "/admin") {
      setActiveMenu("dashboard");
    } else if (location.pathname === "/admin/kategory/create") {
      setActiveMenu("buat-category");
      setOpenMenus((prev) => ({ ...prev, tiket: true }));
    } else if (location.pathname.startsWith("/admin/kategory")) {
      setActiveMenu("semua-category");
      setOpenMenus((prev) => ({ ...prev, tiket: true }));
    } else if (location.pathname.startsWith("/admin/events")) {
      setActiveMenu("event");
    }
  }, [location.pathname]);

  /*
   * ============================================================
   * MENU DATA
   * ============================================================
   */

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      type: "single",
      path: "/admin",
    },

    {
      id: "event",
      label: "Event",
      icon: <CalendarDays size={18} />,
      type: "single",
      path: "/admin/events/kavaya-run-2026/profile",
    },

    {
      id: "tiket",
      label: "Tiket",
      icon: <Ticket size={18} />,
      type: "group",
      children: [
        {
          id: "semua-category",
          label: "Semua Category",
          path: "/admin/kategory",
        },
        {
          id: "buat-category",
          label: "Buat Category",
          icon: <Plus size={15} />,
          path: "/admin/kategory/create",
        },
      ],
    },

    {
      id: "laporan",
      label: "Laporan",
      icon: <BarChart3 size={18} />,
      type: "group",
      children: [
        {
          id: "penjualan-tiket",
          label: "Penjualan Tiket",
          icon: <Ticket size={15} />,
        },
        {
          id: "pendapatan",
          label: "Pendapatan",
          icon: <Banknote size={15} />,
        },
        {
          id: "laporan-peserta",
          label: "Peserta",
          icon: <Users size={15} />,
        },
      ],
    },
  ];

  /*
   * ============================================================
   * TOGGLE SUBMENU
   * ============================================================
   */

  const handleToggleMenu = (menuId) => {
    setOpenMenus((prev) => ({
      ...prev,

      [menuId]: !prev[menuId],
    }));
  };

  /*
   * ============================================================
   * MENU CLICK
   * ============================================================
   */

  const handleMenuClick = (menu) => {
    setActiveMenu(menu.id);

    if (menu.path) {
      navigate(menu.path);
    }
  };

  /*
   * ============================================================
   * MOBILE DRAWER
   * ============================================================
   */

  const mobileSidebar = (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,

        height: "100%",

        backgroundColor: "#FFFFFF",
      }}
    >
      {renderSidebarContent()}
    </Box>
  );

  /*
   * ============================================================
   * SIDEBAR CONTENT
   * ============================================================
   */

  function renderSidebarContent() {
    return (
      <Box
        sx={{
          height: "100%",

          display: "flex",

          flexDirection: "column",

          backgroundColor: "#FFFFFF",
        }}
      >
        {/* ====================================================
            LOGO
        ===================================================== */}

        <Box
          sx={{
            height: 68,

            minHeight: 68,

            px: open ? 1.5 : 1,

            display: "flex",

            alignItems: "center",

            justifyContent: open ? "space-between" : "center",

            borderBottom: "1px solid",

            borderColor: "border.main",
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 0.8,
            }}
          >
            <Box
              sx={{
                width: 34,

                height: 34,

                borderRadius: "8px",

                flexShrink: 0,

                backgroundColor: "primary.main",

                color: "#FFFFFF",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              <Ticket size={18} strokeWidth={2.2} />
            </Box>

            {open && (
              <Box
                sx={{
                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",

                    fontWeight: 700,

                    lineHeight: 1.1,

                    color: "text.primary",

                    whiteSpace: "nowrap",
                  }}
                >
                  Ticketing
                </Typography>

                <Typography
                  sx={{
                    mt: 0.2,

                    fontSize: "11px",

                    lineHeight: 1,

                    color: "text.secondary",

                    whiteSpace: "nowrap",
                  }}
                >
                  Event Management
                </Typography>
              </Box>
            )}
          </Box>

          {open && (
            <UiButtonIcon title="Tutup sidebar" size="small" onClick={onToggle}>
              <ChevronLeft size={16} />
            </UiButtonIcon>
          )}
        </Box>

        {/* ====================================================
            MENU
        ===================================================== */}

        <Box
          sx={{
            flex: 1,

            overflowY: "auto",

            overflowX: "hidden",

            py: 1.2,

            px: open ? 1 : 0.8,

            "&::-webkit-scrollbar": {
              width: "4px",
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#D1D9E0",

              borderRadius: "10px",
            },
          }}
        >
          <List
            disablePadding
            sx={{
              display: "flex",

              flexDirection: "column",

              gap: 0.3,
            }}
          >
            {menuItems.map((menu) => {
              /*
               * ==============================================
               * SINGLE MENU
               * ==============================================
               */

              if (menu.type === "single") {
                const isActive = activeMenu === menu.id;

                return (
                  <ListItemButton
                    key={menu.id}
                    selected={isActive}
                    onClick={() => handleMenuClick(menu)}
                    sx={{
                      minHeight: 40,

                      px: open ? 1 : 0,

                      borderRadius: "7px",

                      justifyContent: open ? "flex-start" : "center",

                      color: isActive ? "primary.main" : "text.primary",

                      backgroundColor: isActive
                        ? "primary.background"
                        : "transparent",

                      "&:hover": {
                        backgroundColor: isActive
                          ? "primary.background"
                          : "#F5F7FA",
                      },

                      "&.Mui-selected": {
                        backgroundColor: "primary.background",

                        color: "primary.main",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: open ? 32 : 0,

                        color: "inherit",

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "center",
                      }}
                    >
                      <UiBaseIcon variant="default" active={isActive}>
                        {menu.icon}
                      </UiBaseIcon>
                    </ListItemIcon>

                    {open && (
                      <ListItemText
                        primary={menu.label}
                        primaryTypographyProps={{
                          fontSize: "12.5px",

                          fontWeight: isActive ? 600 : 500,

                          whiteSpace: "nowrap",
                        }}
                      />
                    )}
                  </ListItemButton>
                );
              }

              /*
               * ==============================================
               * GROUP MENU
               * ==============================================
               */

              const isOpen = openMenus[menu.id];

              return (
                <Box key={menu.id}>
                  <ListItemButton
                    onClick={() => {
                      if (!open) {
                        onToggle?.();

                        setOpenMenus((prev) => ({
                          ...prev,

                          [menu.id]: true,
                        }));

                        return;
                      }

                      handleToggleMenu(menu.id);
                    }}
                    sx={{
                      minHeight: 40,

                      px: open ? 1 : 0,

                      borderRadius: "7px",

                      justifyContent: open ? "flex-start" : "center",

                      color: "text.primary",

                      "&:hover": {
                        backgroundColor: "#F5F7FA",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: open ? 32 : 0,

                        color: "icon.main",

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "center",
                      }}
                    >
                      <UiBaseIcon variant="default" active={false}>
                        {menu.icon}
                      </UiBaseIcon>
                    </ListItemIcon>

                    {open && (
                      <>
                        <ListItemText
                          primary={menu.label}
                          primaryTypographyProps={{
                            fontSize: "12.5px",

                            fontWeight: 500,

                            whiteSpace: "nowrap",
                          }}
                        />

                        <Box
                          sx={{
                            display: "flex",

                            alignItems: "center",

                            color: "icon.main",
                          }}
                        >
                          {isOpen ? (
                            <ChevronDown size={15} />
                          ) : (
                            <ChevronRight size={15} />
                          )}
                        </Box>
                      </>
                    )}
                  </ListItemButton>

                  {/* =========================================
                      SUBMENU
                  ========================================== */}

                  {open && isOpen && (
                    <Box
                      sx={{
                        ml: 2.2,

                        pl: 1,

                        borderLeft: "1px solid",

                        borderColor: "border.main",

                        mt: 0.15,

                        mb: 0.3,
                      }}
                    >
                      <List
                        disablePadding
                        sx={{
                          display: "flex",

                          flexDirection: "column",

                          gap: 0.15,
                        }}
                      >
                        {menu.children.map((child) => {
                          const childActive = activeMenu === child.id;

                          return (
                            <ListItemButton
                              key={child.id}
                              selected={childActive}
                              onClick={() => handleMenuClick(child)}
                              sx={{
                                minHeight: 34,

                                px: 1,

                                borderRadius: "6px",

                                color: childActive
                                  ? "primary.main"
                                  : "text.secondary",

                                backgroundColor: childActive
                                  ? "primary.background"
                                  : "transparent",

                                "&:hover": {
                                  backgroundColor: childActive
                                    ? "primary.background"
                                    : "#F5F7FA",
                                },

                                "&.Mui-selected": {
                                  backgroundColor: "primary.background",

                                  color: "primary.main",
                                },
                              }}
                            >
                              {child.icon && (
                                <ListItemIcon
                                  sx={{
                                    minWidth: 26,

                                    color: "inherit",

                                    display: "flex",

                                    alignItems: "center",
                                  }}
                                >
                                  {child.icon}
                                </ListItemIcon>
                              )}

                              <ListItemText
                                primary={child.label}
                                primaryTypographyProps={{
                                  fontSize: "11.5px",

                                  fontWeight: childActive ? 600 : 500,

                                  whiteSpace: "nowrap",
                                }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Box>
                  )}
                </Box>
              );
            })}
          </List>
        </Box>

        {/* ====================================================
            BOTTOM TOGGLE
        ===================================================== */}

        <Divider />

        <Box
          sx={{
            height: 50,

            minHeight: 50,

            display: "flex",

            alignItems: "center",

            justifyContent: open ? "flex-end" : "center",

            px: open ? 1 : 0.8,
          }}
        >
          <UiButtonIcon
            title={open ? "Tutup sidebar" : "Buka sidebar"}
            size="small"
            onClick={onToggle}
          >
            {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </UiButtonIcon>
        </Box>
      </Box>
    );
  }

  /*
   * ============================================================
   * DESKTOP SIDEBAR
   * ============================================================
   */

  return (
    <>
      <Box
        component="aside"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          position: "fixed",

          left: 0,

          top: 0,

          bottom: 0,

          width: open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,

          zIndex: 1200,

          backgroundColor: "#FFFFFF",

          borderRight: "1px solid",

          borderColor: "border.main",

          overflow: "hidden",

          transition: "width 0.25s ease",
        }}
      >
        {renderSidebarContent()}
      </Box>

      {/* ======================================================
          MOBILE SIDEBAR
      ======================================================= */}

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,

            boxSizing: "border-box",

            border: "none",
          },
        }}
      >
        {mobileSidebar}
      </Drawer>
    </>
  );
};

export default Sidebar;
