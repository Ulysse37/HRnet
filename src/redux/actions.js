import { createAsyncThunk, createAction  } from '@reduxjs/toolkit';

export const addEmployee = createAsyncThunk(
  'auth/addEmployee',
  async (_, { rejectWithValue }) => {
    try {

      localStorage.removeItem('token'); // suppression des tokens pour la déconnexion

      return null;
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);
