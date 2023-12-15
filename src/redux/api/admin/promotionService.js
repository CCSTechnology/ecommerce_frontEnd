import { createAsyncThunk } from "@reduxjs/toolkit";
import ADMINSERVER from "../../../utils/adminServer";

export const addPromotion = createAsyncThunk(
  "addPromotion",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await ADMINSERVER.post(
        url,
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editProductData = createAsyncThunk(
  "editProductData",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await ADMINSERVER.post(
        url,
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
// get
export const listPromotion = createAsyncThunk(
  "listPromotion",
  async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
      const response = await ADMINSERVER({
        url,
        params: others,
        method: "GET",
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteProductData = createAsyncThunk(
  "deleteProductData",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await ADMINSERVER.put(url, {
        ...data,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const viewProductData = createAsyncThunk(
  "viewProductData",
  async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
      const response = await ADMINSERVER({
        url,
        params: others,
        method: "GET",
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const commonListData = createAsyncThunk(
  "commonListData",
  async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
      const response = await ADMINSERVER({
        url,
        params: others,
        method: "GET",
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
