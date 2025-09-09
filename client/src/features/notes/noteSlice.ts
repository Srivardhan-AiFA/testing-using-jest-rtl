import { createSlice } from "@reduxjs/toolkit";
import type { Note } from "../../types/user.type";

const initialState: Note = {
  id: "",
  title: "",
  content: "",
};

export const authSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
