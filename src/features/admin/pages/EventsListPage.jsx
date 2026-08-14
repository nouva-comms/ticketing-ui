import { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import EventCard from "../../dashboard/components/EventCard";
import { getEvents } from "../utils/eventsStorage";

const EventsListPage = () => {
  const navigate = useNavigate();
  const [events] = useState(() => getEvents());

  return (
    <AdminLayout>
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "22px", sm: "24px", md: "26px" },
                fontWeight: 700,
                lineHeight: 1.2,
                color: "text.primary",
              }}
            >
              Semua Event
            </Typography>
            <Typography sx={{ mt: 0.6, fontSize: { xs: "11px", sm: "12px" }, color: "text.secondary" }}>
              Event yang sudah kamu buat.
            </Typography>
          </Box>

          <Button
            onClick={() => navigate("/admin/events/create")}
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

        {events.length === 0 ? (
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
            <Typography sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>
              Belum ada event
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              Klik &quot;Buat Event&quot; untuk menambahkan event pertama kamu.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" },
              gap: 2.5,
            }}
          >
            {events.map((ev) => (
              <Box key={ev.id} sx={{ position: "relative" }}>
                <IconButton
                  onClick={() => navigate(`/admin/events/${ev.id}`)}
                  title="Edit Event"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    zIndex: 2,
                    width: 30,
                    height: 30,
                    bgcolor: "#fff",
                    border: "1px solid",
                    borderColor: "border.main",
                    boxShadow: "0 2px 6px rgba(0,0,0,.12)",
                    "&:hover": { bgcolor: "primary.background" },
                  }}
                >
                  <Pencil size={14} />
                </IconButton>

                <EventCard
                  event={ev}
                  actionLabel="Partisipan"
                  onAction={(e) => navigate(`/admin/events/${e.id}/participants`)}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
};

export default EventsListPage;