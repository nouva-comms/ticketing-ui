import { Box } from "@mui/material";
import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 72;
const NAVBAR_HEIGHT = 68;

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [mobileOpen, setMobileOpen] = useState(false);

  // =========================================================
  // SIDEBAR TOGGLE
  // =========================================================

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // =========================================================
  // MOBILE SIDEBAR
  // =========================================================

  const handleOpenMobileSidebar = () => {
    setMobileOpen(true);
  };

  const handleCloseMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",

        /*
         * Jangan gunakan height: 100vh
         * pada wrapper utama.
         */
        minHeight: "auto",

        backgroundColor: "#F8F9FB",

        /*
         * PENTING:
         *
         * Tidak menggunakan:
         *
         * overflowX: "hidden"
         * overflow: "hidden"
         *
         * supaya browser tetap menggunakan
         * vertical scroll normal.
         */
      }}
    >
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        open={sidebarOpen}
        mobileOpen={mobileOpen}
        onToggle={handleToggleSidebar}
        onClose={handleCloseMobileSidebar}
      />

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar
        sidebarOpen={sidebarOpen}
        onMobileMenuClick={handleOpenMobileSidebar}
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <Box
        component="main"
        sx={{
          /*
           * ==================================================
           * WIDTH
           * ==================================================
           */

          width: {
            xs: "100%",

            md: sidebarOpen
              ? `calc(100% - ${SIDEBAR_WIDTH}px)`
              : `calc(100% - ${SIDEBAR_COLLAPSED_WIDTH}px)`,
          },

          /*
           * ==================================================
           * POSISI TERHADAP SIDEBAR
           * ==================================================
           */

          marginLeft: {
            xs: 0,

            md: sidebarOpen
              ? `${SIDEBAR_WIDTH}px`
              : `${SIDEBAR_COLLAPSED_WIDTH}px`,
          },

          /*
           * ==================================================
           * NAVBAR SPACE
           * ==================================================
           *
           * Navbar menggunakan position fixed,
           * jadi content perlu diberi jarak 68px.
           */

          paddingTop: `${NAVBAR_HEIGHT}px`,

          /*
           * ==================================================
           * HEIGHT
           * ==================================================
           *
           * Jangan menggunakan:
           *
           * height: 100vh
           *
           * Karena content dashboard bisa lebih tinggi
           * dari layar.
           */

          height: "auto",

          /*
           * ==================================================
           * OVERFLOW
           * ==================================================
           *
           * Biarkan browser menangani scroll.
           */

          overflow: "visible",

          /*
           * ==================================================
           * SIDEBAR ANIMATION
           * ==================================================
           */

          transition: "width 0.25s ease, margin-left 0.25s ease",

          boxSizing: "border-box",
        }}
      >
        {/* ===================================================
            CONTENT WRAPPER
        ==================================================== */}

        <Box
          sx={{
            width: "100%",

            maxWidth: "1600px",

            margin: "0 auto",

            /*
             * ==================================================
             * CONTENT PADDING
             * ==================================================
             */

            padding: {
              xs: 2,

              sm: 2.5,

              md: 3,

              lg: 3.5,
            },

            /*
             * ==================================================
             * HEIGHT
             * ==================================================
             */

            height: "auto",

            minHeight: "auto",

            /*
             * ==================================================
             * BOX SIZING
             * ==================================================
             */

            boxSizing: "border-box",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
