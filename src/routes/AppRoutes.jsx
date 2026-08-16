import { Routes, Route } from "react-router-dom";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import EventDetailPage from "../features/dashboard/pages/EventDetailPage";
import TicketCreatePage from "../features/tickets/pages/TicketCreatePage";
import TicketDetailPage from "../features/tickets/pages/TicketDetailPage";
import LoginPage from "../features/auth/pages/LoginPage";
import AdminDashboardPage from "../features/admin/pages/DashboardPage";
import CreateEventPage from "../features/admin/pages/CreateEventPage";
import EventsListPage from "../features/admin/pages/EventsListPage";
import AdminEventDetailPage from "../features/admin/pages/EventDetailPage";
import PaymentSuccessPage from "../features/tickets/pages/PaymentSuccessPage";
import EventParticipantsPage from "../features/admin/pages/EventParticipantsPage";
import EventProfilePage from "../features/admin/pages/EventProfilePage";
import EventProfileEditPage from "../features/admin/pages/EventProfileEditPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/events" element={<EventsListPage />} />
      <Route path="/admin/events/create" element={<CreateEventPage />} />
      <Route path="/admin/events/:id" element={<AdminEventDetailPage />} />
      <Route path="/tickets/create" element={<TicketCreatePage />} />
      <Route path="/tickets/:id" element={<TicketDetailPage />} />
      <Route path="/tickets/payment-success" element={<PaymentSuccessPage />} />
      <Route path="/admin/events/:id/participants" element={<EventParticipantsPage />} />
      <Route path="/admin/events/:id/profile" element={<EventProfilePage />} />
      <Route path="/admin/events/:id/profile/edit" element={<EventProfileEditPage />} />
    </Routes>
  );
};

export default AppRoutes;