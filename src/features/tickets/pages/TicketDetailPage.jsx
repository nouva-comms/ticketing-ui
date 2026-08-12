import { Box } from "@mui/material";
import TicketDetail from "../components/TicketDetail";
import TicketHeader from "../components/TicketHeader";

const TicketDetailPage = () => {
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
<TicketHeader/>
<TicketDetail/>

      </Box>
    </Box>
  );
};

export default TicketDetailPage;
