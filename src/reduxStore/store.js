// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import ownerReducer from './slices/ownerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    owner: ownerReducer,
  },
});