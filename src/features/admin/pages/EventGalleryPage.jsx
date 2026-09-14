import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, IconButton, CircularProgress } from "@mui/material";
import { ArrowLeft, ImagePlus, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { getEventImages, addEventImage, deleteEventImage } from "../../../services/eventGalleryApi";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "13px" },
};
const labelSx = { fontSize: "12px", fontWeight: 500, color: "text.secondary", mb: 1 };

const EventGalleryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  const loadImages = () => {
    setLoading(true);
    getEventImages(id)
      .then(setImages)
      .catch(() => setError("Gagal memuat galeri."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImage(file);
    setNewImagePreview(URL.createObjectURL(file));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newImage) return;
    setError("");
    setSubmitting(true);

    try {
      const base64 = await fileToBase64(newImage);
      const nextSequence = images.length ? Math.max(...images.map((img) => img.sequence)) + 1 : 1;

      await addEventImage({
        eventId: id,
        title: newTitle || `Foto ${nextSequence}`,
        description: newDescription,
        base64,
        sequence: nextSequence,
      });

      setNewTitle("");
      setNewDescription("");
      setNewImage(null);
      setNewImagePreview(null);
      loadImages();
    } catch (err) {
      setError(err.message || "Gagal menambahkan foto.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (eventInfoImageId) => {
    if (!window.confirm("Hapus foto ini dari galeri?")) return;
    try {
      await deleteEventImage(eventInfoImageId);
      loadImages();
    } catch (err) {
      setError(err.message || "Gagal menghapus foto.");
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        <Box
          onClick={() => navigate("/admin/event")}
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

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: { xs: "22px", sm: "24px", md: "26px" }, fontWeight: 700, lineHeight: 1.2 }}>
            Galeri Foto Event
          </Typography>
          <Typography sx={{ mt: 0.6, fontSize: { xs: "11px", sm: "12px" }, color: "text.secondary" }}>
            Tambahkan beberapa foto pendukung untuk event ini.
          </Typography>
        </Box>

        {error && <Typography sx={{ fontSize: 13, color: "#F44336", mb: 2 }}>{error}</Typography>}

        {/* GRID FOTO YANG SUDAH ADA */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }, gap: 2, mb: 4 }}>
            {images.map((img) => (
              <Box
                key={img.eventInfoImageId}
                sx={{ bgcolor: "#fff", border: "1px solid", borderColor: "border.main", borderRadius: "10px", overflow: "hidden" }}
              >
                <Box component="img" src={img.base64} alt={img.title} sx={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} />
                <Box sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{img.title}</Typography>
                    {img.description && (
                      <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{img.description}</Typography>
                    )}
                  </Box>
                  <IconButton size="small" onClick={() => handleDelete(img.eventInfoImageId)} sx={{ color: "#F44336" }}>
                    <Trash2 size={15} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* FORM TAMBAH FOTO BARU */}
        <Box
          component="form"
          onSubmit={handleAdd}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid",
            borderColor: "border.main",
            borderRadius: "10px",
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            maxWidth: 480,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Tambah Foto Baru</Typography>

          <Box>
            <Typography sx={labelSx}>Foto</Typography>
            {newImagePreview ? (
              <Box component="img" src={newImagePreview} alt="Preview" sx={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: "8px" }} />
            ) : (
              <Box
                component="label"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  height: 120,
                  borderRadius: "8px",
                  border: "1.5px dashed",
                  borderColor: "border.main",
                  color: "text.secondary",
                  cursor: "pointer",
                  "&:hover": { borderColor: "primary.main", color: "primary.main" },
                }}
              >
                <ImagePlus size={20} />
                <Typography sx={{ fontSize: 12 }}>Klik untuk pilih foto</Typography>
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Box>
            )}
          </Box>

          <Box>
            <Typography sx={labelSx}>Judul Foto</Typography>
            <TextField fullWidth size="small" placeholder="Contoh: Suasana Garis Finish" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} sx={fieldSx} />
          </Box>

          <Box>
            <Typography sx={labelSx}>Deskripsi (opsional)</Typography>
            <TextField fullWidth size="small" multiline minRows={2} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} sx={fieldSx} />
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={!newImage || submitting}
            sx={{
              alignSelf: "flex-start",
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
            {submitting ? "Menambahkan..." : "Tambah Foto"}
          </Button>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default EventGalleryPage;