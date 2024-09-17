import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/user/authSlice";
import userProfileSlice from "./slices/user/userProfile"
const store = configureStore({
  reducer: {
    auth: authSlice,
    UserProfile: userProfileSlice
  },
});

export default store;
