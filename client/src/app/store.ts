import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../features/auth/authSlice";
import noteReducer from "@/features/notes/noteSlice";

const persistConfig = {
  key: "root", // key in localStorage
  storage,
  whitelist: ["user", "notes"], // reducers you want to persist
};

const rootReducer = combineReducers({
  user: authReducer,
  notes: noteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
