import { useMemo, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import EventFilterBar from "./EventFilterBar";
import EventCard from "./EventCard";
import PageContainer from "../../../components/layout/PageContainer";
import { EVENTS, CATEGORIES } from "../data/events";

const PAGE_SIZE = 6;

const EventsSection = ({ onRegister }) => {
  const [activeCat, setActiveCat] = useState("Semua");
  const [city, setCity] = useState("Semua Kota");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const cities = useMemo(() => [...new Set(EVENTS.map((e) => e.city))], []);

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      const matchCat = activeCat === "Semua" || e.cats.includes(activeCat);
      const matchCity = city === "Semua Kota" || e.city === city;
      return matchCat && matchCity;
    });
  }, [activeCat, city]);

  return (
    <Box id="events" sx={{ py: { xs: 6, md: 10 } }}>
      <PageContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4, flexWrap: "wrap", mb: 4 }}>
          <Box sx={{ maxWidth: 480 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "primary.main" }} />
              <Typography sx={{ fontSize: 12, letterSpacing: "0.14em", fontWeight: 600, color: "text.secondary" }}>
                KALENDER EVENT
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: 28, md: 38 }, lineHeight: 1.1 }}>
              Pilih jarak, pilih kota, lalu lari.
            </Typography>
          </Box>
          <Typography sx={{ color: "text.secondary", fontSize: 14, maxWidth: 320, mt: { md: 1 } }}>
            Setiap kartu di bawah adalah event terdaftar. Klik <b>Daftar</b> untuk langsung masuk ke formulir
            pendaftaran event tersebut.
          </Typography>
        </Box>
      </PageContainer>

      <Box
        sx={{
          position: "sticky",
          top: { xs: 58, md: 74 },
          zIndex: 40,
          bgcolor: "rgba(245,245,244,.92)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "border.main",
          py: 2,
          mb: 5,
        }}
      >
        <PageContainer>
          <EventFilterBar
            categories={CATEGORIES}
            active={activeCat}
            onChange={(cat) => {
              setActiveCat(cat);
              setVisible(PAGE_SIZE);
            }}
            cities={cities}
            city={city}
            onCityChange={(c) => {
              setCity(c);
              setVisible(PAGE_SIZE);
            }}
            resultCount={filtered.length}
          />
        </PageContainer>
      </Box>

      <PageContainer>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
            gap: 2.5,
          }}
        >
          {filtered.slice(0, visible).map((ev) => (
            <EventCard key={ev.id} event={ev} onRegister={onRegister} />
          ))}
          {filtered.length === 0 && (
            <Box
              sx={{
                gridColumn: "1 / -1",
                textAlign: "center",
                py: 8,
                color: "text.secondary",
                border: "1.5px dashed",
                borderColor: "border.main",
                borderRadius: 4,
              }}
            >
              <Typography sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>
                Belum ada event yang cocok
              </Typography>
              <Typography sx={{ fontSize: 14 }}>Coba ganti kategori atau kota pencarian kamu.</Typography>
            </Box>
          )}
        </Box>

        {visible < filtered.length && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              sx={{ textTransform: "none", color: "text.secondary", textDecoration: "underline" }}
            >
              Tampilkan Lebih Banyak
            </Button>
          </Box>
        )}
      </PageContainer>
    </Box>
  );
};

export default EventsSection;