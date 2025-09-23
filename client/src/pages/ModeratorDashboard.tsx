import AddNote from "@/components/addNote";
import DisplayNotes from "@/components/displayNotes";
import ModifyPermissions from "@/components/modify-permissions";

export default function ModeratorDashboard() {
  return (
    <div className="flex gap-2">
      <div className="border-r-2 min-w-1/2">
        <ModifyPermissions />
      </div>
      <div className="min-w-1/2">
        <AddNote />
        <DisplayNotes />
      </div>
    </div>
  );
}
