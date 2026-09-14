import { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
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

const normalizeParticipant = (p) => ({
  id: p.participantId,
  fullName: p.fullName,
  email: p.email,
  phoneNumber: p.phoneNumber,
  city: p.city,
  genderName: p.gender?.name || "-",
  sizeName: p.size?.name || "-",
  registeredAt: new Date(p.createdAt).toLocaleString("id-ID"),
});

const exportToExcel = (rows, fileName) => {
  const data = rows.map((r) => ({
    "Nama Peserta": r.fullName,
    Email: r.email,
    "No. HP": r.phoneNumber,
    Kota: r.city,
    Gender: r.genderName,
    "Ukuran Baju": r.sizeName,
    "Waktu Daftar": r.registeredAt,
  }));

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
            onClick={() => exportToExcel(participants, fileName)}
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
    </AdminLayout>
  );
};

export default KategoryParticipantsPage;