import { Routes, Route } from "react-router-dom";
import ApplicationLayout from "./ApplicationLayout";
import HomePage from "./pages/homepage";
import HistoryPage from "./pages/History";

export default function AppRoutes(): JSX.Element {
  return (
    // <AuthProvider>
    <Routes>
      {/* <Route index element={<LoginPage />} /> */}
      {/* <Route element={<ProtectedRoute />}> */}
      <Route element={<ApplicationLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/account" element={<p>Account</p>} />
      </Route>
      {/* </Route> */}
      <Route path="*" element={<p>Not Found</p>} />
    </Routes>
    // </AuthProvider>
  );
}
