import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: {
    _id: string;
    username: string;
    email: string;
    token: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signupAPI = createAsyncThunk<
  AuthState["user"],
  { username: string; email: string; password: string },
  { rejectValue: string }
>("auth/signupAPI", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
      userData
    );
    return (res.data as { user: AuthState["user"] }).user;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Signup failed");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        if (action.payload?.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(signupAPI.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error =
          action.payload || action.error.message || "Something went wrong";
      });
  },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;
