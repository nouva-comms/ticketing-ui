import { Box, Typography } from "@mui/material";
import UiBaseIcon from "../../../components/ui/UiBaseIcon";
import { Calendar, Clock, Map } from "lucide-react";

const TicketHeader = () => {
  const InfoRow = ({ icon, children }) => (
    <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
      <UiBaseIcon variant="default" active={true}>
        {icon}
      </UiBaseIcon>
      <Typography sx={{ color: "text.secondary" }}>{children}</Typography>
    </Box>
  );

  const infoItems = [
    { icon: <Calendar />, text: "4 Oktober 2026" },
    { icon: <Clock />, text: "05:00 - 09:00" },
    {
      icon: <Map />,
      text: "Alun-alun engku putri, Kota Batam, Kepulauan Riau",
    },
  ];

  return (
    <Box className="ticket-header" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        KAVAYA RUN 2026 - KOTA BATAM
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        KATEGORI (panggil jangan lupa )
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {infoItems.map((it) => (
          <InfoRow key={it.text} icon={it.icon}>
            {it.text}
          </InfoRow>
        ))}
      </Box>
    </Box>
  );
};

export default TicketHeader;
