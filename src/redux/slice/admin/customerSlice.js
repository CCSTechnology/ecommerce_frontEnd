import { createSlice } from "@reduxjs/toolkit";
import {
  customerListData,
  deleteCustomerData,
  addEmployeeData,
  viewCustomerData,
} from "../../../redux/api/admin/customerService";

const initialState = {
  deleteCustomer: {
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
  viewCustomer: {
    loading: false,
    data: null,
    error: null,
  },
};

export const customerSlice = createSlice({
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
      .addCase(deleteCustomerData.pending, (state, action) => {
        state.deleteCustomer.loading = true;
      })
      .addCase(deleteCustomerData.fulfilled, (state, action) => {
        state.deleteCustomer.loading = false;
        state.deleteCustomer.data = action.payload;
        state.deleteCustomer.error = null;
      })
      .addCase(deleteCustomerData.rejected, (state, action) => {
        state.deleteCustomer.loading = false;
        state.deleteCustomer.error = action.payload;
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
      .addCase(viewCustomerData.pending, (state, action) => {
        state.viewCustomer.loading = true;
      })
      .addCase(viewCustomerData.fulfilled, (state, action) => {
        state.viewCustomer.loading = false;
        state.viewCustomer.data = action.payload;
        state.viewCustomer.error = null;
      })
      .addCase(viewCustomerData.rejected, (state, action) => {
        state.viewCustomer.loading = false;
        state.viewCustomer.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
