import { createSlice } from "@reduxjs/toolkit";
import {
  employeeListData,
  deleteEmployeeData,
  addEmployeeData,
  viewEmployeeData,
} from "redux/api/services/employeeService";

const initialState = {
  deleteEmployee: {
    loading: false,
    data: null,
    error: null,
  },
  addEmployee: {
    loading: false,
    data: null,
    error: null,
  },
  listEmployee: {
    loading: false,
    data: null,
    error: null,
  },
  viewEmployee: {
    loading: false,
    data: null,
    error: null,
  },
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET
    builder
      //   employeeList
      .addCase(employeeListData.pending, (state, action) => {
        state.listEmployee.loading = true;
      })
      .addCase(employeeListData.fulfilled, (state, action) => {
        state.listEmployee.loading = false;
        state.listEmployee.data = action.payload;
        state.listEmployee.error = false;
      })
      .addCase(employeeListData.rejected, (state, action) => {
        state.listEmployee.loading = false;
        state.listEmployee.error = action.payload;
      })
      //Delete Employee
      .addCase(deleteEmployeeData.pending, (state, action) => {
        state.deleteEmployee.loading = true;
      })
      .addCase(deleteEmployeeData.fulfilled, (state, action) => {
        state.deleteEmployee.loading = false;
        state.deleteEmployee.data = action.payload;
        state.deleteEmployee.error = null;
      })
      .addCase(deleteEmployeeData.rejected, (state, action) => {
        state.deleteEmployee.loading = false;
        state.deleteEmployee.error = action.payload;
      })
      //add Employee
      .addCase(addEmployeeData.pending, (state, action) => {
        state.addEmployee.loading = true;
      })
      .addCase(addEmployeeData.fulfilled, (state, action) => {
        state.addEmployee.loading = false;
        state.addEmployee.data = action.payload;
        state.addEmployee.error = null;
      })
      .addCase(addEmployeeData.rejected, (state, action) => {
        state.addEmployee.loading = false;
        state.addEmployee.error = action.payload;
      })
      //view Employee
      .addCase(viewEmployeeData.pending, (state, action) => {
        state.viewEmployee.loading = true;
      })
      .addCase(viewEmployeeData.fulfilled, (state, action) => {
        state.viewEmployee.loading = false;
        state.viewEmployee.data = action.payload;
        state.viewEmployee.error = null;
      })
      .addCase(viewEmployeeData.rejected, (state, action) => {
        state.viewEmployee.loading = false;
        state.viewEmployee.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
