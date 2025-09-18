import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { AllUsersState, User } from "../../types/user.type";

const initialState: AllUsersState = {
  loading: false,
  error: null,
  users: [],
};

export const getAllUsers = createAsyncThunk<
  { users: string[] },
  void,
  { rejectValue: string }
>("transactions/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/services/getusers`,
      config
    );

    const users: string[] = (res.data as User[]).map((u) => u.username);

    return { users };
  } catch (error) {
    console.error(error);
    return rejectWithValue("Fetching users failed");
  }
});

const servicesSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<{ users: string[] }>) => {
          state.loading = false;
          state.users = action.payload.users;
        }
      )
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default servicesSlice.reducer;
