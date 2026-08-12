import { Box, Typography, InputBase, Button } from "@mui/material";
import { Search } from "lucide-react";
import BurstIcon from "../../../components/layout/BurstIcon";
import Navbar from "../../../components/layout/Navbar";
import PageContainer from "../../../components/layout/PageContainer";

const STATS = [
  { label: "Event Aktif", value: "128" },
  { label: "Kota", value: "42" },
  { label: "Pelari Terdaftar", value: "15.200" },
];

const HeroSection = () => {
  return (
    <Box sx={{ bgcolor: "#000", position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: "-45%", md: "-6%" },
          width: { xs: 340, md: 480 },
          height: { xs: 340, md: 480 },
          transform: "translateY(-50%)",
          opacity: 0.9,
          pointerEvents: "none",
        }}
      >
        <BurstIcon fill="#0B1F8A" size="100%" />
      </Box>

      <Navbar />

      <PageContainer
        sx={{
          position: "relative",
          zIndex: 1,
          pt: { xs: "110px", md: "150px" },
          pb: { xs: "64px", md: "120px" },
        }}
      >
        <Box sx={{ maxWidth: 720 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "primary.main" }} />
            <Typography sx={{ color: "rgba(255,255,255,.6)", fontSize: 12, letterSpacing: "0.14em", fontWeight: 600 }}>
              PLATFORM PENDAFTARAN LARI
            </Typography>
          </Box>

          <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: 38, md: 62 }, lineHeight: 1.03, mb: 3 }}>
            Temukan garis{" "}
            <Box component="span" sx={{ color: "primary.main", fontStyle: "italic" }}>
              start
            </Box>
            -mu berikutnya.
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,.6)", fontSize: 15, lineHeight: 1.7, mb: 4, maxWidth: 460 }}>
            Jelajahi ratusan event lari di seluruh Indonesia — dari fun run santai di kotamu sampai trail run
            di dataran tinggi. Daftar dalam hitungan menit, bib langsung ke email.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.16)",
              borderRadius: 100,
              p: "6px 6px 6px 18px",
              maxWidth: 460,
              mb: 5,
            }}
          >
            <Search size={17} color="rgba(255,255,255,.4)" />
            <InputBase
              placeholder="Cari nama event atau kota…"
              sx={{
                flex: 1,
                color: "#fff",
                fontSize: 14,
                mx: 1.5,
                "& input::placeholder": { color: "rgba(255,255,255,.4)" },
              }}
            />
            <Button
              variant="contained"
              sx={{ borderRadius: 100, textTransform: "none", px: 3, bgcolor: "primary.main", boxShadow: "none", "&:hover": { bgcolor: "#021F8F", boxShadow: "none" } }}
            >
              Cari
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: { xs: 4, md: 6 }, borderTop: "1px solid rgba(255,255,255,.14)", pt: 3 }}>
            {STATS.map((s) => (
              <Box key={s.label}>
                <Typography sx={{ color: "#fff", fontFamily: "monospace", fontWeight: 700, fontSize: { xs: 22, md: 28 } }}>
                  {s.value}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,.45)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </PageContainer>
    </Box>
  );
};

export default HeroSection;