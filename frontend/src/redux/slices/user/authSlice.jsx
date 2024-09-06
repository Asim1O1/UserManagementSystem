import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../api/authService";

export const registerUser = createAsyncThunk(
  "REGISTER_USER",
  async (formData, thunkAPI) => {
    try {
      const response = await authService.register(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

// export const loginUser = createAsyncThunk("LOGIN_USER", async () => {
//   try {
//   } catch (error) {}
// });

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action?.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
