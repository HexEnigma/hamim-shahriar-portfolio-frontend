import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/Skeleton";

export default function ProtectedRoute() {
  const { isOwner, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Spinner fullPage />;                                   // no flash of login or admin UI
  if (!isOwner) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}