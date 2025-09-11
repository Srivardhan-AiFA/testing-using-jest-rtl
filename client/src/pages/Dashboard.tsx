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
  const [filteredNotes, setFilteredNotes] = useState<SingleNote[]>(notes);

  const [showFavoritesButton, setShowFavoritesButton] = useState<boolean>(true);

  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const categories: string[] = Array.from(
    new Set(notes.map((note) => note.category).sort())
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

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

  const handleFilter = (category: string) => {
    setShowFavoritesButton(true);
    if (category === "favorite") {
      setShowFavoritesButton(false);
      setFilteredNotes(notes.filter((note) => note.isFavorite));
    } else if (category === "all") {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(notes.filter((note) => note.category === category));
    }
  };

  const handleFilterWithFavorite = () => {
    setFilteredNotes(filteredNotes.filter((note) => note.isFavorite));
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
                    handleFilter(category);
                  }}
                  className="px-3 py-1 cursor-pointer rounded-2xl border-1 min-w-16 text-center text-xs font-semibold mt-1 uppercase"
                >
                  {category}
                </p>
              </div>
            );
          })}
          <span className="border-r-2 mt-1" />
          <p
            onClick={() => {
              handleFilter("favorite");
            }}
            className="px-3 py-1 cursor-pointer rounded-2xl border-1 min-w-16 text-center text-xs font-semibold mt-1 uppercase bg-[#f36457]"
          >
            Favorites
          </p>
        </div>
      </div>

      <div className="reletive mb-10">
        <div className="mt-6">
          {showFavoritesButton ? (
            <Button
              className="cursor-pointer absolute bg-[#56df7a] text-gray-900 mt-0.5"
              onClick={handleFilterWithFavorite}
            >
              Favorites
            </Button>
          ) : (
            ""
          )}
        </div>

        {/* {loading && <p>Loading...</p>} */}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && filteredNotes.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No notes available</p>
        )}

        {filteredNotes.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            {filteredNotes.map((note, index) => {
              const colors = ["#77a4eb", "#56df7a", "#f3c849", "#f36457"];
              const bgColor = colors[index % colors.length];
              return <Note key={index} note={note} bgColor={bgColor} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
