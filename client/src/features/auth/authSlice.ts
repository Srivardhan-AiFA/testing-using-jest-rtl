import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user.type";

const initialState: User = {
  id: "",
  name: "",
  email: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
