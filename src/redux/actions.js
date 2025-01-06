import { createAsyncThunk  } from '@reduxjs/toolkit';

export const addEmployee = createAsyncThunk(
  'auth/addEmployee',
  async (employee, { rejectWithValue }) => {
    console.log('Action addEmployee déclenchée');
    try {

      return employee;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
