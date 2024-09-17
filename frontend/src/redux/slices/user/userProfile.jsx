import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserProfileApi from "../../../api/UserProfileApi";

export const getUserProfile = createAsyncThunk(
  "GET_USER_PROFILE",
  async (_, thunkAPI) => {
    try {
      const response = await UserProfileApi.getUserProfile();

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "UPDATE_USER_PROFILE",
  async (userData, thunkAPI) => {
    try {
      const response = await UserProfileApi.updateUserProfile(userData);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handling getUserProfile thunk
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Handling updateUserProfile thunk
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
