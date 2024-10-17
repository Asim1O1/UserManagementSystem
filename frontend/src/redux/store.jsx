import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux"; // Import combineReducers
import userProfileSlice from "./slices/user/userProfile";
import authSlice from "./slices/user/authSlice";

// Configure persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth slice
};

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  UserProfile: userProfileSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
