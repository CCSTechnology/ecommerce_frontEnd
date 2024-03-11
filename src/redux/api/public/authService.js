import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../utils/publicServer";

export const publicAuthLogin = createAsyncThunk(
  "authLogin",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await PUBLICSERVER.post("/customer/login", {
        ...data,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const publicAuthRegister = createAsyncThunk(
  "publicAuthRegister",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/customer/register", data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const publicGetMe = createAsyncThunk(
  "publicGetMe",
  async (params, thunkApi) => {
    try {
      const response = await PUBLICSERVER.get("/customer/me");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const publicAddAddress = createAsyncThunk(
  "publicAddAddress",
  async (params, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/customer/address", params);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const publicEditAddress = createAsyncThunk(
  "publicEditAddress",
  async ({ id, params }, thunkApi) => {
    try {
      const response = await PUBLICSERVER.put(
        `/customer/address/${id}`,
        params
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const guestAddAddress = createAsyncThunk(
  "guestAddAddress",
  async (params, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/guest/address", params);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const PublicAuthlogout = createAsyncThunk(
  "PublicAuthlogout",
  async (params, thunkApi) => {
    const { url } = params;
    try {
      const response = await PUBLICSERVER.post("/logout");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const MyOrdersApi = createAsyncThunk(
  "MyOrdersApi",
  async (params, thunkApi) => {
    try {
      const response = await PUBLICSERVER.get("/customer/order/view");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
