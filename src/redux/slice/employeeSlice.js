import { createSlice } from "@reduxjs/toolkit";
import {
  customerListData,
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
  listCustomer: {
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
      .addCase(customerListData.pending, (state, action) => {
        state.listCustomer.loading = true;
      })
      .addCase(customerListData.fulfilled, (state, action) => {
        state.listCustomer.loading = false;
        state.listCustomer.data = action.payload;
        state.listCustomer.error = false;
      })
      .addCase(customerListData.rejected, (state, action) => {
        state.listCustomer.loading = false;
        state.listCustomer.error = action.payload;
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
