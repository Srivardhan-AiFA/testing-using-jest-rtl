import type { AppDispatch, RootState } from "@/app/store";
import AdminDashboard from "./AdminDashboard";
import ModeratorDashboard from "./ModeratorDashboard";
import UserDashboard from "./UserDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotes } from "@/features/notes/noteSlice";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getNotes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
  }

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
      <div>{renderDashboard()}</div>
    </div>
  );
}
