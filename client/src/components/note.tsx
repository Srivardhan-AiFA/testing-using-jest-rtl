import type { SingleNote } from "@/types/user.type";
import { SquarePen, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { deleteNote, editNote } from "@/features/notes/noteSlice";

type NoteProps = {
  note: SingleNote;
  bgColor: string;
};

export default function Note({ note, bgColor }: NoteProps) {
  const [text, setText] = useState(note.content);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const [updatedNote, setUpdatedNote] = useState({
    title: note.title,
    content: note.content,
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setUpdatedNote({ ...updatedNote, content: e.target.value });
  };

  const handleUpdate = (
    note: { title: string; content: string },
    id: string
  ) => {
    dispatch(editNote({ note, id }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNote({ id }));
  };

  return (
    <div
      className="border py-2 px-3 rounded-md w-1/4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-between items-center">
        <h3 className="outfit text-xl">{note.title}</h3>
        <div className="flex mt-2">
          <div>
            <Dialog>
              <DialogTrigger>
                <SquarePen size={15} className="cursor-pointer mt-1" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <input
                      type="text"
                      placeholder="Title"
                      className="w-11/12 border-0 outline-0 text-xl outfit"
                      value={updatedNote.title}
                      onChange={(e) => {
                        setUpdatedNote({
                          ...updatedNote,
                          title: e.target.value,
                        });
                      }}
                    />
                  </DialogTitle>
                  <DialogDescription>
                    <textarea
                      ref={textareaRef}
                      value={text}
                      onChange={handleChange}
                      className="resize-none overflow-hidden mt-2 border-0 rounded-md w-11/12 outline-0 text-sm inter"
                      rows={10}
                      placeholder="Take a note..."
                    />
                  </DialogDescription>
                </DialogHeader>
                <DialogTrigger>
                  <Button
                    className="cursor-pointer w-full"
                    onClick={() => handleUpdate(updatedNote, note._id)}
                  >
                    Update
                  </Button>
                </DialogTrigger>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
                <Trash size={15} className="ml-3 cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription className="flex items-center">
                    <p className="mr-3">Are you sure you want to delete?</p>
                    <DialogTrigger>
                      <span
                        className="text-md px-2 py-1 rounded bg-red-600 text-gray-200 cursor-pointer"
                        onClick={() => {
                          handleDelete(note._id);
                        }}
                      >
                        Delete
                      </span>
                    </DialogTrigger>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="inter text-sm text-gray-800">{note.content}</p>
        <p className="text-xs font-semibold mt-2 text-gray-800">
          category: {note.category}
        </p>
        <p className="text-xs text-gray-700 font-semibold mt-1">
          {note.updatedAt.slice(0, 10)}
        </p>
      </div>
    </div>
  );
}
