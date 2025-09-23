import type { getUsersType } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: {
    _id: string;
    username: string;
    email: string;
    token: string;
    role: string;
  } | null;
  loading: boolean;
  error: string | null;
  isLoggedin: boolean;
  users: getUsersType[];
  admins: getUsersType[];
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isLoggedin: false,
  users: [],
  admins: [],
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
  { email: string; role: string },
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
      })

      // getUsers
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

export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;
