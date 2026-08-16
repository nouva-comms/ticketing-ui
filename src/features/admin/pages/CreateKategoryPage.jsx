import { useState } from "react";
import { Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { ImagePlus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import DynamicPointsField from "../components/DynamicPointsField";
import { saveCategory } from "../utils/categoriesStorage";

const CreateKategoryPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    quota: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [terms, setTerms] = useState([""]);
  const [facilities, setFacilities] = useState([""]);

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

  const formatDisplayDate = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(`${isoDate}T00:00:00`);
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
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

    const imageData = image ? await fileToBase64(image) : null;

    const newCategory = {
      id: Date.now(),
      name: form.name,
      date: formatDisplayDate(form.date),
      dateISO: form.date,
      time: form.time,
      venue: form.location,
      city: "",
      description: form.description,
      terms: terms.filter((t) => t.trim() !== ""),
      facilities: facilities.filter((f) => f.trim() !== ""),
      cats: [],
      price: Number(form.price) || 0,
      quota: Number(form.quota) || 0,
      image: imageData,
    };

    saveCategory(newCategory);
    navigate("/admin/kategory");
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "13px" },
  };

  const labelSx = { fontSize: "12px", fontWeight: 500, color: "text.secondary", mb: 1 };

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
          <Box>
            <Typography sx={labelSx}>Nama Category</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Contoh: Nouva Sunset 10K"
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

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography sx={labelSx}>Tanggal Category</Typography>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={form.date}
                onChange={handleChange("date")}
                sx={fieldSx}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 140 }}>
              <Typography sx={labelSx}>Jam Category</Typography>
              <TextField
                fullWidth
                size="small"
                type="time"
                value={form.time}
                onChange={handleChange("time")}
                sx={fieldSx}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>

          <Box>
            <Typography sx={labelSx}>Lokasi Category</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Contoh: GBK Senayan, Jakarta"
              value={form.location}
              onChange={handleChange("location")}
              sx={fieldSx}
            />
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

          <DynamicPointsField
            label="Fasilitas Category"
            placeholder="Fasilitas poin"
            values={facilities}
            onChange={setFacilities}
          />

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography sx={labelSx}>Jumlah Tiket yang Tersedia</Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
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
              Simpan Category
            </Button>
          </Box>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default CreateKategoryPage;