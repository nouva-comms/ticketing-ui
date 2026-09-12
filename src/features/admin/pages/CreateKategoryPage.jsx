import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, InputAdornment, MenuItem, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import { ImagePlus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import DynamicPointsField from "../components/DynamicPointsField";
import { createCategory, addCategoryTerm, addCategoryFacility } from "../../../services/categoryApi";
import { getMyEvents } from "../../../services/eventAdminApi";
import { getFacilities } from "../../../services/facilityApi";

const CreateKategoryPage = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    eventId: "",
    name: "",
    description: "",
    quota: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [terms, setTerms] = useState([""]);
  const [selectedFacilityIds, setSelectedFacilityIds] = useState([]);

  useEffect(() => {
    Promise.all([getMyEvents(), getFacilities()])
      .then(([eventList, facilityList]) => {
        setEvents(eventList);
        setFacilities(facilityList);
      })
      .catch(() => setError("Gagal memuat daftar Event/Fasilitas."))
      .finally(() => setLoadingOptions(false));
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const toggleFacility = (facilityId) => {
    setSelectedFacilityIds((prev) =>
      prev.includes(facilityId) ? prev.filter((id) => id !== facilityId) : [...prev, facilityId]
    );
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const imageData = image
        ? await fileToBase64(image)
        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

      const created = await createCategory({
        eventId: form.eventId,
        title: form.name,
        description: form.description,
        totalTickets: Number(form.quota) || 0,
        price: Number(form.price) || 0,
        base64: imageData,
      });

      const cleanTerms = terms.filter((t) => t.trim() !== "");
      await Promise.all(cleanTerms.map((t) => addCategoryTerm(created.ticketCategoryId, t)));
      await Promise.all(
        selectedFacilityIds.map((facilityId) => addCategoryFacility(created.ticketCategoryId, facilityId))
      );

      navigate("/admin/kategory");
    } catch (err) {
      setError(err.message || "Gagal menyimpan category.");
      setSubmitting(false);
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "13px" },
  };

  const labelSx = { fontSize: "12px", fontWeight: 500, color: "text.secondary", mb: 1 };

  if (loadingOptions) {
    return (
      <AdminLayout>
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: { xs: "22px", sm: "24px", md: "26px" },
              fontWeight: 700,
              lineHeight: 1.2,
              color: "text.primary",
            }}
          >
            Buat Category
          </Typography>
          <Typography sx={{ mt: 0.6, fontSize: { xs: "11px", sm: "12px" }, color: "text.secondary" }}>
            Isi detail category yang akan dibuat.
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid",
            borderColor: "border.main",
            borderRadius: "10px",
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          {error && (
            <Typography sx={{ fontSize: 13, color: "#F44336" }}>{error}</Typography>
          )}

          <Box>
            <Typography sx={labelSx}>Event</Typography>
            {events.length === 0 ? (
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                Kamu belum punya Event. Buat Event dulu lewat Swagger sebelum bisa bikin Category.
              </Typography>
            ) : (
              <TextField
                select
                fullWidth
                size="small"
                required
                value={form.eventId}
                onChange={handleChange("eventId")}
                sx={fieldSx}
              >
                {events.map((ev) => (
                  <MenuItem key={ev.eventId} value={ev.eventId}>
                    {ev.title}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Box>

          <Box>
            <Typography sx={labelSx}>Nama Category</Typography>
            <TextField
              fullWidth
              size="small"
              required
              placeholder="Contoh: 5K"
              value={form.name}
              onChange={handleChange("name")}
              sx={fieldSx}
            />
          </Box>

          <Box>
            <Typography sx={labelSx}>Gambar Category</Typography>

            {imagePreview ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Preview category"
                    sx={{
                      display: "block",
                      width: "auto",
                      height: "auto",
                      maxWidth: 720,
                      maxHeight: 240,
                      borderRadius: "10px",
                      border: "1px solid",
                      borderColor: "border.main",
                    }}
                  />
                  <Box
                    onClick={handleRemoveImage}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      bgcolor: "rgba(0,0,0,.6)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <X size={14} />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                component="label"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  width: "100%",
                  height: 140,
                  borderRadius: "10px",
                  border: "1.5px dashed",
                  borderColor: "border.main",
                  color: "text.secondary",
                  cursor: "pointer",
                  "&:hover": { borderColor: "primary.main", color: "primary.main" },
                }}
              >
                <ImagePlus size={22} />
                <Typography sx={{ fontSize: "12px" }}>Klik untuk upload gambar</Typography>
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Box>
            )}
          </Box>

          <Box>
            <Typography sx={labelSx}>Deskripsi Category</Typography>
            <TextField
              fullWidth
              multiline
              minRows={4}
              placeholder="Ceritakan tentang category ini..."
              value={form.description}
              onChange={handleChange("description")}
              sx={fieldSx}
            />
          </Box>

          <DynamicPointsField
            label="Syarat dan Ketentuan Category"
            placeholder="Syarat & ketentuan poin"
            values={terms}
            onChange={setTerms}
          />

          <Box>
            <Typography sx={labelSx}>Fasilitas Category</Typography>
            {facilities.length === 0 ? (
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                Belum ada data Fasilitas. Tambahkan dulu lewat Swagger (POST /facility/create).
              </Typography>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {facilities.map((f) => (
                  <FormControlLabel
                    key={f.facilityId}
                    control={
                      <Checkbox
                        checked={selectedFacilityIds.includes(f.facilityId)}
                        onChange={() => toggleFacility(f.facilityId)}
                        size="small"
                      />
                    }
                    label={<Typography sx={{ fontSize: 13 }}>{f.name}</Typography>}
                  />
                ))}
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography sx={labelSx}>Jumlah Tiket yang Tersedia</Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                required
                placeholder="Contoh: 500"
                value={form.quota}
                onChange={handleChange("quota")}
                sx={fieldSx}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography sx={labelSx}>Harga Tiket</Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                required
                placeholder="0"
                value={form.price}
                onChange={handleChange("price")}
                sx={fieldSx}
                InputProps={{ startAdornment: <InputAdornment position="start">Rp</InputAdornment> }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end", pt: 1 }}>
            <Button
              type="button"
              onClick={() => navigate("/admin/kategory")}
              sx={{ textTransform: "none", color: "text.secondary", fontSize: "13px" }}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting || events.length === 0}
              sx={{
                textTransform: "none",
                fontSize: "13px",
                fontWeight: 700,
                borderRadius: "8px",
                px: 3,
                bgcolor: "primary.main",
                boxShadow: "none",
                "&:hover": { bgcolor: "#021F8F", boxShadow: "none" },
              }}
            >
              {submitting ? "Menyimpan..." : "Simpan Category"}
            </Button>
          </Box>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default CreateKategoryPage;