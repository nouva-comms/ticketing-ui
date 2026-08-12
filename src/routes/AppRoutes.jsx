import { Routes, Route } from "react-router-dom";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import TicketCreatePage from "../features/tickets/pages/TicketCreatePage";
import TicketDetailPage from "../features/tickets/pages/TicketDetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/tickets/create" element={<TicketCreatePage />} />
      <Route path="/tickets/:id" element={<TicketDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
