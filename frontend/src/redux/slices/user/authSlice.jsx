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

export const loginUser = createAsyncThunk("LOGIN_USER", async () => {
  try {
  } catch (error) {}
});
