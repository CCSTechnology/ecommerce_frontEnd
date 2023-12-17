import {
  myProfileView,
  myProfileUpdate,
  paymentSuccessMessage,
  customerPasswordChange,
  addCustomerAddress,
  getCustomerAddress,
  deleteCustomerAddress,
  getPrimaryAddress,
  viewCustomerAddress,
  editCustomerAddress,
} from "../../api/public/profileService";
import { createSlice } from "@reduxjs/toolkit";

const myProfileCases = [
  {
    api: myProfileView,
    name: "myProfileView",
  },
  {
    api: myProfileUpdate,
    name: "myProfileUpdate",
  },
  {
    api: paymentSuccessMessage,
    name: "paymentSuccessMessage",
  },
  {
    api: customerPasswordChange,
    name: "customerPasswordChange",
  },
  {
    api: addCustomerAddress,
    name: "addCustomerAddress",
  },
  {
    api: getCustomerAddress,
    name: "getCustomerAddress",
  },
  {
    api: deleteCustomerAddress,
    name: "deleteCustomerAddress",
  },

  {
    api: getPrimaryAddress,
    name: "getPrimaryAddress",
  },
  {
    api: viewCustomerAddress,
    name: "viewCustomerAddress",
  },
  {
    api: editCustomerAddress,
    name: "editCustomerAddress",
  },
];

const initialState = {};

myProfileCases.forEach((cases) => {
  initialState[cases.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

export const myProfileSlice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    myProfileCases.forEach((cases) => {
      builder
        .addCase(cases.api.fulfilled, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].data = payload;
          state[cases.name].error = null;
        })
        .addCase(cases.api.pending, (state) => {
          state[cases.name].loading = true;
          state[cases.name].error = null;
          state[cases.name].data = null;
        })
        .addCase(cases.api.rejected, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].error = payload;
          state[cases.name].data = null;
        });
    });
  },
});

export default myProfileSlice.reducer;
