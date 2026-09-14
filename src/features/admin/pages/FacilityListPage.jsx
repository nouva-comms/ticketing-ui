import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, IconButton, CircularProgress } from "@mui/material";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { getFacilities, createFacility, deleteFacility } from "../../../services/facilityApi";

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "13px" },
};

const FacilityListPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadFacilities = () => {
    setLoading(true);
    getFacilities()
      .then(setFacilities)
      .catch(() => setError("Gagal memuat data fasilitas."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFacilities();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setError("");
    setSubmitting(true);

    try {
      await createFacility(name.trim());
      setName("");
      loadFacilities();
    } catch (err) {
      setError(err.message || "Gagal menambahkan fasilitas.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (facilityId) => {
    if (!window.confirm("Hapus fasilitas ini? Kalau masih dipakai di category tertentu, penghapusan bisa gagal.")) return;
    try {
      await deleteFacility(facilityId);
      loadFacilities();
    } catch (err) {
      setError(err.message || "Gagal menghapus fasilitas.");
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: { xs: "22px", sm: "24px", md: "26px" }, fontWeight: 700, lineHeight: 1.2 }}>
            Kelola Fasilitas
          </Typography>
          <Typography sx={{ mt: 0.6, fontSize: { xs: "11px", sm: "12px" }, color: "text.secondary" }}>
            Fasilitas ini bisa dipilih waktu membuat/mengedit Category Tiket.
          </Typography>
        </Box>

        {error && <Typography sx={{ fontSize: 13, color: "#F44336", mb: 2 }}>{error}</Typography>}

        <Box
          component="form"
          onSubmit={handleAdd}
          sx={{
            display: "flex",
            gap: 1.5,
            mb: 3,
            backgroundColor: "#FFFFFF",
            border: "1px solid",
            borderColor: "border.main",
            borderRadius: "10px",
            p: 2,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Contoh: Tim Medis & Ambulans"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={fieldSx}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={submitting || !name.trim()}
            startIcon={<Plus size={16} />}
            sx={{
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 700,
              borderRadius: "8px",
              px: 2.5,
              whiteSpace: "nowrap",
              bgcolor: "primary.main",
              boxShadow: "none",
              "&:hover": { bgcolor: "#021F8F", boxShadow: "none" },
            }}
          >
            {submitting ? "Menambahkan..." : "Tambah"}
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : facilities.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              color: "text.secondary",
              border: "1.5px dashed",
              borderColor: "border.main",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography sx={{ fontSize: 14 }}>Belum ada fasilitas. Tambahkan lewat form di atas.</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              border: "1px solid",
              borderColor: "border.main",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {facilities.map((f, i) => (
              <Box
                key={f.facilityId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2.5,
                  py: 1.5,
                  borderTop: i > 0 ? "1px solid" : "none",
                  borderColor: "border.main",
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{f.name}</Typography>
                  <Typography sx={{ fontSize: 11, color: "text.secondary", fontFamily: "monospace" }}>{f.facilityId}</Typography>
                </Box>
                <IconButton size="small" onClick={() => handleDelete(f.facilityId)} sx={{ color: "#F44336" }}>
                  <Trash2 size={15} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
};

export default FacilityListPage;