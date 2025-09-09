import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to fetch names
export const fetchNames = createAsyncThunk(
  "apart/fetchNames",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/watch/name");
      console.log(response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

const apartmentsSlice = createSlice({
  name: "Apart",
  initialState: {
    names: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addApart: (state, action) => {
      console.log("Hello World");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.names = action.payload;
      })
      .addCase(fetchNames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default apartmentsSlice.reducer;
