import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../features/auth/authSlice";
import accountReducer from "@/features/accounts/accountsSlice";
import serviceReducer from "@/features/sevices/serviceSlice";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "accounts", "services"],
};

// Combine reducers
const rootReducer = combineReducers({
  user: authReducer,
  accounts: accountReducer,
  services: serviceReducer,
});

// Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
