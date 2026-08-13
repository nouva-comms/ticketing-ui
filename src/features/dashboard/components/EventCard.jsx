import { Box, Typography, Chip, Button } from "@mui/material";
import { Calendar, MapPin, ImageOff } from "lucide-react";

const fmtIDR = (n) => "Rp " + n.toLocaleString("id-ID");

const EventCard = ({ event, onRegister, actionLabel = "Daftar", onAction  }) => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "border.main",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "transform .25s, box-shadow .25s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: "0 16px 32px -20px rgba(3,47,217,.35)" },
      }}
    >
      <Box sx={{ height: 170, position: "relative", bgcolor: "#F0F1F3" }}>
        {event.image ? (
          <Box
            component="img"
            src={event.image}
            alt={event.name}
            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 0.5,
              color: "#B4B8C0",
            }}
          >
            <ImageOff size={26} strokeWidth={1.6} />
            <Typography sx={{ fontSize: 11, color: "#B4B8C0" }}>Foto event</Typography>
          </Box>
        )}

        {event.cats && event.cats.length > 0 && (
          <Chip
            label={event.cats.join(" / ")}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "#fff",
              color: "primary.main",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.04em",
            }}
          />
        )}
      </Box>

      <Box sx={{ p: 2.2, display: "flex", flexDirection: "column", gap: 0.8, flex: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{event.name}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: 13 }}>
          <Calendar size={14} /> {event.date}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: 13 }}>
          <MapPin size={14} /> {[event.venue, event.city].filter(Boolean).join(", ")}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: "auto", pt: 1.8 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{fmtIDR(event.price)}</Typography>
          <Button
            onClick={() => (onAction ? onAction(event) : onRegister?.(event))}
            variant="contained"
            sx={{
              borderRadius: 100,
              textTransform: "none",
              px: 2.5,
              bgcolor: "primary.main",
              boxShadow: "none",
              "&:hover": { bgcolor: "#021F8F", boxShadow: "none" },
            }}
          >
            {actionLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EventCard;