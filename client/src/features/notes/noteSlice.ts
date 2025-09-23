import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { GetNotesResponse, Note, SingleNote } from "../../types/user.type";
import axios from "axios";

const initialState: Note = {
  notes: [],
  loading: false,
  error: null,
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
  },
  void,
  { rejectValue: string }
>("notes/getNotes", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const res = await axios.get<GetNotesResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/features/getAllNotes`,
      config
    );

    return res.data;
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
  async (content: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post<SingleNote>(
        `${import.meta.env.VITE_BACKEND_URL}/features/create`,
        { content: content },
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
        // @ts-expect-error typecheck
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "unable to add Note";
      });
  },
});

export default noteSlice.reducer;
