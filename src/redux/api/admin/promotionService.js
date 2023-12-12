import { createAsyncThunk } from "@reduxjs/toolkit";
import PUBLICSERVER from "../../../utils/publicServer";

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

export const addPromotion = createAsyncThunk(
  "addPromotion",
  async (data, thunkApi) => {
    try {
      const response = await PUBLICSERVER.post("/customer/update", data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const UpdatePromotion = createAsyncThunk(
  "UpdatePromotion",
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

export const listPromotion = createAsyncThunk(
  "listPromotion",
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

export const viewPromotion = createAsyncThunk(
  "viewPromotion",
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

export const deletePromotion = createAsyncThunk(
  "deletePromotion",
  async (id = "", thunkApi) => {
    try {
      const response = await PUBLICSERVER.delete(`/customer/address/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
