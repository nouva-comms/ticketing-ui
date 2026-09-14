import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { createEvent } from "../../../services/eventAdminApi";

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "13px" },
};
const labelSx = { fontSize: "12px", fontWeight: 500, color: "text.secondary", mb: 1 };

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await createEvent({
        title: form.title,
        description: form.description,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        location: form.location,
      });
      navigate("/admin/event");
    } catch (err) {
      setError(err.message || "Gagal menyimpan event.");
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: { xs: "22px", sm: "24px", md: "26px" }, fontWeight: 700, lineHeight: 1.2 }}>
            Buat Event
          </Typography>
          <Typography sx={{ mt: 0.6, fontSize: { xs: "11px", sm: "12px" }, color: "text.secondary" }}>
            Isi detail event yang akan dibuat.
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
            <TextField
              fullWidth
              size="small"
              required
              placeholder="Contoh: Nouva Festival 2026"
              value={form.title}
              onChange={handleChange("title")}
              sx={fieldSx}
            />
          </Box>

          <Box>
            <Typography sx={labelSx}>Deskripsi Event</Typography>
            <TextField
              fullWidth
              multiline
              minRows={4}
              required
              placeholder="Ceritakan tentang event ini..."
              value={form.description}
              onChange={handleChange("description")}
              sx={fieldSx}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography sx={labelSx}>Tanggal Mulai</Typography>
              <TextField
                fullWidth
                size="small"
                type="date"
                required
                value={form.startDate}
                onChange={handleChange("startDate")}
                sx={fieldSx}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 180 }}>
              <Typography sx={labelSx}>Tanggal Selesai</Typography>
              <TextField
                fullWidth
                size="small"
                type="date"
                required
                value={form.endDate}
                onChange={handleChange("endDate")}
                sx={fieldSx}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>

          <Box>
            <Typography sx={labelSx}>Lokasi Event</Typography>
            <TextField
              fullWidth
              size="small"
              required
              placeholder="Contoh: Alun-alun Engku Putri, Batam"
              value={form.location}
              onChange={handleChange("location")}
              sx={fieldSx}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end", pt: 1 }}>
            <Button
              type="button"
              onClick={() => navigate("/admin/event")}
              sx={{ textTransform: "none", color: "text.secondary", fontSize: "13px" }}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
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
              {submitting ? "Menyimpan..." : "Simpan Event"}
            </Button>
          </Box>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default CreateEventPage;