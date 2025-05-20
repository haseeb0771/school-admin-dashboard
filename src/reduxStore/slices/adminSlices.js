// src/store/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminApi } from '../../api';

// Async thunk for fetching admin dashboard data
export const fetchAdminDashboard = createAsyncThunk(
  'admin/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.getAdminDashboardData();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    dashboardData: null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Sync reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;