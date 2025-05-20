// src/store/slices/ownerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ownerApi } from '../../api';

// Async thunk for fetching owner properties
export const fetchOwnerProperties = createAsyncThunk(
  'owner/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ownerApi.getOwnerProperties();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const ownerSlice = createSlice({
  name: 'owner',
  initialState: {
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Sync reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchOwnerProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ownerSlice.reducer;