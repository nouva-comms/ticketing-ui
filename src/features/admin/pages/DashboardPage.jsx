import { Box, Typography } from "@mui/material";
import { Ticket, TicketCheck, TicketX, Wallet, BarChart3 } from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import UiCard from "../../../components/ui/UiCard";
import UiCardHeader from "../../../components/ui/UiCardHeader";
import UiStatCard from "../../../components/ui/UiStatCard";
import UiSummaryBox from "../../../components/ui/UiSummaryBox";
import UiProgressBar from "../../../components/ui/UiProgressBar";

// CONTOH REFERENSI — silakan sesuaikan path import sesuai struktur folder final.

const DashboardPage = () => {
  const dashboardData = {
    totalTickets: 1248,
    remainingTickets: 406,
    soldTickets: 842,
    sales: 84200000,
  };

  const ticketTypes = [
    { id: 1, name: "5K", total: 500, sold: 342, remaining: 158 },
    { id: 2, name: "10K", total: 400, sold: 286, remaining: 114 },
    { id: 3, name: "VIP", total: 200, sold: 154, remaining: 46 },
    { id: 4, name: "Family", total: 148, sold: 60, remaining: 88 },
  ];

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

  const soldPercentage = (dashboardData.soldTickets / dashboardData.totalTickets) * 100;

  const statistics = [
    {
      title: "Total Tiket",
      value: dashboardData.totalTickets.toLocaleString("id-ID"),
      description: "Total kuota seluruh tiket",
      icon: <Ticket size={20} strokeWidth={2} />,
      iconBackground: "#E4E3FF",
    },
    {
      title: "Sisa Tiket",
      value: dashboardData.remainingTickets.toLocaleString("id-ID"),
      description: "Tiket yang masih tersedia",
      icon: <TicketX size={20} strokeWidth={2} />,
      iconBackground: "#FFF0D9",
    },
    {
      title: "Tiket Terjual",
      value: dashboardData.soldTickets.toLocaleString("id-ID"),
      description: "Tiket yang sudah terjual",
      icon: <TicketCheck size={20} strokeWidth={2} />,
      iconBackground: "#DFF5E9",
    },
    {
      title: "Penjualan",
      value: formatRupiah(dashboardData.sales),
      description: "Total nilai transaksi",
      icon: <Wallet size={20} strokeWidth={2} />,
      iconBackground: "#E4F3F5",
      valueFontSize: { xs: "19px", sm: "20px", md: "21px" },
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        {/* HEADER */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: { xs: "22px", sm: "24px", md: "26px" }, fontWeight: 700, lineHeight: 1.2, color: "text.primary" }}>
            Dashboard
          </Typography>
          <Typography sx={{ mt: 0.6, fontSize: { xs: "11px", sm: "12px" }, color: "text.secondary" }}>
            Ringkasan aktivitas sistem ticketing.
          </Typography>
        </Box>

        {/* STATISTIC CARDS — sebelumnya ~90 baris JSX manual, sekarang tinggal .map() */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 1.75, mb: 1.75 }}>
          {statistics.map((item) => (
            <UiStatCard key={item.title} {...item} />
          ))}
        </Box>

        {/* BOTTOM SECTION */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.55fr) minmax(350px, 1fr)" }, gap: 1.75, alignItems: "start" }}>
          {/* TICKET OVERVIEW */}
          <UiCard minHeight={330}>
            <UiCardHeader
              icon={<BarChart3 size={19} strokeWidth={2} />}
              iconBackground="#E4E3FF"
              title="Ticket Overview"
              description="Ringkasan status tiket."
            />

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.2, mb: 2.5 }}>
              <UiSummaryBox label="Total" value={dashboardData.totalTickets.toLocaleString("id-ID")} background="#F7F8FA" />
              <UiSummaryBox label="Terjual" value={dashboardData.soldTickets.toLocaleString("id-ID")} background="#F1FAF5" valueColor="status.success" />
              <UiSummaryBox label="Sisa" value={dashboardData.remainingTickets.toLocaleString("id-ID")} background="#FFF8ED" valueColor="status.warning" />
            </Box>

            <UiProgressBar value={soldPercentage} label="Persentase tiket terjual" />

            <Box sx={{ mt: 3, p: 1.7, borderRadius: "9px", backgroundColor: "#F7F8FA" }}>
              <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "text.primary", mb: 0.5 }}>
                Status Penjualan
              </Typography>
              <Typography sx={{ fontSize: "11px", lineHeight: 1.6, color: "text.secondary" }}>
                Sebanyak <strong>{dashboardData.soldTickets.toLocaleString("id-ID")}</strong> tiket sudah terjual dari
                total <strong>{dashboardData.totalTickets.toLocaleString("id-ID")}</strong> tiket.
              </Typography>
            </Box>
          </UiCard>

          {/* PENJUALAN PER JENIS TIKET */}
          <UiCard>
            <Box sx={{ mb: 2.2 }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "text.primary" }}>
                Penjualan Tiket
              </Typography>
              <Typography sx={{ mt: 0.4, fontSize: "11px", color: "text.secondary" }}>
                Penjualan berdasarkan jenis tiket.
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "minmax(100px, 1fr) 65px 65px", gap: 1, px: 1, pb: 1, borderBottom: "1px solid", borderColor: "border.main" }}>
              <Typography sx={{ fontSize: "10px", fontWeight: 500, color: "text.secondary" }}>Jenis Tiket</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: 500, color: "text.secondary", textAlign: "right" }}>Terjual</Typography>
              <Typography sx={{ fontSize: "10px", fontWeight: 500, color: "text.secondary", textAlign: "right" }}>Sisa</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {ticketTypes.map((ticket) => {
                const percentage = (ticket.sold / ticket.total) * 100;
                return (
                  <Box key={ticket.id} sx={{ py: 1.5, px: 1, borderBottom: "1px solid", borderColor: "#EEF1F4" }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "minmax(100px, 1fr) 65px 65px", gap: 1, alignItems: "center" }}>
                      <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "text.primary" }}>{ticket.name}</Typography>
                      <Typography sx={{ fontSize: "11px", fontWeight: 600, textAlign: "right", color: "status.success" }}>{ticket.sold}</Typography>
                      <Typography sx={{ fontSize: "11px", fontWeight: 600, textAlign: "right", color: "status.warning" }}>{ticket.remaining}</Typography>
                    </Box>

                    <Box sx={{ mt: 1 }}>
                      <UiProgressBar value={percentage} height={6} labelPosition="right" />
                    </Box>

                    <Typography sx={{ mt: 0.7, fontSize: "10px", color: "text.secondary" }}>
                      Total kuota: {ticket.total.toLocaleString("id-ID")}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </UiCard>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default DashboardPage;