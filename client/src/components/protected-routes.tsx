import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const isLoggedin = useSelector((state: RootState) => state.user.isLoggedin);
  if (isLoggedin) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}
