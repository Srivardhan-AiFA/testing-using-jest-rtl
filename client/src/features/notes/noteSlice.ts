import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { GetNotesResponse, Note, SingleNote } from "../../types/user.type";
import axios from "axios";

const initialState: Note = {
  notes: [],
  loading: false,
  error: null,
  message: "",
  categories: [],
  total: 0,
  totalPages: 0,
  currentPage: 1,
};

export const addFavorite = createAsyncThunk<
  { message: string; id: string },
  { id: string },
  { rejectValue: string }
>("notes/addFavorite", async ({ id }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/services/addtofav/${id}`,
      {},
      config
    );
    return { message: res.data, id } as { message: string; id: string };
  } catch (error) {
    console.log(error);
    return rejectWithValue("Getting Notes Failed");
  }
});

export const addCategory = createAsyncThunk<
  { message: string; id: string; category: string },
  { id: string; category: string },
  { rejectValue: string }
>("notes/addCategory", async ({ id, category }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/services/addtofav/${id}?category=${category}`,
      {},
      config
    );
    return { message: res.data, id, category } as {
      message: string;
      id: string;
      category: string;
    };
  } catch (error) {
    console.log(error);
    return rejectWithValue("Getting Notes Failed");
  }
});

export const getNotes = createAsyncThunk<
  {
    notes: SingleNote[];
    categories: string[];
    total: number;
    totalPages: number;
    currentPage: number;
  },
  { category: string; page: number; limit: number },
  { rejectValue: string }
>("notes/getNotes", async ({ category, page, limit }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const res = await axios.get<GetNotesResponse>(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/notes/getall/${category}?page=${page}&limit=${limit}`,
      config
    );

    const notes: SingleNote[] = res.data.notes;
    const total: number = res.data.total;
    const totalPages: number = res.data.totalPages;
    const currentPage: number = res.data.currentPage;
    const categories: string[] = res.data.categories;

    return { notes, categories, total, totalPages, currentPage };
  } catch (error) {
    console.log(error);
    return rejectWithValue("Getting Notes Failed");
  }
});

export const editNote = createAsyncThunk<
  { message: string; updatedNote: SingleNote },
  { note: { title: string; content: string; category: string }; id: string },
  { rejectValue: string }
>("notes/editNote", async ({ note, id }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/notes/update/${id}`,
      note,
      config
    );
    return res.data as { message: string; updatedNote: SingleNote };
  } catch (error) {
    console.log(error);
    return rejectWithValue("Getting Notes Failed");
  }
});

export const deleteNote = createAsyncThunk<
  { message: string; deletedNote: SingleNote },
  { id: string },
  { rejectValue: string }
>("notes/deleteNote", async ({ id }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/notes/delete/${id}`,
      config
    );
    return res.data as { message: string; deletedNote: SingleNote };
  } catch (error) {
    console.log(error);
    return rejectWithValue("Getting Notes Failed");
  }
});

export const addNote = createAsyncThunk(
  "note/addNote",
  async (note: SingleNote, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/notes/create`,
        note,
        config
      );
      return res.data as SingleNote;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Getting Notes Failed");
    }
  }
);

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = [action.payload, ...state.notes];
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "unable to add Note";
      })

      .addCase(getNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.notes;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.categories = action.payload.categories;
      })

      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "unable to add Note";
      })

      .addCase(editNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        const updatedNote = action.payload.updatedNote;
        const index = state.notes.findIndex((n) => n._id === updatedNote._id);

        if (index !== -1) {
          state.notes[index] = updatedNote;
        }
      })
      .addCase(editNote.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "unable to add Note";
      })

      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        const deletedNote = action.payload.deletedNote;
        const index = state.notes.findIndex((n) => n._id === deletedNote._id);

        if (index !== -1) {
          state.notes.splice(index, 1);
        }
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "unable to add Note";
      })

      .addCase(addFavorite.pending, (state, action) => {
        state.error = null;
        const id = action.meta.arg.id;
        const index = state.notes.findIndex((n) => n._id === id);

        if (index !== -1) {
          state.notes[index].isFavorite = !state.notes[index].isFavorite;
        }
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "unable to add Favriote";
        const id = action.meta.arg.id;
        const index = state.notes.findIndex((n) => n._id === id);

        if (index !== -1) {
          state.notes[index].isFavorite = !state.notes[index].isFavorite;
        }
      })

      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        const addFav = action.payload;
        const index = state.notes.findIndex((n) => n._id === addFav.id);

        if (index !== -1) {
          state.notes[index].category = action.payload.category;
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "unable to add Category";
      });
  },
});

export default noteSlice.reducer;
