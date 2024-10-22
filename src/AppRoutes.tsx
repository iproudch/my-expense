import { Routes, Route } from "react-router-dom";
import ApplicationLayout from "./ApplicationLayout";
import HistoryPage from "./pages/History";
import HomePage from "./pages/Homepage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/UserProvider";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function AppRoutes(): JSX.Element {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<ApplicationLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="account" element={<UserPage />} />
          </Route>
        </Route>
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </AuthProvider>
  );
}
