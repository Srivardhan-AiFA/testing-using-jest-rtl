import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../features/auth/authSlice";
import accountReducer from "@/features/accounts/accountsSlice";
import serviceReducer from "@/features/sevices/serviceSlice";

// 1️⃣ Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "notes", "services"], // slices you want to persist
};

// 2️⃣ Combine reducers
const rootReducer = combineReducers({
  user: authReducer,
  accounts: accountReducer,
  services: serviceReducer,
});

// 3️⃣ Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// 5️⃣ Persistor
export const persistor = persistStore(store);

// 6️⃣ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
