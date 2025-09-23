import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

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

  // Determine grid columns based on role
  const gridColsClass =
    user.role === "moderator"
      ? "grid-cols-1 sm:grid-cols-2" // 2 per row for moderator
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"; // default for others

  return (
    <div className={`grid ${gridColsClass} gap-4 mt-5`}>
      {notes.map((note) => (
        <div
          key={note._id}
          className="p-4 border rounded-lg shadow-sm bg-white"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">{note.name}</h2>
            <span className="text-xs text-gray-500 uppercase">{note.role}</span>
          </div>
          <p className="text-gray-700">{note.content}</p>

          {((user.role === "user" && note.userId === user._id) ||
            (user.role === "admin" && note.role !== "moderator") ||
            user.role === "moderator") && (
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
