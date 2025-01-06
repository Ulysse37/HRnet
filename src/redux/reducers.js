import { createSlice } from '@reduxjs/toolkit';
import { addEmployee } from '../redux/actions';

const initialState = {
  employees: [],
};

const authSlice =  createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.fulfilled, (state, action) => {
        console.log('reducer - état modifié:', state);
        state.employees.push(action.payload);
        console.log('reducers - Listes employés :', state.employees);
        /* state.user = action.payload; */
        state.error = null;
      })
  },
});

export default authSlice.reducer;