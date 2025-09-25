import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AdminDashboard from "./AdminDashboard";
import ModeratorDashboard from "./ModeratorDashboard";
import UserDashboard from "./UserDashboard";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { updateUser } from "@/features/auth/authSlice";
import { getNotes } from "@/features/notes/noteSlice";

export interface JwtPayload {
  id: string;
  username: string;
  role: "user" | "admin" | "moderator";
}

export default function Dashboard() {
  console.log(1);
  const navigate = useNavigate();

  const [user, setUser] = useState<JwtPayload | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  // Get token from URL or localStorage and decode
  useEffect(() => {
    // Get token once from URL or localStorage
    console.log(2);

    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");
    const storedToken = localStorage.getItem("token");

    const jwtToken = tokenFromURL || storedToken;
    console.log("jwtToken", jwtToken);

    if (!jwtToken) {
      navigate("/signin");
      return;
    }

    // Save only if new
    if (tokenFromURL) {
      console.log(3);
      localStorage.setItem("token", jwtToken);
      // Strip the token from the URL after storing
      window.history.replaceState({}, document.title, "/dashboard");
    }

    try {
      console.log(4);

      const decoded: JwtPayload = jwt_decode(jwtToken);
      console.log("decoded", decoded);
      setUser(decoded);
      console.log("user none");
      console.log("user", user);
      dispatch(updateUser(decoded));
    } catch (err) {
      console.log(5);

      console.error("Invalid token", err);
      navigate("/signin");
    }
  }, [navigate, dispatch]);
  console.log(6);

  useEffect(() => {
    console.log(7);

    dispatch(getNotes()); // ✅ only once
  }, [dispatch]);
  console.log(8);

  useEffect(() => {
    if (user) {
      setUser(user);
      console.log("user after update:", user);
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
