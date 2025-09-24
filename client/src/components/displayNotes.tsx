import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import type { SingleNote } from "@/types/user.type";
import type { AuthState } from "@/features/auth/authSlice";

type UserType = AuthState["user"];

export default function DisplayNotes() {
  const notes = useSelector((state: RootState) => state.notes.notes ?? []);
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    return (
      <div>
        <p>Unauthorized</p>
      </div>
    );
  }

  function canDelete(user: UserType, note: SingleNote) {
    if (user?.role === "user") return note.userId === user._id;
    if (user?.role === "admin") return note.role !== "moderator";
    if (user?.role === "moderator") return true;
    return false;
  }

  const gridColsClass =
    user.role === "moderator"
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-4 mt-5`}>
      {notes.map((note) => (
        <div
          key={note._id}
          className="p-4 border rounded-lg shadow-sm bg-white"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">{note.name}</h2>
            <span
              className={`text-xs uppercase ${
                note.role === "admin"
                  ? "text-red-500 font-bold"
                  : note.role === "moderator"
                  ? "text-purple-500 font-bold"
                  : "text-gray-500 font-bold"
              }`}
            >
              {note.role}
            </span>
          </div>
          <p className="text-gray-700">{note.content}</p>

          {canDelete(user, note) && (
            <div>
              <Button variant="destructive" className="mt-5">
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
