import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import AdminLayout from "../components/AdminLayout";
import { getCategoryById } from "../../../services/categoryApi";
import { getParticipantsByCategory } from "../../../services/participantApi";

const COLUMNS = [
  { field: "fullName", headerName: "Nama Peserta", flex: 1.2, minWidth: 160 },
  { field: "email", headerName: "Email", flex: 1.2, minWidth: 180 },
  { field: "phoneNumber", headerName: "No. HP", flex: 1, minWidth: 130 },
  { field: "city", headerName: "Kota", flex: 0.8, minWidth: 110 },
  { field: "genderName", headerName: "Gender", flex: 0.7, minWidth: 100 },
  { field: "sizeName", headerName: "Ukuran Baju", flex: 0.7, minWidth: 110 },
  { field: "registeredAt", headerName: "Waktu Daftar", flex: 1, minWidth: 160 },
];

// Semua field yang BISA di-export — lebih lengkap dari kolom yang tampil di tabel.
const EXPORT_FIELDS = [
  { key: "fullName", label: "Nama Peserta" },
  { key: "identityTypeID", label: "Tipe Identitas" },
  { key: "identityNumber", label: "Nomor Identitas" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "No. HP" },
  { key: "genderName", label: "Gender" },
  { key: "city", label: "Kota" },
  { key: "address", label: "Alamat" },
  { key: "bloodType", label: "Golongan Darah" },
  { key: "diseases", label: "Penyakit Bawaan" },
  { key: "emergencyNumber", label: "Kontak Darurat" },
  { key: "sizeName", label: "Ukuran Baju" },
  { key: "bibName", label: "Nama BIB" },
  { key: "totalPayment", label: "Total Bayar" },
  { key: "registeredAt", label: "Waktu Daftar" },
];

const normalizeParticipant = (p) => ({
  id: p.participantId,
  fullName: p.fullName,
  identityTypeID: p.identityTypeID,
  identityNumber: p.identityNumber,
  email: p.email,
  phoneNumber: p.phoneNumber,
  genderName: p.gender?.name || "-",
  city: p.city,
  address: p.address,
  bloodType: p.bloodType,
  diseases: p.diseases || "-",
  emergencyNumber: p.emergencyNumber,
  sizeName: p.size?.name || "-",
  bibName: p.bibName,
  totalPayment: p.totalPayment,
  registeredAt: new Date(p.createdAt).toLocaleString("id-ID"),
});

const exportToExcel = (rows, fileName, selectedKeys) => {
  const fieldsToExport = EXPORT_FIELDS.filter((f) => selectedKeys.includes(f.key));

  const data = rows.map((r) => {
    const obj = {};
    fieldsToExport.forEach((f) => {
      obj[f.label] = r[f.key];
    });
    return obj;
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Partisipan");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

const KategoryParticipantsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState(EXPORT_FIELDS.map((f) => f.key));

  useEffect(() => {
    Promise.all([getCategoryById(id), getParticipantsByCategory(id)])
      .then(([categoryData, participantData]) => {
        setCategory(categoryData);
        setParticipants(participantData.map(normalizeParticipant));
      })
      .catch(() => {
        setCategory(null);
        setParticipants([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const fileName = category ? `partisipan-${category.title}` : "partisipan";

  const toggleField = (key) => {
    setSelectedFields((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleAll = () => {
    setSelectedFields((prev) =>
      prev.length === EXPORT_FIELDS.length ? [] : EXPORT_FIELDS.map((f) => f.key)
    );
  };

  const handleExportConfirm = () => {
    exportToExcel(participants, fileName, selectedFields);
    setExportDialogOpen(false);
  };

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
          <ArrowLeft size={14} /> Kembali ke Semua Category
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "22px", sm: "24px", md: "26px" },
                fontWeight: 700,
                lineHeight: 1.2,
                color: "text.primary",
              }}
            >
              Partisipan
            </Typography>
            <Typography sx={{ mt: 0.6, fontSize: { xs: "11px", sm: "12px" }, color: "text.secondary" }}>
              {category ? `Daftar peserta terdaftar untuk "${category.title}".` : "Daftar peserta terdaftar."}
            </Typography>
          </Box>

          <Button
            onClick={() => setExportDialogOpen(true)}
            disabled={participants.length === 0}
            startIcon={<FileSpreadsheet size={16} />}
            variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              borderRadius: "8px",
              borderColor: "border.main",
              color: "text.primary",
              "&:hover": { borderColor: "primary.main", color: "primary.main" },
            }}
          >
            Export ke Excel
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
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
            <DataGrid
              rows={participants}
              columns={COLUMNS}
              autoHeight
              disableRowSelectionOnClick
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10, 25, 50]}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: { showQuickFilter: true },
              }}
              sx={{
                border: "none",
                fontSize: "13px",
                "& .MuiDataGrid-columnHeaders": { backgroundColor: "#F7F8FA", fontSize: "12px", fontWeight: 700 },
                "& .MuiDataGrid-cell:focus": { outline: "none" },
              }}
            />
          </Box>
        )}
      </Box>

      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 16 }}>Pilih Data untuk Export</DialogTitle>
        <DialogContent dividers>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedFields.length === EXPORT_FIELDS.length}
                indeterminate={selectedFields.length > 0 && selectedFields.length < EXPORT_FIELDS.length}
                onChange={toggleAll}
              />
            }
            label={<Typography sx={{ fontWeight: 700, fontSize: 13 }}>Pilih Semua</Typography>}
          />
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {EXPORT_FIELDS.map((f) => (
              <FormControlLabel
                key={f.key}
                control={
                  <Checkbox
                    checked={selectedFields.includes(f.key)}
                    onChange={() => toggleField(f.key)}
                    size="small"
                  />
                }
                label={<Typography sx={{ fontSize: 13 }}>{f.label}</Typography>}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setExportDialogOpen(false)} sx={{ textTransform: "none", color: "text.secondary" }}>
            Batal
          </Button>
          <Button
            onClick={handleExportConfirm}
            variant="contained"
            disabled={selectedFields.length === 0}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "8px",
              bgcolor: "primary.main",
              boxShadow: "none",
              "&:hover": { bgcolor: "#021F8F", boxShadow: "none" },
            }}
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default KategoryParticipantsPage;