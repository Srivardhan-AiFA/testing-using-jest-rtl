import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "@/utils/permissions";

export interface AuthState {
  user: {
    id: string;
    username: string;
    email: string;
    token: string;
    role: Role;
  } | null;
  isLoggedin: boolean;
}

// Initial state matches AuthState
const initialState: AuthState = {
  user: null,
  isLoggedin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        id: string;
        username: string;
        email: string;
        token: string;
        role: Role;
      } | null>
    ) => {
      state.user = action.payload;
      state.isLoggedin = !!action.payload;
      if (action.payload?.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },
    updateUser: (state, action: PayloadAction<Partial<AuthState["user"]>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
      state.isLoggedin = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedin = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
