import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import TicketStepper from "../components/TicketStepper";
import TicketHeader from "../components/TicketHeader";
import TicketForm from "../components/TicketForm";
import TicketFooter from "../components/TicketFooter";
import PaymentPendingCard from "../components/PaymentPendingCard";
import UiSummaryCard from "../../../components/ui/UiSummaryCard";

const ORDER_ITEMS = [{ name: "CHILD - TICKETS ARTJOG", qty: 1, price: 50000 }];

// index step: 0 Data Pemesan, 1 Detail Ticket, 2 Metode Pembayaran, 3 Pembayaran (QR)
const QR_STEP = 2;

const TicketCreatePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formState, setFormState] = useState(null);
  const formRef = useRef(null);

  const activeStep = parseInt(searchParams.get("step") || "0", 10);
  const isPaymentStep = activeStep === QR_STEP;


  const total = ORDER_ITEMS.reduce((sum, it) => sum + it.price * it.qty, 0);

  const handleContinue = () => {
    const isValid = formRef.current?.validateCurrentStep?.() ?? true;
    if (!isValid) return;

    if (activeStep < QR_STEP) {
      const nextStep = activeStep + 1;
      setSearchParams({ step: nextStep.toString() });
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      const prevStep = activeStep - 1;
      setSearchParams({ step: prevStep.toString() });
    }
  };

  const handleConfirmPayment = () => {
    navigate("/tickets/payment-success", {
      state: {
        buyer: formState?.buyer,
        items: ORDER_ITEMS,
        total,
      },
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <TicketStepper activeStep={activeStep} />

      <Box
        sx={{
          maxWidth: 1180,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, md: 3 },
        }}
      >
        {isPaymentStep ? (
          <PaymentPendingCard eventName={ORDER_ITEMS[0]?.name} onConfirm={handleConfirmPayment} />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 1 },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "flex-start" },
                mb: { xs: 2, md: 3 },
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <TicketHeader />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
                <TicketForm
                  ref={formRef}
                  activeStep={activeStep}
                  items={ORDER_ITEMS}
                  onStateChange={setFormState}
                />
              </Box>

              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  width: 340,
                  flexShrink: 0,
                  position: "sticky",
                  top: 24,
                }}
              >
                <UiSummaryCard
                  items={ORDER_ITEMS}
                  onAction={handleContinue}
                  onBack={activeStep > 0 ? handleBack : null}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>

      {!isPaymentStep && (
        <TicketFooter
          total={total}
          onAction={handleContinue}
          onBack={activeStep > 0 ? handleBack : null}
        />
      )}
    </Box>
  );
};

export default TicketCreatePage;