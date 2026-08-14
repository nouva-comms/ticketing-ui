import { useMemo, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { EVENTS } from "../data/events";
import { getEventById as getAdminEventById } from "../../admin/utils/eventsStorage";
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

  const event = useMemo(() => {
    const dummy = EVENTS.find((e) => String(e.id) === String(id));
    if (dummy) return dummy;
    return getAdminEventById(id);
  }, [id]);

  if (!event) {
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
        <Typography sx={{ fontWeight: 700 }}>Event tidak ditemukan</Typography>
        <Button onClick={() => navigate("/")} sx={{ textTransform: "none" }}>
          ← Kembali ke beranda
        </Button>
      </Box>
    );
  }

  const handleRegisterClick = () => {
    navigate("/tickets/create", { state: { eventId: event.id } });
  };

  return (
    <Box sx={{ height: "100vh", overflow: "hidden", bgcolor: "#EDEEF0", display: "flex", justifyContent: "center" }}>
      {/* "Bingkai HP" — lebar dibatasi 430px, tinggi tetap, scroll terjadi DI DALAM frame ini */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 430,
          bgcolor: "#fff",
          height: "100vh",
          overflowY: "auto",
          scrollbarGutter: "stable",
          display: "flex",
          flexDirection: "column",
          boxShadow: { xs: "none", sm: "0 0 40px rgba(0,0,0,0.08)" },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            src={event.image || "/images/runEvent.jpg"}
            alt={event.name}
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
          <Typography sx={{ fontWeight: 800, fontSize: 22, mb: 2 }}>
            {event.name}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, color: "primary.main" }}>
              <Calendar size={17} />
              <Typography sx={{ fontSize: 13.5, color: "text.primary" }}>{event.date}</Typography>
            </Box>
            {event.time && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, color: "primary.main" }}>
                <Clock size={17} />
                <Typography sx={{ fontSize: 13.5, color: "text.primary" }}>{event.time}</Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, color: "primary.main" }}>
              <MapPin size={17} style={{ marginTop: 2, flexShrink: 0 }} />
              <Typography sx={{ fontSize: 13.5, color: "text.primary" }}>
                {[event.venue, event.city].filter(Boolean).join(", ")}
              </Typography>
            </Box>
          </Box>

          <EventTabs active={tab} onChange={setTab} />

          <Box sx={{ pt: 3 }}>
            {tab === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {(event.description || "Belum ada deskripsi untuk event ini.")
                  .split("\n\n")
                  .map((p, i) => (
                    <Typography key={i} sx={{ fontSize: 13.5, lineHeight: 1.8, color: "text.secondary" }}>
                      {p}
                    </Typography>
                  ))}
              </Box>
            )}
            {tab === 1 && (
              <BulletList
                items={event.terms && event.terms.length ? event.terms : ["Belum ada syarat & ketentuan untuk event ini."]}
              />
            )}
            {tab === 2 && (
              <BulletList
                items={event.facilities && event.facilities.length ? event.facilities : ["Belum ada informasi fasilitas untuk event ini."]}
              />
            )}
          </Box>
        </Box>

        {/* Bar bawah sekarang sticky, ikut lebar frame (bukan fixed selebar layar) */}
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
          <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{fmtIDR(event.price)}</Typography>
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