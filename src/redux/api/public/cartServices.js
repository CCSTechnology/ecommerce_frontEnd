import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../utils/publicServer";

export const addCartServices = createAsyncThunk(
  "addCartServices",
  async (params, thunkApi) => {
    const { type, product_id, cart_id } = params;
    const data = {
      product_id,
      cart_id,
      quantity: params?.quantity || 1,
    };
    const url =
      type === "add"
        ? "/customer/cart/save"
        : `/customer/cart/decrement/${product_id}`;
    const method = type === "add" ? "POST" : "PUT";
    try {
      const response = await PUBLICSERVER({
        url,
        data,
        params: {
          cart_id,
        },
        method,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const guestAddCartServices = createAsyncThunk(
  "guestAddCartServices",
  async (params, thunkApi) => {
    const { type, product_id, cart_id } = params;
    const data = {
      product_id,
      cart_id,
      quantity: params?.quantity || 1,
    };
    const url =
      type === "add" ? "/cart/save" : `/customer/cart/decrement/${product_id}`;
    const method = type === "add" ? "POST" : "PUT";
    try {
      const response = await PUBLICSERVER({
        url,
        data,
        params: {
          cart_id,
        },
        method,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const removeCartServices = createAsyncThunk(
  "removeCartServices",
  async (id = "", thunkApi) => {
    try {
      const response = await PUBLICSERVER.delete(`/customer/cart/delete/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const cartViewServices = createAsyncThunk(
  "cartViewServices",
  async (params, thunkApi) => {
    try {
      const response = await PUBLICSERVER.get("/cart/view", {
        params,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAddressServices = createAsyncThunk(
  "getAddressServices",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/guest/address", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const paymentStatusChange = createAsyncThunk(
  "paymentStatusChange",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/verifySignature", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const checkOutWithUser = createAsyncThunk(
  "checkOutWithUser",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/customer/order/save", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const checkOutWithGuest = createAsyncThunk(
  "checkOutWithGuest",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/guest/order/save", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getDeliveryCharge = createAsyncThunk(
  "getDeliveryCharge",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/getDeliveryCharges", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
