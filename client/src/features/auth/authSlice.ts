import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    token: string;
  } | null;
  loading: boolean;
  error: string | null;
  isLoggedin: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isLoggedin: false,
};

export const signupAPI = createAsyncThunk<
  AuthState["user"],
  { firstname: string; lastname: string; email: string; password: string },
  { rejectValue: string }
>("auth/signupAPI", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
      userData
    );
    return (res.data as { user: AuthState["user"] }).user;
  } catch (err) {
    console.log(err);
    return rejectWithValue("Signup failed");
  }
});

export const signinAPI = createAsyncThunk<
  AuthState["user"],
  { username: string; email: string; password: string }
>("auth/signinAPI", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
      userData
    );
    return (res.data as { user: AuthState["user"] }).user;
  } catch (err) {
    console.log(err);
    return rejectWithValue("Signup failed");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoggedin = false;
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
      })

      .addCase(signinAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        if (action.payload?.token) {
          localStorage.setItem("token", action.payload.token);
        }
        state.isLoggedin = true;
      })
      .addCase(signinAPI.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error =
          (typeof action.payload === "string"
            ? action.payload
            : action.error.message) || "Something went wrong";
      });
  },
});

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;
