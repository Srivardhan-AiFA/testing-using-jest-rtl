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
        <p>Unauthorized in display</p>
      </div>
    );
  }

  function canDelete(user: UserType, note: SingleNote) {
    if (user?.role === "user") return note.userId === user.id;
    if (user?.role === "admin") return note.role !== "moderator";
    if (user?.role === "moderator") return note.role !== "moderator";
    return false;
  }
  function canUpdate(user: UserType, note: SingleNote) {
    // if (user?.role === "user") return note.userId === user.id;
    // if (user?.role === "admin") return note.userId === user.id;
    // if (user?.role === "moderator") return note.role !== "moderator";
    return user?.id === note.userId;
  }

  const gridColsClass =
    user.role === "moderator"
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-4 mt-5`}>
      {notes.map((note, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
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

          <div className="flex gap-2">
            {canDelete(user, note) && (
              <div>
                <Button variant="destructive" className="mt-5 cursor-pointer">
                  Delete
                </Button>
              </div>
            )}

            {canUpdate(user, note) && (
              <div>
                <Button variant="outline" className="mt-5 cursor-pointer">
                  Edit
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
