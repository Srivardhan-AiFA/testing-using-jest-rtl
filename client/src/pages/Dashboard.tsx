import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AdminDashboard from "./AdminDashboard";
import ModeratorDashboard from "./ModeratorDashboard";
import UserDashboard from "./UserDashboard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { setUser, updateUser } from "@/features/auth/authSlice";
import { getNotes } from "@/features/notes/noteSlice";
import type { Role } from "@/types/user.type";

export interface JwtPayload {
  id: string;
  username: string;
  role: Role;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch<AppDispatch>();

  // Get token from URL or localStorage and decode
  useEffect(() => {
    // Get token once from URL or localStorage

    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");
    const storedToken = localStorage.getItem("token");

    const jwtToken = tokenFromURL || storedToken;

    if (!jwtToken) {
      navigate("/signin");
      return;
    }
    localStorage.setItem("token", jwtToken);

    if (tokenFromURL) {
      localStorage.setItem("token", jwtToken);
      window.history.replaceState({}, document.title, "/dashboard");
    }

    try {
      const decoded: JwtPayload = jwt_decode(jwtToken);
      setUser(decoded);
      dispatch(updateUser(decoded));
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/signin");
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Render dashboard based on role
  const renderDashboard = () => {
    switch (user.role) {
      case "user":
        return <UserDashboard />;
      case "admin":
        return <AdminDashboard />;
      case "moderator":
        return <ModeratorDashboard />;
      default:
        return <div>Role not recognized</div>;
    }
  };

  return (
    <div className="max-w-8/12 mx-auto">
      <div className="mt-5">
        <h1 className="text-6xl">
          Welcome{" "}
          <span className="font-medium">
            {user.username[0].toUpperCase()}
            {user.username.slice(1)}
          </span>
        </h1>
        <h5 className="text-gray-500 text-md font-semibold ml-1 uppercase">
          {user.role}
        </h5>
      </div>
      <div className="mt-8">{renderDashboard()}</div>
    </div>
  );
}
