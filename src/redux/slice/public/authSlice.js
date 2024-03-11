import { createSlice } from "@reduxjs/toolkit";

import {
  guestAddAddress,
  publicAddAddress,
  publicAuthRegister,
  publicAuthLogin,
  publicGetMe,
  MyOrdersApi,
  publicEditAddress,
} from "../../api/public/authService";

const authCases = [
  {
    api: publicAddAddress,
    name: "publicAddAddress",
  },
  {
    api: guestAddAddress,
    name: "guestAddAddress",
  },
  {
    api: publicAuthLogin,
    name: "publicAuthLogin",
  },
  {
    api: publicAuthRegister,
    name: "publicAuthRegister",
  },
  {
    api: publicGetMe,
    name: "publicGetMe",
  },
  {
    api: MyOrdersApi,
    name: "MyOrdersApi",
  },
  {
    api: publicEditAddress,
    name: "publicEditAddress",
  },
];

const initialState = {
  authProducts: [],
};

authCases.forEach((cases) => {
  initialState[cases.name] = {
    loading: false,
    data: undefined,
    error: null,
  };
});

export const authSlice = createSlice({
  name: "publicAuth",
  initialState,
  extraReducers: (builder) => {
    authCases.forEach((cases) => {
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

export default authSlice.reducer;
