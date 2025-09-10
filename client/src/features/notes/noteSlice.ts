import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Note, SingleNote } from "../../types/user.type";
import axios from "axios";

const initialState: Note = {
  loading: false,
  error: null,
  notes: [] as SingleNote[],
  message: "",
};

export const getNotes = createAsyncThunk<
  SingleNote[],
  void,
  { rejectValue: string }
>("notes/getNotes", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/notes/getall`,
      config
    );
    return res.data as SingleNote[];
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Getting Notes Failed"
    );
  }
});
export const editNote = createAsyncThunk<
  { message: string; updatedNote: SingleNote },
  { note: { title: string; content: string }; id: string },
  { rejectValue: string }
>("notes/editNote", async ({ note, id }, { rejectWithValue }) => {
  try {
    console.log(note, id);
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
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Getting Notes Failed"
    );
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
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Getting Notes Failed"
    );
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
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Adding Note Failed"
      );
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
        console.log("Inside the fufill ", action.payload);
        state.notes.push(action.payload as SingleNote);
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
        state.notes = action.payload;
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
      });
  },
});

export default noteSlice.reducer;
