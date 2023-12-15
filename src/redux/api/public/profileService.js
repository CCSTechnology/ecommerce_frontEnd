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

export const editCustomerAddress = createAsyncThunk(
  "editCustomerAddress",
  async ({ data, id }, thunkApi) => {
    try {
      const response = await PUBLICSERVER.put(`/customer/address/${id}`, data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getCustomerAddress = createAsyncThunk(
  "getCustomerAddress",
  async (params, thunkApi) => {
    try {
      const response = await PUBLICSERVER.get(`/customer/getaddress`, {
        params,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCustomerAddress = createAsyncThunk(
  "deleteCustomerAddress",
  async (id = "", thunkApi) => {
    try {
      const response = await PUBLICSERVER.delete(`/customer/address/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getPrimaryAddress = createAsyncThunk(
  "getPrimaryAddress",
  async (id, thunkApi) => {
    try {
      const response = await PUBLICSERVER.patch(`/customer/address/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const viewCustomerAddress = createAsyncThunk(
  "viewCustomerAddress",
  async (add_id, thunkApi) => {
    try {
      const response = await PUBLICSERVER.get(`/customer/getaddress/${add_id}`);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
