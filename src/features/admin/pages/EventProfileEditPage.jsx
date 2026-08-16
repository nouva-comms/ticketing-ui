import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { Pencil, UserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { getEventProfileById } from "../data/eventProfiles";
import { getProfileByEventId, saveProfileForEvent } from "../utils/eventProfileStorage";
import { SOCIALS } from "../components/SocialIcons";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const formatDisplayDate = (isoDate) => {
  if (!isoDate) return "";
  const d = new Date(`${isoDate}T00:00:00`);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
};

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "13px" },
};
const labelSx = { fontSize: "12px", fontWeight: 500, color: "text.secondary", mb: 1 };

const EventProfileEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dateISO, setDateISO] = useState("");
  const [description, setDescription] = useState("");
  const [social, setSocial] = useState({ instagram: "", facebook: "", youtube: "", tiktok: "" });

  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const ev = getEventProfileById(id);
    const profile = getProfileByEventId(ev.id);

    setName(profile?.name || ev.name || "");
    setLocation(profile?.venue || ev.venue || "");
    setDateISO(profile?.dateISO || "");
    setDescription(profile?.description || ev.description || "");
    setSocial({
      instagram: profile?.social?.instagram || ev.social?.instagram || "",
      facebook: profile?.social?.facebook || ev.social?.facebook || "",
      youtube: profile?.social?.youtube || ev.social?.youtube || "",
      tiktok: profile?.social?.tiktok || ev.social?.tiktok || "",
    });
    setBannerPreview(profile?.image || ev.image || null);
    setAvatarPreview(profile?.avatar || ev.avatar || null);
  }, [id]);

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bannerData = bannerFile ? await fileToBase64(bannerFile) : bannerPreview;
    const avatarData = avatarFile ? await fileToBase64(avatarFile) : avatarPreview;

    saveProfileForEvent(id, {
      name,
      venue: location,
      date: formatDisplayDate(dateISO),
      dateISO,
      description,
      social,
      image: bannerData,
      avatar: avatarData,
    });

    navigate(`/admin/events/${id}/profile`);
  };


  return (
    <AdminLayout>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
            backgroundImage: bannerPreview
              ? `linear-gradient(to bottom, rgba(10,10,12,.1), rgba(10,10,12,.6)), url(${bannerPreview})`
              : "linear-gradient(135deg, #032FD9 0%, #0B1F8A 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            component="label"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 34,
              height: 34,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            <Pencil size={15} />
            <input type="file" accept="image/*" hidden onChange={handleBannerChange} />
          </Box>
        </Box>

        <Box sx={{ px: { xs: 2.5, sm: 4 } }}>
          {/* AVATAR + SIMPAN BUTTON */}
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
            <Box sx={{ position: "relative" }}>
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
                  overflow: "hidden",
                }}
              >
                {avatarPreview ? (
                  <Box component="img" src={avatarPreview} alt="Avatar" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <UserRound size={54} color="#fff" />
                )}
              </Box>

              <Box
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,.95)",
                  border: "1px solid",
                  borderColor: "border.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "primary.background" },
                }}
              >
                <Pencil size={13} />
                <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
              </Box>
            </Box>

            <Button
              type="submit"
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
              Simpan Perubahan
            </Button>
          </Box>

          {/* FORM */}
          <Box sx={{ pt: 3, pb: 4, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Typography sx={labelSx}>Nama</Typography>
              <TextField fullWidth size="small" value={name} onChange={(e) => setName(e.target.value)} sx={fieldSx} />
            </Box>

            <Box>
              <Typography sx={labelSx}>Lokasi</Typography>
              <TextField fullWidth size="small" value={location} onChange={(e) => setLocation(e.target.value)} sx={fieldSx} />
            </Box>

            <Box>
              <Typography sx={labelSx}>Tanggal</Typography>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={dateISO}
                onChange={(e) => setDateISO(e.target.value)}
                sx={fieldSx}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box>
              <Typography sx={labelSx}>Media Sosial</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                {SOCIALS.map(({ key, label, icon: Icon }) => (
                  <TextField
                    key={key}
                    fullWidth
                    size="small"
                    placeholder={`www.${key}.com`}
                    value={social[key]}
                    onChange={(e) => setSocial((prev) => ({ ...prev, [key]: e.target.value }))}
                    sx={fieldSx}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                border: "1.5px solid",
                                borderColor: social[key] ? "primary.main" : "#E2E4E9",
                                bgcolor: "transparent",
                                color: social[key] ? "primary.main" : "#0A0A0C",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "border-color .2s, color .2s",
                              }}
                              title={label}
                            >
                              <Icon size={14} />
                            </Box>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography sx={labelSx}>Deskripsi</Typography>
              <TextField
                fullWidth
                multiline
                minRows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={fieldSx}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default EventProfileEditPage;