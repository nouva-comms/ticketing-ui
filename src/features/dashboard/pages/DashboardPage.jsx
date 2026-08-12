import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import EventsSection from "../components/EventsSection";
import HowItWorks from "../components/HowItWorks";
import CtaBanner from "../components/CtaBanner";
import Footer from "../../../components/layout/Footer";
import UiSlashDivider from "../../../components/ui/UiSlashDivider";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Klik "Daftar" di kartu event -> lempar ke form pendaftaran tiket,
  // sambil bawa id event-nya lewat state router.
  const handleRegister = (event) => {
    navigate("/tickets/create", { state: { eventId: event.id } });
  };

  return (
    <Box sx={{ zoom: 1.25 }}>
      <HeroSection />
      <UiSlashDivider />
      <EventsSection onRegister={handleRegister} />
      <HowItWorks />
      <CtaBanner />
      <Footer />
    </Box>
  );
};

export default DashboardPage;
