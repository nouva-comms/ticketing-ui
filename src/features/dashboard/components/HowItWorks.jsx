import { Box, Typography } from "@mui/material";
import PageContainer from "../../../components/layout/PageContainer";

const STEPS = [
  { km: "0K", title: "Jelajahi Event", desc: "Filter berdasarkan jarak, kota, atau tanggal sampai ketemu event yang pas." },
  { km: "5K", title: "Pilih Kategori", desc: "Tentukan jarak lomba dan jumlah peserta langsung dari kartu event." },
  { km: "10K", title: "Isi Data & Bayar", desc: "Lengkapi data diri, pilih ukuran jersey, selesaikan pembayaran." },
  { km: "FIN", title: "Bukti Pembayaran", desc: "E-ticket dan nomor bib otomatis dikirim ke email kamu." },
];

const HowItWorks = () => {
  return (
    <Box id="cara-kerja" sx={{ bgcolor: "#000", color: "#fff", py: { xs: 6, md: 10 } }}>
      <PageContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4, flexWrap: "wrap", mb: 6 }}>
          <Box sx={{ maxWidth: 480 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "primary.main" }} />
              <Typography sx={{ fontSize: 12, letterSpacing: "0.14em", fontWeight: 600, color: "rgba(255,255,255,.5)" }}>
                CARA KERJA
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: 28, md: 38 }, lineHeight: 1.1 }}>
              Dari klik pertama sampai garis finish.
            </Typography>
          </Box>
          <Typography sx={{ color: "rgba(255,255,255,.5)", fontSize: 14, maxWidth: 300, mt: { md: 1 } }}>
            Empat checkpoint sederhana persis seperti split lari sungguhan.
          </Typography>
        </Box>

        <Box sx={{ position: "relative", display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 4 }}>
          <Box sx={{ position: "absolute", top: 20, left: 0, right: 0, height: 2, bgcolor: "rgba(255,255,255,.15)", display: { xs: "none", md: "block" } }} />
          {STEPS.map((s) => (
            <Box key={s.km} sx={{ position: "relative", zIndex: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: 12,
                  mb: 2,
                }}
              >
                {s.km}
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.7 }}>{s.title}</Typography>
              <Typography sx={{ color: "rgba(255,255,255,.5)", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</Typography>
            </Box>
          ))}
        </Box>
      </PageContainer>
    </Box>
  );
};

export default HowItWorks;