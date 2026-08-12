import { Box } from "@mui/material";
import TicketHeader from "../components/TicketHeader";
import TicketStepper from "../components/TicketStepper";
import TicketForm from "../components/TicketForm";
import TicketFooter from "../components/TicketFooter";

const TicketCreatePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        px: { xs: 0, sm: 2 },
        py: { xs: 0, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 390,
          minHeight: "100vh",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <TicketStepper /> */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minHeight: 0 }}>
          <TicketHeader />
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              minHeight: 0,
              pb: 1,
            }}
          >
            <TicketForm />
          </Box>
          <TicketFooter />
        </Box>
      </Box>
    </Box>
  );
};

export default TicketCreatePage;
