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

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Label } from "@radix-ui/react-label";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    notes = [],
    categories = [],
    loading,
    error,
    totalPages = 1,
    // total,
  } = useSelector((state: RootState) => state.notes);

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

  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [filteredNotes, setFilteredNotes] = useState<SingleNote[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);

  // Adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // Filter notes by favorite toggle
  useEffect(() => {
    if (Array.isArray(notes)) {
      let updatedNotes = [...notes];
      if (showOnlyFavorites)
        updatedNotes = updatedNotes.filter((n) => n.isFavorite);
      setFilteredNotes(updatedNotes);
    } else {
      setFilteredNotes([]);
    }
  }, [notes, showOnlyFavorites]);

  // Fetch notes whenever category or page changes
  useEffect(() => {
    dispatch(getNotes({ category: activeCategory, page, limit }));
  }, [dispatch, page, limit, activeCategory]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setNote((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleLimitChange = (newLimit: number) => {
    setPage(1);
    setLimit(newLimit);
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
    setShowOnlyFavorites((prev) => !prev);
  };

  // Prepare categories for display
  const displayCategories = Array.from(new Set(categories));
  if (!displayCategories.includes("all")) displayCategories.unshift("all");

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleNext = () => handlePageChange(page + 1);
  const handlePrev = () => handlePageChange(page - 1);

  return (
    <div className="px-20">
      {/* Note Input Section */}
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
                {displayCategories.map((category, index) => (
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
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-4 mt-6 px-40">
          <h4 className="mt-1.5 font-semibold text-sm">Categories:</h4>
          {displayCategories.map((category, index) => (
            <div key={index}>
              <p
                onClick={() => {
                  setShowOnlyFavorites(false);
                  setActiveCategory(category);
                  setPage(1); // reset page whenever category changes
                }}
                className={`px-3 py-1 cursor-pointer rounded-2xl border min-w-16 text-center text-xs font-semibold mt-1 uppercase ${
                  activeCategory === category ? "bg-gray-200" : "bg-white"
                }`}
              >
                {category}
              </p>
            </div>
          ))}
          <span className="border-r-2 mt-1" />
          <p
            onClick={handleFilterWithFavorite}
            className={`px-3 cursor-pointer rounded-full min-w-16 text-xs pt-2 font-semibold uppercase border-1 border-red-400 ${
              showOnlyFavorites ? "bg-red-500" : "bg-[#f36457]"
            }`}
          >
            Favorites
          </p>
        </div>
      </div>

      {/* Notes List */}
      <div className="relative mb-10 flex flex-col items-center min-h">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredNotes.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No notes available</p>
        ) : (
          <div className="flex flex-wrap gap-4 mt-5 justify-center w-full">
            {filteredNotes.map((note, index) => {
              const colors = ["#77a4eb", "#56df7a", "#f3c849", "#f36457"];
              const bgColor = colors[index % colors.length];
              return (
                <Note
                  key={note._id || index}
                  note={note}
                  bgColor={bgColor}
                  setActiveCategory={setActiveCategory}
                />
              );
            })}
          </div>
        )}
        <div className="flex justify-center items-end h-full mt-5">
          <div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex h-full gap-10">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className="cursor-pointer"
                        onClick={handlePrev}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => handlePageChange(i + 1)}
                          className={`${
                            page === i + 1 ? "bg-blue-400 text-white" : ""
                          } cursor-pointer`}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        className="cursor-pointer"
                        onClick={handleNext}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <div>
                  <Select
                    value={String(limit)}
                    onValueChange={(val) => handleLimitChange(Number(val))}
                  >
                    <div className="flex items-center min-w-50 gap-3">
                      <Label>Per page</Label>{" "}
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="View" />
                      </SelectTrigger>
                    </div>
                    <SelectContent>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="18">18</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
