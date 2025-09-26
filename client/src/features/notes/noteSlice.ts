import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  GetNotesResponse,
  getUsersType,
  Note,
  SingleNote,
} from "../../types/user.type";
import axios from "axios";

const initialState: Note = {
  notes: [],
  loading: false,
  error: null,
  users: [],
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

export const getUsers = createAsyncThunk<
  getUsersType[],
  void,
  { rejectValue: string }
>("auth/getUsers", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get<getUsersType[]>(
      `${import.meta.env.VITE_BACKEND_URL}/mod/users/getAllUsers`,
      config
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue("Signup failed");
  }
});

export const changeRoleState = createAsyncThunk<
  getUsersType,
  { email: string; role: "user" | "admin" | "moderator" },
  { rejectValue: string }
>("auth/changerole", async ({ email, role }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.put<getUsersType>(
      `${import.meta.env.VITE_BACKEND_URL}/mod/users/promoteUser`,
      { email, role },
      config
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue("Signup failed");
  }
});

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
      })

      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // populate users array
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (typeof action.payload === "string"
            ? action.payload
            : action.error.message) || "Failed to fetch users";
      })

      .addCase(changeRoleState.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        const userToUpdate = state.users.find(
          (user) => user.email === action.meta.arg.email
        );

        if (userToUpdate) {
          userToUpdate.role = action.meta.arg.role;
        }

        if (userToUpdate) {
          userToUpdate.role = action.meta.arg.role;
        }
      })
      .addCase(changeRoleState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedUser = action.payload;
        const userIndex = state.users.findIndex(
          (user) => user.email === updatedUser.email
        );
        if (userIndex !== -1) {
          state.users[userIndex].role = updatedUser.role;
          state.notes = state.notes.map((note) =>
            note.userId === updatedUser.id
              ? { ...note, role: updatedUser.role }
              : note
          );
        }
      })
      .addCase(changeRoleState.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (typeof action.payload === "string"
            ? action.payload
            : action.error.message) || "Failed to update role";

        if (action.meta.arg) {
          const originalUser = state.users.find(
            (user) => user.email === action.meta.arg.email
          );
          if (originalUser) {
            originalUser.role =
              state.users.find((user) => user.email === action.meta.arg.email)
                ?.role || originalUser.role;
          }
        }
      });
  },
});

export default noteSlice.reducer;
