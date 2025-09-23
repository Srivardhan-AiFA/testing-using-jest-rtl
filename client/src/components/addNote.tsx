import type { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { addNote } from "@/features/notes/noteSlice";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddNote() {
  const dispatch = useDispatch<AppDispatch>();

  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent full page reload
    dispatch(addNote(content));
    setContent(""); // clear input
  };

  return (
    <div>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your note here"
            className="outline-0"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="outline" type="submit" className="mt-2">
            Add note
          </Button>
        </form>
      </div>
    </div>
  );
}
