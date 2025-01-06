import { createSlice } from '@reduxjs/toolkit';
import { addEmployee } from '../redux/actions';

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  },
};

const authSlice =  createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
  },
});

export default authSlice.reducer;