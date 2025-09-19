import { Button } from "@/components/ui/button";
import { addNote, getNotes } from "@/features/notes/noteSlice";
import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import type { SingleNote } from "@/types/user.type";
import Note from "@/components/note";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

  const {
    notes = [],
    categories = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.notes);
  const [filteredNotes, setFilteredNotes] = useState<SingleNote[]>(notes);

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const fetchNotes = (category: string = "all") => {
    console.log(category);
    dispatch(getNotes({ category: category }));
  };

  useEffect(() => {
    fetchNotes("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setNote((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleSubmit = () => {
    if (!note.content) return;
    if (!note.category) note.category = "all";
    dispatch(addNote(note));
    setNote({ ...note, title: "", content: "", category: "" });
    setText("");
    setIsAddingNewCategory(false);
  };

  const handleFilterWithFavorite = () => {
    const newShowOnlyFavorites = !showOnlyFavorites;

    const favNotes = notes.filter((note) =>
      newShowOnlyFavorites ? note.isFavorite : true
    );

    setFilteredNotes(favNotes);
    setShowOnlyFavorites(newShowOnlyFavorites);
  };

  return (
    <div className="px-20">
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

          {/* Category Dropdown */}
          <div className="mt-2">
            <Select
              value={isAddingNewCategory ? "__new__" : note.category}
              onValueChange={(value) => {
                if (value === "__new__") {
                  setIsAddingNewCategory(true);
                  setNote({ ...note, category: "" });
                } else {
                  setIsAddingNewCategory(false);
                  setNote({ ...note, category: value });
                }
              }}
            >
              <SelectTrigger className="w-11/12 text-xs outline-0">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, index) => (
                  <SelectItem
                    key={index}
                    value={category}
                    className="capitalize cursor-pointer"
                  >
                    {category}
                  </SelectItem>
                ))}
                <SelectItem value="__new__">+ Add new category</SelectItem>
              </SelectContent>
            </Select>

            {isAddingNewCategory && (
              <Input
                type="text"
                placeholder="New Category"
                className="w-11/12 mt-2 text-xs outline-0 focus:outline-0"
                value={note.category}
                onChange={(e) => setNote({ ...note, category: e.target.value })}
              />
            )}
          </div>

          <Button
            type="submit"
            className="px-4 bg-[#77a4eb] hover:bg-blue-400 text-gray-900 outfit text-xs cursor-pointer rounded mt-2"
          >
            Add Note
          </Button>
        </form>
      </div>

      <div>
        <div className="flex flex-wrap gap-4 mt-6 px-40">
          <h4 className="mt-1.5 font-semibold text-sm">Categories:</h4>
          {categories.map((category, index) => {
            return (
              <div key={index}>
                <p
                  onClick={() => {
                    setShowOnlyFavorites(false);
                    setActiveCategory(category);
                    fetchNotes(category);
                  }}
                  className={`px-3 py-1 cursor-pointer rounded-2xl border min-w-16 text-center text-xs font-semibold mt-1 uppercase
                    ${
                      activeCategory === category ? "bg-gray-200" : "bg-white"
                    }`}
                >
                  {category}
                </p>
              </div>
            );
          })}
          <span className="border-r-2 mt-1" />
          <p
            onClick={handleFilterWithFavorite}
            className={`px-3 py-1 cursor-pointer rounded-2xl min-w-16 text-center text-xs font-semibold mt-1 uppercase border-1 border-red-400 ${
              showOnlyFavorites ? "bg-red-500" : "bg-[#f36457]"
            }`}
          >
            Favorites
          </p>
        </div>
      </div>

      <div className="reletive mb-10 flex flex-col items-center">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredNotes.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No notes available</p>
        ) : (
          <div className="flex flex-wrap gap-4 mt-6 justify-center w-full">
            {filteredNotes.map((note, index) => {
              const colors = ["#77a4eb", "#56df7a", "#f3c849", "#f36457"];
              const bgColor = colors[index % colors.length];
              return (
                <Note
                  key={note._id || index} // better key if you have _id
                  note={note}
                  bgColor={bgColor}
                  setActiveCategory={setActiveCategory}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
