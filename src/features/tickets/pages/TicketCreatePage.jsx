import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import TicketStepper from "../components/TicketStepper";
import TicketHeader from "../components/TicketHeader";
import TicketForm from "../components/TicketForm";
import TicketFooter from "../components/TicketFooter";
import UiCountdown from "../../../components/ui/UiCountdown";
import UiSummaryCard from "../../../components/ui/UiSummaryCard";

const ORDER_ITEMS = [{ name: "CHILD - TICKETS ARTJOG", qty: 1, price: 50000 }];

const TicketCreatePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formState, setFormState] = useState(null);
  const formRef = useRef(null);

  const activeStep = parseInt(searchParams.get("step") || "0", 10);

  const total = ORDER_ITEMS.reduce((sum, it) => sum + it.price * it.qty, 0);

  const handleContinue = () => {
    if (formRef.current && !formRef.current.validateCurrentStep()) {
      return;
    }
    
    const nextStep = activeStep + 1;
    setSearchParams({ step: nextStep.toString() });
    // navigate("/tickets/payment-success", {
    //   state: {
    //     buyer: formState?.buyer,
    //     items: ORDER_ITEMS,
    //     total,
    //   },
    // });
  };

  const handleBack = () => {
    if (activeStep > 0) {
      const prevStep = activeStep - 1;
      setSearchParams({ step: prevStep.toString() });
    }
  }

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
            <UiSummaryCard items={ORDER_ITEMS} onAction={handleContinue} onBack={activeStep > 0 ? handleBack : null} />
          </Box>
        </Box>
      </Box>

      <TicketFooter total={total} onAction={handleContinue} onBack={activeStep > 0 ? handleBack : null} />
    </Box>
  );
};

export default TicketCreatePage;