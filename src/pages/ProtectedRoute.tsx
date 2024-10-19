import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/UserProvider";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
