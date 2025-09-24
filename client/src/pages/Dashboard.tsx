import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AdminDashboard from "./AdminDashboard";
import ModeratorDashboard from "./ModeratorDashboard";
import UserDashboard from "./UserDashboard";

interface JwtPayload {
  id: string;
  username: string;
  role: "user" | "admin" | "moderator";
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<JwtPayload | null>(null);
  const [, setToken] = useState<string>("");

  // Get token from URL or localStorage and decode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");

    const jwtToken = tokenFromURL || localStorage.getItem("token");

    if (!jwtToken) {
      navigate("/login"); // redirect if no token
      return;
    }

    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);

    try {
      const decoded: JwtPayload = jwt_decode(jwtToken);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/login");
    }

    // Clean URL
    if (tokenFromURL) {
      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, [navigate]);

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
