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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          <Input
            type="text"
            placeholder="Talk here"
            className="outline-0 max-w-1/2"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            variant="outline"
            type="submit"
            className="w-full cursor-pointer max-w-1/2"
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
