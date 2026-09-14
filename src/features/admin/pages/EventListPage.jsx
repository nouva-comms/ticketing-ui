import { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, CircularProgress, Chip } from "@mui/material";
import { Plus, Pencil, Calendar, MapPin, Ticket, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { getMyEvents } from "../../../services/eventAdminApi";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

const EventListPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyEvents()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <Box>
            <Typography sx={{ fontSize: { xs: "22px", sm: "24px", md: "26px" }, fontWeight: 700, lineHeight: 1.2 }}>
              Semua Event
            </Typography>
            <Typography sx={{ mt: 0.6, fontSize: { xs: "11px", sm: "12px" }, color: "text.secondary" }}>
              Event yang sudah kamu buat.
            </Typography>
          </Box>

          <Button
            onClick={() => navigate("/admin/event/create")}
            variant="contained"
            startIcon={<Plus size={16} />}
            sx={{
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 700,
              borderRadius: "8px",
              px: 2.5,
              bgcolor: "primary.main",
              boxShadow: "none",
              "&:hover": { bgcolor: "#021F8F", boxShadow: "none" },
            }}
          >
            Buat Event
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        ) : events.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              color: "text.secondary",
              border: "1.5px dashed",
              borderColor: "border.main",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>Belum ada event</Typography>
            <Typography sx={{ fontSize: 14 }}>Klik &quot;Buat Event&quot; untuk menambahkan event pertama kamu.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }, gap: 2.5 }}>
            {events.map((ev) => (
              <Box
                key={ev.eventId}
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid",
                  borderColor: "border.main",
                  borderRadius: "10px",
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{ev.title}</Typography>
                  <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/admin/event/${ev.eventId}/gallery`)}
                      title="Galeri Foto"
                      sx={{ border: "1px solid", borderColor: "border.main" }}
                    >
                      <ImagePlus size={13} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/admin/event/${ev.eventId}/edit`)}
                      title="Edit Event"
                      sx={{ border: "1px solid", borderColor: "border.main" }}
                    >
                      <Pencil size={13} />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: 13 }}>
                  <Calendar size={14} /> {formatDate(ev.startDate)} — {formatDate(ev.endDate)}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: 13 }}>
                  <MapPin size={14} /> {ev.location}
                </Box>

                <Chip
                  icon={<Ticket size={13} />}
                  label={`${ev._count?.ticketCategories ?? 0} Category`}
                  size="small"
                  sx={{ alignSelf: "flex-start", mt: 1, fontSize: 11 }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
};

export default EventListPage;