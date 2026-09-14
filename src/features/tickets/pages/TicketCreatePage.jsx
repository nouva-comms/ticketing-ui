import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import TicketStepper from "../components/TicketStepper";
import TicketHeader from "../components/TicketHeader";
import TicketForm from "../components/TicketForm";
import TicketFooter from "../components/TicketFooter";
import PaymentPendingCard from "../components/PaymentPendingCard";
import UiSummaryCard from "../../../components/ui/UiSummaryCard";
import { createQrisPayment, checkPaymentStatus } from "../utils/paymentApi";
import { submitRegistration } from "../../../services/registrationApi";

const QR_STEP = 2;

const TicketCreatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formState, setFormState] = useState(null);
  const formRef = useRef(null);
  const formStateRef = useRef(null);

  const [qrisData, setQrisData] = useState(null);
  const [qrisLoading, setQrisLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const orderIdRef = useRef(null);
  const hasConfirmedRef = useRef(false);
  const secondsLeftRef = useRef(60);

  const {
    ticketCategoryId,
    eventName = "",
    categoryName = "",
    price = 0,
    dateRange = "",
    time = "",
    venue = "",
  } = location.state || {};

  const ORDER_ITEMS = [{ name: `${categoryName} - ${eventName}`, qty: 1, price }];

  const activeStep = parseInt(searchParams.get("step") || "0", 10);
  const isPaymentStep = activeStep === QR_STEP;

  const total = ORDER_ITEMS.reduce((sum, it) => sum + it.price * it.qty, 0);

  // formStateRef selalu ikut nilai terbaru — supaya kode di dalam setInterval
  // (yang dipanggil lama setelah fungsi ini dibuat) tidak baca data yang basi.
  useEffect(() => {
    formStateRef.current = formState;
    console.log("formState terupdate:", formState);
  }, [formState]);

  useEffect(() => {
    secondsLeftRef.current = secondsLeft;
  }, [secondsLeft]);

  // Kalau halaman ini dibuka langsung tanpa lewat "Detail Kategori" (tidak ada ticketCategoryId),
  // tidak ada yang bisa didaftarkan — balik ke homepage.
  useEffect(() => {
    if (!ticketCategoryId) {
      navigate("/", { replace: true });
    }
  }, [ticketCategoryId, navigate]);

  // Bikin transaksi QRIS baru setiap kali masuk step pembayaran, atau setiap klik "refresh".
  useEffect(() => {
    if (!isPaymentStep) return;

    setQrisData(null);
    setSecondsLeft(60);
    hasConfirmedRef.current = false;

    const orderId = `NOUVA-${Date.now()}`;
    orderIdRef.current = orderId;

    setQrisLoading(true);
    createQrisPayment(orderId, total)
      .then((data) => setQrisData(data))
      .catch((err) => console.error("Gagal membuat transaksi QRIS:", err))
      .finally(() => setQrisLoading(false));
  }, [isPaymentStep, refreshKey, total]);

  // Countdown 1 menit.
  useEffect(() => {
    if (!isPaymentStep || !qrisData) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaymentStep, qrisData]);

  // Polling status pembayaran ke Pakasir tiap 4 detik.
  useEffect(() => {
    if (!isPaymentStep || !qrisData) return;

    const interval = setInterval(async () => {
      if (hasConfirmedRef.current || secondsLeftRef.current <= 0) return;

      try {
        const { status } = await checkPaymentStatus(qrisData.orderId, qrisData.amount);
        if (status === "completed" && !hasConfirmedRef.current) {
          hasConfirmedRef.current = true;
          const success = await handlePaymentConfirmed();
          if (success) {
            clearInterval(interval);
          } else {
            hasConfirmedRef.current = false; // gagal simpan, boleh dicoba lagi tick berikutnya
          }
        }
      } catch (err) {
        console.error("Gagal cek status pembayaran:", err);
      }
    }, 4000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaymentStep, qrisData]);

  const handleContinue = () => {
    const isValid = formRef.current?.validateCurrentStep?.() ?? true;
    if (!isValid) return;

    if (activeStep < QR_STEP) {
      setSearchParams({ step: (activeStep + 1).toString() }, { state: location.state });
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setSearchParams({ step: (activeStep - 1).toString() }, { state: location.state });
    }
  };

  const handleRefreshQr = () => {
    setRefreshKey((k) => k + 1);
  };

  // Return true kalau sukses, false kalau gagal — dipakai buat tahu apakah boleh
  // hentikan polling atau harus dicoba lagi tick berikutnya.
  const handlePaymentConfirmed = async () => {
    setSubmitError("");
    setSubmitting(true);

    try {
      const buyer = formStateRef.current?.buyer || {};
      const ticket = formStateRef.current?.tickets?.[0] || {};

      await submitRegistration({
        ticketCategoryId,
        fullName: buyer.name,
        identityTypeID: buyer.identityType,
        identityNumber: buyer.identityNumber,
        email: buyer.email,
        phoneNumber: buyer.whatsapp,
        genderId: Number(ticket.gender),
        sizeId: Number(ticket.shirtSize),
        city: ticket.city,
        bloodType: ticket.bloodType,
        diseases: ticket.disease || undefined,
        emergencyNumber: ticket.emergencyContact,
        bibName: ticket.bibName,
        address: ticket.address,
        totalPayment: total,
      });
      console.log("SAAT SUBMIT - formStateRef.current:", formStateRef.current); console.log("SAAT SUBMIT - buyer:", buyer, "ticket:", ticket);

      navigate("/tickets/payment-success", {
        state: { buyer, items: ORDER_ITEMS, total },
      });
      return true;
    } catch (err) {
      setSubmitError(err.message || "Gagal menyimpan pendaftaran. Akan dicoba lagi otomatis.");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  if (!ticketCategoryId) return null;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <TicketStepper activeStep={activeStep} />

      <Box sx={{ maxWidth: 1180, mx: "auto", px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 3 } }}>
        {isPaymentStep ? (
          <>
            <PaymentPendingCard
              eventName={ORDER_ITEMS[0]?.name}
              qrisPayload={qrisData?.qrisPayload}
              loading={qrisLoading}
              secondsLeft={secondsLeft}
              expired={secondsLeft <= 0 && !!qrisData}
              onRefresh={handleRefreshQr}
            />
            {submitting && (
              <Typography sx={{ textAlign: "center", color: "text.secondary", fontSize: 13 }}>
                Menyimpan pendaftaran...
              </Typography>
            )}
            {submitError && (
              <Typography sx={{ textAlign: "center", color: "#F44336", fontSize: 13, mt: 1 }}>
                {submitError}
              </Typography>
            )}
          </>
        ) : (
          <>
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
              <TicketHeader
                title={`${eventName} - ${categoryName}`}
                dateRange={dateRange}
                time={time}
                location={venue}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, alignItems: "flex-start" }}>
              <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
                <TicketForm ref={formRef} activeStep={activeStep} items={ORDER_ITEMS} onStateChange={setFormState} />
              </Box>

              <Box sx={{ display: { xs: "none", md: "block" }, width: 340, flexShrink: 0, position: "sticky", top: 24 }}>
                <UiSummaryCard items={ORDER_ITEMS} onAction={handleContinue} onBack={activeStep > 0 ? handleBack : null} />
              </Box>
            </Box>
          </>
        )}
      </Box>

      {!isPaymentStep && (
        <TicketFooter total={total} onAction={handleContinue} onBack={activeStep > 0 ? handleBack : null} />
      )}
    </Box>
  );
};

export default TicketCreatePage;