import { createAsyncThunk } from "@reduxjs/toolkit";
import ADMINSERVER from "../../../utils/adminServer";

export const settingImageView = createAsyncThunk(
  "settingImageView",
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

export const settingImageData = createAsyncThunk(
  "settingImageData",
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

export const settingImageAdd = createAsyncThunk(
  "settingImageAdd",
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

export const settingImageDelete = createAsyncThunk(
  "settingImageDelete",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await ADMINSERVER.delete(url, {
        ...data,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const settingImageEdit = createAsyncThunk(
  "settingImageEdit",
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
