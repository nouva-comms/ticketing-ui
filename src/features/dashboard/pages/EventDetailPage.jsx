import { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getPublicCategoryDetail } from "../../../services/eventsApi";
import EventTabs from "../components/EventTabs";

const fmtIDR = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

const BulletList = ({ items = [] }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {items.map((item, i) => {
      const [head, ...rest] = item.split(":");
      const hasHead = rest.length > 0;
      return (
        <Box key={i} sx={{ display: "flex", gap: 1.2 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0, mt: "7px" }} />
          <Typography sx={{ fontSize: 13.5, lineHeight: 1.7, color: "text.secondary" }}>
            {hasHead ? (
              <>
                <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
                  {head}:
                </Box>
                {rest.join(":")}
              </>
            ) : (
              item
            )}
          </Typography>
        </Box>
      );
    })}
  </Box>
);

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getPublicCategoryDetail(id)
      .then(setCategory)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notFound || !category) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>Kategori tidak ditemukan</Typography>
        <Button onClick={() => navigate("/")} sx={{ textTransform: "none" }}>
          ← Kembali ke beranda
        </Button>
      </Box>
    );
  }

  const handleRegisterClick = () => {
    navigate("/tickets/create", {
      state: {
        ticketCategoryId: category.id,
        eventName: category.name,
        categoryName: category.categoryName,
        price: category.price,
        dateRange: category.dateRange,
        time: category.time,
        venue: category.venue,
      },
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#EDEEF0", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 430,
          bgcolor: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: { xs: "none", sm: "0 0 40px rgba(0,0,0,0.08)" },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            src={category.image || "/images/runEvent.jpg"}
            alt={category.name}
            sx={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
          />
          <Box
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(4px)",
            }}
          >
            <ArrowLeft size={18} />
          </Box>
        </Box>

        <Box sx={{ flex: 1, px: 2.5, pt: 3 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 22, mb: 0.5 }}>{category.name}</Typography>
          <Typography sx={{ fontSize: 13, color: "primary.main", fontWeight: 700, mb: 2 }}>
            Kategori {category.categoryName}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, color: "primary.main" }}>
              <Calendar size={17} />
              <Typography sx={{ fontSize: 13.5, color: "text.primary" }}>{category.date}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, color: "primary.main" }}>
              <MapPin size={17} style={{ marginTop: 2, flexShrink: 0 }} />
              <Typography sx={{ fontSize: 13.5, color: "text.primary" }}>{category.venue}</Typography>
            </Box>
          </Box>

          <EventTabs active={tab} onChange={setTab} />

          <Box sx={{ pt: 3 }}>
            {tab === 0 && (
              <Typography sx={{ fontSize: 13.5, lineHeight: 1.8, color: "text.secondary" }}>
                {category.description || "Belum ada deskripsi untuk kategori ini."}
              </Typography>
            )}
            {tab === 1 && (
              <BulletList items={category.terms.length ? category.terms : ["Belum ada syarat & ketentuan."]} />
            )}
            {tab === 2 && (
              <BulletList items={category.facilities.length ? category.facilities : ["Belum ada informasi fasilitas."]} />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            bgcolor: "#fff",
            borderTop: "1px solid",
            borderColor: "border.main",
            px: 2.5,
            py: 2,
            mt: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{fmtIDR(category.price)}</Typography>
          <Button
            onClick={handleRegisterClick}
            variant="contained"
            sx={{
              borderRadius: 100,
              textTransform: "none",
              px: 4,
              py: 1,
              fontWeight: 700,
              bgcolor: "primary.main",
              boxShadow: "none",
              "&:hover": { bgcolor: "#021F8F", boxShadow: "none" },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EventDetailPage;