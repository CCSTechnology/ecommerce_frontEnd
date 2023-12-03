import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../utils/publicServer";

export const myProfileView = createAsyncThunk(
  "myOrderViewService",
  async (params, thunkApi) => {
    try {
      const response = await PUBLICSERVER.get(`/customer/me`, {
        params,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const myProfileUpdate = createAsyncThunk(
//   "myProfileUpdate",
//   async (id, data, thunkApi) => {
//     try {
//       const response = await PUBLICSERVER.post(`/customer/update`, data);
//       return response;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

export const myProfileUpdate = createAsyncThunk(
  "myProfileUpdate",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/customer/update", data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const paymentSuccessMessage = createAsyncThunk(
  "paymentSuccessMessage",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post(
        "/customer/retrivecheckout",
        data
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const customerPasswordChange = createAsyncThunk(
  "customerPasswordChange",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post(
        "/customer/change-password",
        data
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addCustomerAddress = createAsyncThunk(
  "addCustomerAddress",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/customer/address", data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);