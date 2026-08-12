import { useEffect, useState } from "react";
import { Box, Button, IconButton, Drawer } from "@mui/material";
import { Menu as MenuIcon, X } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "./Logo";
import PageContainer from "./PageContainer";

const NAV_LINKS = [
  { label: "Event", href: "#events" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Untuk Penyelenggara", href: "#penyelenggara" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        bgcolor: scrolled ? "rgba(0,0,0,.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: "1px solid",
        borderColor: scrolled ? "rgba(255,255,255,.08)" : "transparent",
        transition: "all .4s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <PageContainer
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: scrolled ? 1.5 : 2.5,
          transition: "padding .4s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <Box component={RouterLink} to="/" sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src="/images/logoWhite.png"
            alt="Nouva Running"
            sx={{ height: 36, width: "auto", display: "block" }}
          />
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 4 }}>
          {NAV_LINKS.map((link) => (
            <Box
              key={link.href}
              component="a"
              href={link.href}
              sx={{
                color: "rgba(255,255,255,.75)",
                fontSize: 14,
                textDecoration: "none",
                "&:hover": { color: "#fff" },
              }}
            >
              {link.label}
            </Box>
          ))}
        </Box>

        <Button
          href="#events"
          variant="contained"
          sx={{
            display: { xs: "none", md: "inline-flex" },
            bgcolor: "primary.main",
            borderRadius: 100,
            textTransform: "none",
            px: 3,
            boxShadow: "none",
            "&:hover": { bgcolor: "#021F8F", boxShadow: "none" },
          }}
        >
          Jelajahi Event
        </Button>

        <IconButton
          onClick={() => setOpen(true)}
          sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
          aria-label="Buka menu"
        >
          <MenuIcon size={22} />
        </IconButton>
      </PageContainer>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <IconButton onClick={() => setOpen(false)} sx={{ alignSelf: "flex-end" }} aria-label="Tutup menu">
            <X size={20} />
          </IconButton>
          {NAV_LINKS.map((link) => (
            <Box
              key={link.href}
              component="a"
              href={link.href}
              onClick={() => setOpen(false)}
              sx={{ fontSize: 15, textDecoration: "none", color: "text.primary", fontWeight: 500 }}
            >
              {link.label}
            </Box>
          ))}
          <Button
            href="#events"
            onClick={() => setOpen(false)}
            variant="contained"
            sx={{ borderRadius: 100, textTransform: "none", boxShadow: "none" }}
          >
            Jelajahi Event
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;