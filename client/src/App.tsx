import { BrowserRouter, Routes, Route } from "react-router-dom";
import TheamProvider from "./theme";
import LoginPage from "./pages/auth/login/login";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/private/home";
import ProfilePage from "./pages/private/profile";
import PublicLayout from "./layout/public-layout";
import PrivatLayout from "./layout/private-layout";
import EventsPage from "./pages/private/admin/events";
import CreateEventPage from "./pages/private/admin/events/create";
import EditEventPage from "./pages/private/admin/events/edit";
import EventInfoPage from "./pages/private/event";
import UserBookingsPage from "./pages/private/profile/booking";
import AdminBookingsPage from "./pages/private/admin/booking";
import UsersPage from "./pages/private/admin/users";
import AdminReports from "./pages/private/admin/reports";
import UserReports from "./pages/private/profile/reports/page";

function App() {
  return (
    <TheamProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />

          <Route
            path="/register"
            element={
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            }
          />

          <Route
            path="/"
            element={
              <PrivatLayout>
                <HomePage />
              </PrivatLayout>
            }
          />

          <Route
            path="/event/:id"
            element={
              <PrivatLayout>
                <EventInfoPage />
              </PrivatLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivatLayout>
                <ProfilePage />
              </PrivatLayout>
            }
          />

          <Route
            path="/profile/bookings"
            element={
              <PrivatLayout>
                <UserBookingsPage />
              </PrivatLayout>
            }
          />

          <Route
            path="/profile/reports"
            element={
              <PrivatLayout>
                <UserReports />
              </PrivatLayout>
            }
          />

          <Route
            path="/admin/events"
            element={
              <PrivatLayout>
                <EventsPage />
              </PrivatLayout>
            }
          />

          <Route
            path="/admin/events/create"
            element={
              <PrivatLayout>
                <CreateEventPage />
              </PrivatLayout>
            }
          />

          <Route
            path="/admin/events/edit/:id"
            element={
              <PrivatLayout>
                <EditEventPage />
              </PrivatLayout>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <PrivatLayout>
                <AdminBookingsPage />
              </PrivatLayout>
            }
          />

          <Route
            path="/admin/users"
            element={
              <PrivatLayout>
                <UsersPage />
              </PrivatLayout>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <PrivatLayout>
                <AdminReports />
              </PrivatLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TheamProvider>
  );
}
export default App;
