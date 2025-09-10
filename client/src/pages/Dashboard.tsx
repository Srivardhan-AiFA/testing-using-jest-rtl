import { Button } from "@/components/ui/button";
import { addNote, getNotes } from "@/features/notes/noteSlice";
import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import type { SingleNote } from "@/types/user.type";
import Note from "@/components/note";
export default function Dashboard() {
  const [note, setNote] = useState<SingleNote>({
    _id: "",
    title: "",
    content: "",
    category: "",
    isFavorite: false,
    userId: "",
    createdAt: "",
    updatedAt: "",
  });

  const { notes, loading, error } = useSelector(
    (state: RootState) => state.notes
  );
  console.log("notes", notes);

  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setNote((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleSubmit = () => {
    if (!note.content) return;
    dispatch(addNote(note));
    setNote({ ...note, title: "", content: "" });
    setText("");
  };

  return (
    <div>
      <div className="border-2 max-w-1/2 m-auto mt-10 p-3 rounded-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Title"
            className="w-11/12 border-0 outline-0 text-xl outfit"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            className="resize-none overflow-hidden mt-2 border-0 rounded-md w-11/12 outline-0 text-sm inter"
            rows={1}
            placeholder="Take a note..."
          />
          <Button
            type="submit"
            className="px-2 bg-[#ea4335] hover:bg-[#eb3d2d] text-xs cursor-pointer rounded-md mt-2"
          >
            Add Note
          </Button>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && notes.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No notes available</p>
      )}

      {notes.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          {notes.map((note, index) => {
            const colors = ["#77a4eb", "#56df7a", "#f3c849", "#f36457"];
            const bgColor = colors[index % colors.length];
            return <Note key={index} note={note} bgColor={bgColor} />;
          })}
        </div>
      )}
    </div>
  );
}
