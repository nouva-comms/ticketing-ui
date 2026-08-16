import { Box, Typography } from "@mui/material";
import UiBaseIcon from "../../../components/ui/UiBaseIcon";
import { Calendar, Clock, Map } from "lucide-react";


const TicketHeader = ({
  title = "ARTJOG 2026 - ARS LONGA GENERATIO",
  dateRange = "19 Juni - 30 Agustus 2026",
  time = "10:00 - 22:00",
  location = "Jogja National Museum, Kota Yogyakarta, Daerah Istimewa Yogyakarta",
}) => {
  const InfoRow = ({ icon, children }) => (
    <Box sx={{ display: "flex", gap: 0.75, alignItems: "flex-start" }}>
      <UiBaseIcon variant="default">{icon}</UiBaseIcon>
      <Typography sx={{ color: "text.secondary", fontSize: "14px" }}>
        {children}
      </Typography>
    </Box>
  );

  return (
    <Box
      className="ticket-header"
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Typography
        sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.35rem" } }}
      >
        {title}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, alignItems: "center" }}>
        <InfoRow icon={<Calendar size={16} />}>{dateRange}</InfoRow>
        <Typography sx={{ color: "text.secondary" }}>•</Typography>
        <InfoRow icon={<Clock size={16} />}>{time}</InfoRow>
      </Box>

      <InfoRow icon={<Map />}>{location}</InfoRow>
    </Box>
  );
};

export default TicketHeader;