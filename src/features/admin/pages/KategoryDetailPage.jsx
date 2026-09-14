import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, InputAdornment, MenuItem, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import { ImagePlus, X, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import DynamicPointsField from "../components/DynamicPointsField";
import {
  getCategoryById,
  updateCategoryDetails,
  deleteCategory,
  getCategoryTerms,
  deleteCategoryTerm,
  getCategoryFacilities,
  deleteCategoryFacility,
  addCategoryTerm,
  addCategoryFacility,
} from "../../../services/categoryApi";
import { getMyEvents } from "../../../services/eventAdminApi";
import { getFacilities } from "../../../services/facilityApi";

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

const KategoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  const [events, setEvents] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [existingTermIds, setExistingTermIds] = useState([]);
  const [existingFacilityLinkIds, setExistingFacilityLinkIds] = useState([]);

  const [form, setForm] = useState({ eventId: "", name: "", description: "", quota: "", price: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [terms, setTerms] = useState([""]);
  const [selectedFacilityIds, setSelectedFacilityIds] = useState([]);

  useEffect(() => {
    Promise.all([
      getCategoryById(id),
      getMyEvents(),
      getFacilities(),
      getCategoryTerms(id),
      getCategoryFacilities(id),
    ])
      .then(([category, eventList, facilityList, termsData, facilityLinks]) => {
        setEvents(eventList);
        setFacilities(facilityList);

        setForm({
          eventId: category.eventId,
          name: category.title,
          description: category.description,
          quota: category.totalTickets,
          price: category.price,
        });
        setImagePreview(category.base64 || null);

        setTerms(termsData.length ? [...termsData.map((t) => t.description), ""] : [""]);
        setExistingTermIds(termsData.map((t) => t.catTermsConditionId));

        setSelectedFacilityIds(facilityLinks.map((f) => f.facilityId));
        setExistingFacilityLinkIds(facilityLinks.map((f) => f.categoryFacilityId));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

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
      prev.includes(facilityId) ? prev.filter((fid) => fid !== facilityId) : [...prev, facilityId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const imageData = image ? await fileToBase64(image) : imagePreview;

      await updateCategoryDetails(id, {
        eventId: form.eventId,
        title: form.name,
        description: form.description,
        totalTickets: Number(form.quota) || 0,
        price: Number(form.price) || 0,
        base64: imageData,
      });

      // Syarat & Ketentuan: hapus semua yang lama, buat ulang dari form sekarang
      await Promise.all(existingTermIds.map((termId) => deleteCategoryTerm(termId)));
      const cleanTerms = terms.filter((t) => t.trim() !== "");
      await Promise.all(cleanTerms.map((t) => addCategoryTerm(id, t)));

      // Fasilitas: hapus semua link lama, buat ulang dari checklist sekarang
      await Promise.all(existingFacilityLinkIds.map((linkId) => deleteCategoryFacility(linkId)));
      await Promise.all(selectedFacilityIds.map((facilityId) => addCategoryFacility(id, facilityId)));

      navigate("/admin/kategory");
    } catch (err) {
      setError(err.message || "Gagal menyimpan perubahan.");
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Yakin ingin menghapus category ini? Tindakan ini tidak bisa dibatalkan.")) return;
    try {
      await deleteCategory(id);
      navigate("/admin/kategory");
    } catch (err) {
      setError(err.message || "Gagal menghapus category. Mungkin sudah ada peserta terdaftar di category ini.");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  if (notFound) {
    return (
      <AdminLayout>
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
            Kategori tidak ditemukan
          </Typography>
          <Button onClick={() => navigate("/admin/kategory")} sx={{ textTransform: "none", mt: 1.5 }}>
            ← Kembali ke Semua Kategori
          </Button>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        <Box
          onClick={() => navigate("/admin/kategory")}
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
          <ArrowLeft size={14} /> Kembali ke Semua Kategori
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: { xs: "22px", sm: "24px", md: "26px" }, fontWeight: 700, lineHeight: 1.2 }}>
            Detail Kategori
          </Typography>
          <Typography sx={{ mt: 0.6, fontSize: { xs: "11px", sm: "12px" }, color: "text.secondary" }}>
            Lihat dan ubah detail kategori ini.
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
            width: "100%",
          }}
        >
          {error && <Typography sx={{ fontSize: 13, color: "#F44336" }}>{error}</Typography>}

          <Box>
            <Typography sx={labelSx}>Event</Typography>
            <TextField select fullWidth size="small" required value={form.eventId} onChange={handleChange("eventId")} sx={fieldSx}>
              {events.map((ev) => (
                <MenuItem key={ev.eventId} value={ev.eventId}>
                  {ev.title}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box>
            <Typography sx={labelSx}>Nama Kategori</Typography>
            <TextField fullWidth size="small" value={form.name} onChange={handleChange("name")} sx={fieldSx} />
          </Box>

          <Box>
            <Typography sx={labelSx}>Gambar Kategori</Typography>

            {imagePreview ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Preview kategori"
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
                  maxWidth: 320,
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
            <Typography sx={labelSx}>Deskripsi Kategori</Typography>
            <TextField fullWidth multiline minRows={4} value={form.description} onChange={handleChange("description")} sx={fieldSx} />
          </Box>

          <DynamicPointsField
            label="Syarat dan Ketentuan Kategori"
            placeholder="Syarat & ketentuan poin"
            values={terms}
            onChange={setTerms}
          />

          <Box>
            <Typography sx={labelSx}>Fasilitas Kategori</Typography>
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
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography sx={labelSx}>Jumlah Tiket yang Tersedia</Typography>
              <TextField fullWidth size="small" type="number" value={form.quota} onChange={handleChange("quota")} sx={fieldSx} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography sx={labelSx}>Harga Tiket</Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={form.price}
                onChange={handleChange("price")}
                sx={fieldSx}
                InputProps={{ startAdornment: <InputAdornment position="start">Rp</InputAdornment> }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}>
            <Button
              type="button"
              onClick={handleDelete}
              startIcon={<Trash2 size={15} />}
              sx={{ textTransform: "none", color: "#F44336", fontSize: "13px" }}
            >
              Hapus Category
            </Button>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button type="button" onClick={() => navigate("/admin/kategory")} sx={{ textTransform: "none", color: "text.secondary", fontSize: "13px" }}>
                Kembali
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{ textTransform: "none", fontSize: "13px", fontWeight: 700, borderRadius: "8px", px: 3, bgcolor: "primary.main", boxShadow: "none", "&:hover": { bgcolor: "#021F8F", boxShadow: "none" } }}
              >
                {submitting ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default KategoryDetailPage;