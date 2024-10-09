import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authSlice from "./slices/user/authSlice";
import userProfileSlice from "./slices/user/userProfile";

// Configure persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // specify which slices to persist
};

const rootReducer = {
  auth: authSlice,
  UserProfile: userProfileSlice,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
