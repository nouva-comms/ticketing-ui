import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

const STATUS_COLOR = {
  Terkonfirmasi: { color: "#00C875", bg: "#D4F4D4" },
  "Menunggu Bayar": { color: "#FDAB3D", bg: "#FFF1DC" },
  Dibatalkan: { color: "#F44336", bg: "#FEE2E1" },
};

const RecentTicketsTable = ({ rows = [] }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F7F8FA" }}>
              <TableCell>No. Tiket</TableCell>
              <TableCell>Nama Peserta</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const status = STATUS_COLOR[row.status] || STATUS_COLOR["Menunggu Bayar"];
              return (
                <TableRow key={row.id}>
                  <TableCell sx={{ fontFamily: "monospace" }}>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.event}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        color: status.color,
                        backgroundColor: status.bg,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentTicketsTable;
