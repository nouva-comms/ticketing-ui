import { Box, Typography, InputBase, Button } from "@mui/material";
import Logo from "./Logo";
import PageContainer from "./PageContainer";

const LINK_COLUMNS = [
  { title: "JELAJAHI", links: ["Semua Event", "Cara Kerja", "Komunitas"] },
  { title: "BANTUAN", links: ["Pusat Bantuan", "Kebijakan Refund", "Hubungi Kami"] },
];

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#000", color: "#fff", pt: { xs: 6, md: 8 } }}>
      <PageContainer>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            justifyContent: "space-between",
            pb: 5,
            borderBottom: "1px solid rgba(255,255,255,.1)",
          }}
        >
{/* Test */}
          <Box sx={{ maxWidth: 260 }}>
            <Box
              component="img"
              src="/images/logoWhite.png"
              alt="Nouva Running"
              sx={{ height: 36, width: "auto", display: "block" }}
            />
            <Typography sx={{ color: "rgba(255,255,255,.5)", fontSize: 13, lineHeight: 1.6, mt: 2 }}>
              Platform pendaftaran event lari menghubungkan pelari dan penyelenggara di seluruh Indonesia.
            </Typography>
          </Box>

          {LINK_COLUMNS.map((col) => (
            <Box key={col.title}>
              <Typography sx={{ fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,.4)", mb: 2 }}>
                {col.title}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.3 }}>
                {col.links.map((l) => (
                  <Typography
                    key={l}
                    component="a"
                    href="#"
                    sx={{
                      fontSize: 13.5,
                      color: "rgba(255,255,255,.75)",
                      textDecoration: "none",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {l}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}

          <Box sx={{ maxWidth: 260 }}>
            <Typography sx={{ fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,.4)", mb: 2 }}>
              JANGAN KETINGGALAN START
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <InputBase
                placeholder="Alamat email"
                sx={{
                  bgcolor: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.16)",
                  borderRadius: 100,
                  px: 2,
                  fontSize: 13,
                  color: "#fff",
                  flex: 1,
                  "& input::placeholder": { color: "rgba(255,255,255,.4)" },
                }}
              />
              <Button
                variant="contained"
                sx={{ borderRadius: 100, textTransform: "none", bgcolor: "primary.main", boxShadow: "none", "&:hover": { bgcolor: "#021F8F", boxShadow: "none" } }}
              >
                Kirim
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1, py: 3 }}>
          <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
            © 2026 Nouva Running. Semua hak dilindungi.
          </Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
            Dibuat untuk pelari, oleh pelari.
          </Typography>
        </Box>
      </PageContainer>
    </Box>
  );
};

export default Footer;