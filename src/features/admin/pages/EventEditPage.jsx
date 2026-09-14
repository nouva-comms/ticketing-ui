import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { getEventById, updateEvent, deleteEvent } from "../../../services/eventAdminApi";

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "13px" },
};
const labelSx = { fontSize: "12px", fontWeight: 500, color: "text.secondary", mb: 1 };

const toDateInputValue = (iso) => (iso ? iso.slice(0, 10) : "");

const EventEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", description: "", startDate: "", endDate: "", location: "" });

  useEffect(() => {
    getEventById(id)
      .then((ev) => {
        setForm({
          title: ev.title,
          description: ev.description,
          startDate: toDateInputValue(ev.startDate),
          endDate: toDateInputValue(ev.endDate),
          location: ev.location,
        });
      })
      .catch(() => setError("Event tidak ditemukan."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await updateEvent(id, {
        title: form.title,
        description: form.description,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        location: form.location,
      });
      navigate("/admin/event");
    } catch (err) {
      setError(err.message || "Gagal memperbarui event.");
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Yakin ingin menghapus event ini? Semua category tiket di dalamnya juga akan terpengaruh.")) {
      return;
    }
    try {
      await deleteEvent(id);
      navigate("/admin/event");
    } catch (err) {
      setError(err.message || "Gagal menghapus event.");
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

  return (
    <AdminLayout>
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: { xs: "22px", sm: "24px", md: "26px" }, fontWeight: 700, lineHeight: 1.2 }}>
            Edit Event
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
          {error && <Typography sx={{ fontSize: 13, color: "#F44336" }}>{error}</Typography>}

          <Box>
            <Typography sx={labelSx}>Nama Event</Typography>
            <TextField fullWidth size="small" required value={form.title} onChange={handleChange("title")} sx={fieldSx} />
          </Box>

          <Box>
            <Typography sx={labelSx}>Deskripsi Event</Typography>
            <TextField fullWidth multiline minRows={4} required value={form.description} onChange={handleChange("description")} sx={fieldSx} />
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography sx={labelSx}>Tanggal Mulai</Typography>
              <TextField fullWidth size="small" type="date" required value={form.startDate} onChange={handleChange("startDate")} sx={fieldSx} InputLabelProps={{ shrink: true }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography sx={labelSx}>Tanggal Selesai</Typography>
              <TextField fullWidth size="small" type="date" required value={form.endDate} onChange={handleChange("endDate")} sx={fieldSx} InputLabelProps={{ shrink: true }} />
            </Box>
          </Box>

          <Box>
            <Typography sx={labelSx}>Lokasi Event</Typography>
            <TextField fullWidth size="small" required value={form.location} onChange={handleChange("location")} sx={fieldSx} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}>
            <Button
              type="button"
              onClick={handleDelete}
              startIcon={<Trash2 size={15} />}
              sx={{ textTransform: "none", color: "#F44336", fontSize: "13px" }}
            >
              Hapus Event
            </Button>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button type="button" onClick={() => navigate("/admin/event")} sx={{ textTransform: "none", color: "text.secondary", fontSize: "13px" }}>
                Batal
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

export default EventEditPage;