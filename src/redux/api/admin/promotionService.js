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

// export const AlreadyAvailablePromotion = createAsyncThunk(
//   "AlreadyAvailablePromotion",
//   async (params, thunkApi) => {
//     const { url = "", data = {} } = params;
//     try {
//       const response = await ADMINSERVER.post(url, {
//         ...data,
//       });
//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

export const addPromotionProduct = createAsyncThunk(
  "addPromotionProduct",
  async (data, thunkApi) => {
    try {
      const response = await ADMINSERVER.post(`/promotion/addproduct`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const AlreadyAvailablePromotion = createAsyncThunk(
  "AlreadyAvailablePromotion",
  async (id, thunkApi) => {
    try {
      const response = await ADMINSERVER.get(`/productpromotionsearch/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const addPromotionProduct = createAsyncThunk(
//   "addPromotionProduct",
//   async (params, thunkApi) => {
//     const { url = "", data = {} } = params;
//     try {
//       const response = await ADMINSERVER.post(url, {
//         ...data,
//       });
//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

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

export const deletePromotion = createAsyncThunk(
  "deletePromotion",
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

export const viewPromotion = createAsyncThunk(
  "viewPromotion",
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
