import { createSlice } from '@reduxjs/toolkit';
import { addEmployee } from '../redux/actions';

const initialState = {
  employees: [], // liste contenant tous les employés crées
};

const authSlice =  createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.fulfilled, (state, action) => {
        /* console.log('reducer - état modifié:', state); */
        state.employees.push(action.payload);
        /* console.log('reducers - Listes employés :', state.employees); */
        state.error = null;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;