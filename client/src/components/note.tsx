import type { SingleNote } from "@/types/user.type";
import { Heart, HeartOff, SquarePen, Trash } from "lucide-react";
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
import { addFavorite, deleteNote, editNote } from "@/features/notes/noteSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    category: note.category,
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
    note: { title: string; content: string; category: string },
    id: string
  ) => {
    dispatch(editNote({ note, id }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNote({ id }));
  };

  const handleFav = (id: string) => {
    dispatch(addFavorite({ id }));
  };

  return (
    <div
      className="border py-2 px-3 rounded-md w-1/4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-between items-center">
        <h3 className="outfit text-xl">{note.title}</h3>
        <div className="flex mt-2 items-center">
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
                    <div className="flex gap-1">
                      <span className="flex gap-1">Category: </span>
                      <input
                        type="text"
                        value={updatedNote.category}
                        className="w-11/12 border-0 outline-0 outfit"
                        onChange={(e) => {
                          setUpdatedNote({
                            ...updatedNote,
                            category: e.target.value.toLowerCase(),
                          });
                        }}
                      />
                    </div>
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
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash size={15} className="ml-3 cursor-pointer" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {" "}
                    Are you sure you want to delete?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your note.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <span
                    className="text-md rounded cursor-pointer"
                    onClick={() => {
                      handleDelete(note._id);
                    }}
                  >
                    <AlertDialogAction className="bg-red-500 hover:bg-red-600 cursor-pointer">
                      Delete
                    </AlertDialogAction>
                  </span>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <button
            // className={`ml-2 mb-0.5 cursor-pointer ${ note.isFavorite ? "bg-red-600" : "bg-gray-100" } rounded-full p-0.5`}
            className={`ml-2 mb-0.5 cursor-pointer rounded-full p-0.5`}
            onClick={() => {
              handleFav(note._id);
            }}
          >
            {note.isFavorite ? <HeartOff size={15} /> : <Heart size={15} />}
          </button>
        </div>
      </div>
      <div className="mt-2">
        <p className="inter text-sm text-gray-800">{note.content}</p>
        <p className="text-xs font-semibold mt-2 text-gray-800">
          category: <span className="capitalize">{note.category}</span>
        </p>
        <p className="text-xs text-gray-700 font-semibold mt-1">
          {note.createdAt.slice(0, 10)}
        </p>
      </div>
    </div>
  );
}
