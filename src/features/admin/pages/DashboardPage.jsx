import { Box, Typography, LinearProgress } from "@mui/material";

import { Ticket, TicketCheck, TicketX, Wallet, BarChart3 } from "lucide-react";

import AdminLayout from "../components/AdminLayout";

const DashboardPage = () => {
  /*
   * ============================================================
   * DATA DASHBOARD
   * ============================================================
   *
   * Nantinya data ini diganti dengan response dari API.
   */

  const dashboardData = {
    totalTickets: 1248,

    remainingTickets: 406,

    soldTickets: 842,

    sales: 84200000,
  };

  /*
   * ============================================================
   * DATA PENJUALAN PER JENIS TIKET
   * ============================================================
   */

  const ticketTypes = [
    {
      id: 1,
      name: "5K",
      total: 500,
      sold: 342,
      remaining: 158,
    },

    {
      id: 2,
      name: "10K",
      total: 400,
      sold: 286,
      remaining: 114,
    },

    {
      id: 3,
      name: "VIP",
      total: 200,
      sold: 154,
      remaining: 46,
    },

    {
      id: 4,
      name: "Family",
      total: 148,
      sold: 60,
      remaining: 88,
    },
  ];

  /*
   * ============================================================
   * FORMAT RUPIAH
   * ============================================================
   */

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  /*
   * ============================================================
   * PERSENTASE TIKET TERJUAL
   * ============================================================
   */

  const soldPercentage =
    (dashboardData.soldTickets / dashboardData.totalTickets) * 100;

  /*
   * ============================================================
   * STATISTIC CARD DATA
   * ============================================================
   */

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
    },
  ];

  return (
    <AdminLayout>
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <Box
          sx={{
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "22px",
                sm: "24px",
                md: "26px",
              },

              fontWeight: 700,

              lineHeight: 1.2,

              color: "text.primary",
            }}
          >
            Dashboard
          </Typography>

          <Typography
            sx={{
              mt: 0.6,

              fontSize: {
                xs: "11px",
                sm: "12px",
              },

              color: "text.secondary",
            }}
          >
            Ringkasan aktivitas sistem ticketing.
          </Typography>
        </Box>

        {/* =====================================================
            STATISTIC CARDS
        ====================================================== */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",

              sm: "repeat(2, 1fr)",

              lg: "repeat(4, 1fr)",
            },

            gap: 1.75,

            mb: 1.75,
          }}
        >
          {statistics.map((item) => (
            <Box
              key={item.title}
              sx={{
                minHeight: 118,

                backgroundColor: "#FFFFFF",

                border: "1px solid",

                borderColor: "border.main",

                borderRadius: "10px",

                px: 2,

                py: 1.75,

                boxSizing: "border-box",

                position: "relative",
              }}
            >
              {/* ==========================================
                    ICON
                =========================================== */}

              <Box
                sx={{
                  position: "absolute",

                  top: 14,

                  right: 14,

                  width: 34,

                  height: 34,

                  borderRadius: "8px",

                  backgroundColor: item.iconBackground,

                  color: "primary.main",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>

              {/* ==========================================
                    TITLE
                =========================================== */}

              <Typography
                sx={{
                  fontSize: "12px",

                  fontWeight: 500,

                  color: "text.secondary",

                  pr: 5,
                }}
              >
                {item.title}
              </Typography>

              {/* ==========================================
                    VALUE
                =========================================== */}

              <Typography
                sx={{
                  mt: 0.55,

                  fontSize:
                    item.title === "Penjualan"
                      ? {
                          xs: "19px",
                          sm: "20px",
                          md: "21px",
                        }
                      : {
                          xs: "23px",
                          sm: "24px",
                          md: "25px",
                        },

                  fontWeight: 700,

                  lineHeight: 1.2,

                  color: "text.primary",

                  whiteSpace: "nowrap",
                }}
              >
                {item.value}
              </Typography>

              {/* ==========================================
                    DESCRIPTION
                =========================================== */}

              <Typography
                sx={{
                  mt: 1,

                  fontSize: "11px",

                  color: "text.secondary",
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* =====================================================
            BOTTOM SECTION
        ====================================================== */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",

              lg: "minmax(0, 1.55fr) minmax(350px, 1fr)",
            },

            gap: 1.75,

            alignItems: "start",
          }}
        >
          {/* =================================================
              TICKET OVERVIEW
          ================================================== */}

          <Box
            sx={{
              minHeight: 330,

              backgroundColor: "#FFFFFF",

              border: "1px solid",

              borderColor: "border.main",

              borderRadius: "10px",

              p: 2,

              boxSizing: "border-box",
            }}
          >
            {/* HEADER */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 1.2,

                mb: 2.2,
              }}
            >
              <Box
                sx={{
                  width: 34,

                  height: 34,

                  borderRadius: "8px",

                  backgroundColor: "#E4E3FF",

                  color: "primary.main",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  flexShrink: 0,
                }}
              >
                <BarChart3 size={19} strokeWidth={2} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",

                    fontWeight: 600,

                    color: "text.primary",
                  }}
                >
                  Ticket Overview
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,

                    fontSize: "11px",

                    color: "text.secondary",
                  }}
                >
                  Ringkasan status tiket.
                </Typography>
              </Box>
            </Box>

            {/* ==============================================
                SUMMARY
            =============================================== */}

            <Box
              sx={{
                display: "grid",

                gridTemplateColumns: "repeat(3, 1fr)",

                gap: 1.2,

                mb: 2.5,
              }}
            >
              {/* TOTAL */}

              <Box
                sx={{
                  backgroundColor: "#F7F8FA",

                  borderRadius: "9px",

                  p: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "10px",

                    color: "text.secondary",
                  }}
                >
                  Total
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,

                    fontSize: "20px",

                    fontWeight: 700,

                    color: "text.primary",
                  }}
                >
                  {dashboardData.totalTickets.toLocaleString("id-ID")}
                </Typography>
              </Box>

              {/* TERJUAL */}

              <Box
                sx={{
                  backgroundColor: "#F1FAF5",

                  borderRadius: "9px",

                  p: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "10px",

                    color: "text.secondary",
                  }}
                >
                  Terjual
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,

                    fontSize: "20px",

                    fontWeight: 700,

                    color: "status.success",
                  }}
                >
                  {dashboardData.soldTickets.toLocaleString("id-ID")}
                </Typography>
              </Box>

              {/* SISA */}

              <Box
                sx={{
                  backgroundColor: "#FFF8ED",

                  borderRadius: "9px",

                  p: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "10px",

                    color: "text.secondary",
                  }}
                >
                  Sisa
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,

                    fontSize: "20px",

                    fontWeight: 700,

                    color: "status.warning",
                  }}
                >
                  {dashboardData.remainingTickets.toLocaleString("id-ID")}
                </Typography>
              </Box>
            </Box>

            {/* ==============================================
                PROGRESS
            =============================================== */}

            <Box
              sx={{
                mt: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  justifyContent: "space-between",

                  alignItems: "center",

                  mb: 0.8,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "11px",

                    color: "text.secondary",
                  }}
                >
                  Persentase tiket terjual
                </Typography>

                <Typography
                  sx={{
                    fontSize: "11px",

                    fontWeight: 600,

                    color: "text.primary",
                  }}
                >
                  {Math.round(soldPercentage)}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={soldPercentage}
                sx={{
                  height: 8,

                  borderRadius: "10px",

                  backgroundColor: "#E6E9ED",

                  "& .MuiLinearProgress-bar": {
                    borderRadius: "10px",

                    backgroundColor: "primary.main",
                  },
                }}
              />
            </Box>

            {/* ==============================================
                STATUS
            =============================================== */}

            <Box
              sx={{
                mt: 3,

                p: 1.7,

                borderRadius: "9px",

                backgroundColor: "#F7F8FA",
              }}
            >
              <Typography
                sx={{
                  fontSize: "11px",

                  fontWeight: 600,

                  color: "text.primary",

                  mb: 0.5,
                }}
              >
                Status Penjualan
              </Typography>

              <Typography
                sx={{
                  fontSize: "11px",

                  lineHeight: 1.6,

                  color: "text.secondary",
                }}
              >
                Sebanyak{" "}
                <strong>
                  {dashboardData.soldTickets.toLocaleString("id-ID")}
                </strong>{" "}
                tiket sudah terjual dari total{" "}
                <strong>
                  {dashboardData.totalTickets.toLocaleString("id-ID")}
                </strong>{" "}
                tiket.
              </Typography>
            </Box>
          </Box>

          {/* =================================================
              PENJUALAN PER JENIS TIKET
          ================================================== */}

          <Box
            sx={{
              backgroundColor: "#FFFFFF",

              border: "1px solid",

              borderColor: "border.main",

              borderRadius: "10px",

              p: 2,

              boxSizing: "border-box",

              /*
               * Tidak menggunakan height tetap.
               * Kalau ticketTypes bertambah,
               * box akan memanjang ke bawah.
               */
            }}
          >
            {/* HEADER */}

            <Box
              sx={{
                mb: 2.2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",

                  fontWeight: 600,

                  color: "text.primary",
                }}
              >
                Penjualan Tiket
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,

                  fontSize: "11px",

                  color: "text.secondary",
                }}
              >
                Penjualan berdasarkan jenis tiket.
              </Typography>
            </Box>

            {/* TABLE HEADER */}

            <Box
              sx={{
                display: "grid",

                gridTemplateColumns: "minmax(100px, 1fr) 65px 65px",

                gap: 1,

                px: 1,

                pb: 1,

                borderBottom: "1px solid",

                borderColor: "border.main",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",

                  fontWeight: 500,

                  color: "text.secondary",
                }}
              >
                Jenis Tiket
              </Typography>

              <Typography
                sx={{
                  fontSize: "10px",

                  fontWeight: 500,

                  color: "text.secondary",

                  textAlign: "right",
                }}
              >
                Terjual
              </Typography>

              <Typography
                sx={{
                  fontSize: "10px",

                  fontWeight: 500,

                  color: "text.secondary",

                  textAlign: "right",
                }}
              >
                Sisa
              </Typography>
            </Box>

            {/* ==============================================
                TICKET LIST
            =============================================== */}

            <Box
              sx={{
                display: "flex",

                flexDirection: "column",
              }}
            >
              {ticketTypes.map((ticket) => {
                const percentage = (ticket.sold / ticket.total) * 100;

                return (
                  <Box
                    key={ticket.id}
                    sx={{
                      py: 1.5,

                      px: 1,

                      borderBottom: "1px solid",

                      borderColor: "#EEF1F4",
                    }}
                  >
                    {/* TOP ROW */}

                    <Box
                      sx={{
                        display: "grid",

                        gridTemplateColumns: "minmax(100px, 1fr) 65px 65px",

                        gap: 1,

                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",

                          fontWeight: 600,

                          color: "text.primary",
                        }}
                      >
                        {ticket.name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "11px",

                          fontWeight: 600,

                          textAlign: "right",

                          color: "status.success",
                        }}
                      >
                        {ticket.sold}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "11px",

                          fontWeight: 600,

                          textAlign: "right",

                          color: "status.warning",
                        }}
                      >
                        {ticket.remaining}
                      </Typography>
                    </Box>

                    {/* PROGRESS */}

                    <Box
                      sx={{
                        mt: 1,

                        display: "flex",

                        alignItems: "center",

                        gap: 1,
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          flex: 1,

                          height: 6,

                          borderRadius: "10px",

                          backgroundColor: "#E6E9ED",

                          "& .MuiLinearProgress-bar": {
                            borderRadius: "10px",

                            backgroundColor: "primary.main",
                          },
                        }}
                      />

                      <Typography
                        sx={{
                          minWidth: 34,

                          fontSize: "10px",

                          color: "text.secondary",

                          textAlign: "right",
                        }}
                      >
                        {Math.round(percentage)}%
                      </Typography>
                    </Box>

                    {/* TOTAL KUOTA */}

                    <Typography
                      sx={{
                        mt: 0.7,

                        fontSize: "10px",

                        color: "text.secondary",
                      }}
                    >
                      Total kuota: {ticket.total.toLocaleString("id-ID")}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* =====================================================
            EXTRA CONTENT / FUTURE
        ====================================================== */}

        {/*
          Nanti kalau ingin menambahkan:

          - Grafik penjualan
          - Transaksi terbaru
          - Event terpopuler
          - Pendapatan per hari
          - Tiket hampir habis

          letakkan di sini.

          Halaman akan otomatis bertambah panjang
          dan browser akan menyediakan vertical scroll.
        */}
      </Box>
    </AdminLayout>
  );
};

export default DashboardPage;
