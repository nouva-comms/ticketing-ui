import { Box, Typography, Button } from "@mui/material";
import { ArrowLeft, Calendar, MapPin, UserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { getEventProfileById } from "../data/eventProfiles";
import { getProfileByEventId } from "../utils/eventProfileStorage";
import { SOCIALS } from "../components/SocialIcons";

const normalizeUrl = (url) => {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const EventProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = getEventProfileById(id);
  const profile = getProfileByEventId(event.id);

  const displayName = profile?.name || event.name;
  const displayVenue = profile?.venue || event.venue;
  const displayCity = profile?.city || event.city;
  const displayDate = profile?.date || event.date;
  const displayDescription = profile?.description || event.description;
  const displayBanner = profile?.image || event.image;
  const displayAvatar = profile?.avatar || event.avatar;
  const displaySocial = profile?.social || event.social || {};

  return (
    <AdminLayout>
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        <Box
          onClick={() => navigate("/admin/events")}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            color: "text.secondary",
            fontSize: "12px",
            cursor: "pointer",
            mb: 1.5,
            "&:hover": { color: "primary.main" },
          }}
        >
          <ArrowLeft size={14} /> Kembali ke Semua Event
        </Box>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid",
            borderColor: "border.main",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          {/* BANNER */}
          <Box
            sx={{
              height: { xs: 160, sm: 220 },
              position: "relative",
              backgroundImage: displayBanner
                ? `linear-gradient(to bottom, rgba(10,10,12,.1), rgba(10,10,12,.6)), url(${displayBanner})`
                : "linear-gradient(135deg, #032FD9 0%, #0B1F8A 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Box sx={{ px: { xs: 2.5, sm: 4 } }}>
            {/* AVATAR + EDIT BUTTON */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                mt: { xs: "-38px", sm: "-46px" },
                position: "relative",
                zIndex: 2,
              }}
            >
              <Box
                sx={{
                  width: { xs: 100, sm: 130 },
                  height: { xs: 100, sm: 130 },
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  border: "5px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 3,
                  overflow: "hidden",
                }}
              >
                {displayAvatar ? (
                  <Box
                    component="img"
                    src={displayAvatar}
                    alt="Avatar"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <UserRound size={72} color="#fff" />
                )}
              </Box>

              <Button
                onClick={() =>
                  navigate(`/admin/events/${event.id}/profile/edit`)
                }
                variant="contained"
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
                Edit Event
              </Button>
            </Box>

            {/* INFO */}
            <Box sx={{ pt: 2, pb: 4 }}>
              <Typography
                sx={{ fontWeight: 800, fontSize: { xs: 22, sm: 26 }, mb: 1.5 }}
              >
                {displayName}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.8,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "text.secondary",
                    fontSize: 13.5,
                  }}
                >
                  <Calendar size={15} /> {displayDate}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "text.secondary",
                    fontSize: 13.5,
                  }}
                >
                  <MapPin size={15} />{" "}
                  {[displayVenue, displayCity].filter(Boolean).join(", ")}
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.2, mb: 3 }}>
                {SOCIALS.map(({ key, icon: Icon }) => {
                  const href = normalizeUrl(displaySocial[key]);
                  return (
                    <Box
                      key={key}
                      component={href ? "a" : "span"}
                      href={href || undefined}
                      target={href ? "_blank" : undefined}
                      rel={href ? "noopener noreferrer" : undefined}
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "1.5px solid",
                        borderColor: href ? "#E2E4E9" : "#EDEEF1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: href ? "#0A0A0C" : "#C7CBD1",
                        cursor: href ? "pointer" : "default",
                        transition: "border-color .2s, color .2s",
                        "&:hover": href
                          ? {
                              borderColor: "primary.main",
                              color: "primary.main",
                            }
                          : {},
                      }}
                    >
                      <Icon size={16} />
                    </Box>
                  );
                })}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {(displayDescription || "Belum ada deskripsi untuk event ini.")
                  .split("\n\n")
                  .map((p, i) => (
                    <Typography
                      key={i}
                      sx={{
                        fontSize: 13.5,
                        lineHeight: 1.8,
                        color: "text.secondary",
                      }}
                    >
                      {p}
                    </Typography>
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default EventProfilePage;
