import { Routes, Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/authApi";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import PublicEventDetailPage from "../features/dashboard/pages/EventDetailPage";
import TicketCreatePage from "../features/tickets/pages/TicketCreatePage";
import TicketDetailPage from "../features/tickets/pages/TicketDetailPage";
import LoginPage from "../features/auth/pages/LoginPage";
import AdminDashboardPage from "../features/admin/pages/DashboardPage";
import EventProfilePage from "../features/admin/pages/EventProfilePage";
import EventProfileEditPage from "../features/admin/pages/EventProfileEditPage";
import CreateKategoryPage from "../features/admin/pages/CreateKategoryPage";
import KategoryListPage from "../features/admin/pages/KategoryListPage";
import KategoryDetailPage from "../features/admin/pages/KategoryDetailPage";
import PaymentSuccessPage from "../features/tickets/pages/PaymentSuccessPage";
import KategoryParticipantsPage from "../features/admin/pages/KategoryParticipantsPage";
import { getEvents } from "../features/admin/utils/eventsStorage";
import PaymentPendingPage from "../features/tickets/pages/PaymentPendingPage";

const AdminEventRedirect = () => {
  const events = getEvents();
  const firstEvent = events[0];

  if (!firstEvent) {
    return <EventProfilePage />;
  }

  return <Navigate to={`/admin/events/${firstEvent.id}/profile`} replace />;
};

const RequireAuth = ({ children }) => {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/events/:id" element={<PublicEventDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<RequireAuth><AdminDashboardPage /></RequireAuth>} />

      <Route path="/admin/events" element={<RequireAuth><AdminEventRedirect /></RequireAuth>} />
      {/* <Route path="/admin/events/create" element={<CreateKategoryPage />} /> */}
      <Route path="/admin/events/:id/profile" element={<RequireAuth><EventProfilePage /></RequireAuth>} />
      <Route path="/admin/events/:id/profile/edit" element={<RequireAuth><EventProfileEditPage /></RequireAuth>} />
      <Route path="/admin/events/:id/participants" element={<RequireAuth><KategoryParticipantsPage /></RequireAuth>} />
      <Route path="/admin/events/:id" element={<RequireAuth><EventProfilePage /></RequireAuth>} />
      
      <Route path="/admin/kategory" element={<RequireAuth><KategoryListPage /></RequireAuth>} />
      <Route path="/admin/kategory/create" element={<RequireAuth><CreateKategoryPage /></RequireAuth>} />
      <Route path="/admin/kategory/:id" element={<RequireAuth><KategoryDetailPage /></RequireAuth>} />
      <Route path="/admin/kategory/:id/participants" element={<RequireAuth><KategoryParticipantsPage /></RequireAuth>} />

      <Route path="/tickets/create" element={<TicketCreatePage />} />
      <Route path="/tickets/:id" element={<TicketDetailPage />} />
      <Route path="/tickets/payment-success" element={<PaymentSuccessPage />} />
      <Route path="/tickets/payment-pending" element={<PaymentPendingPage />} />
    </Routes>
  );
};

export default AppRoutes;