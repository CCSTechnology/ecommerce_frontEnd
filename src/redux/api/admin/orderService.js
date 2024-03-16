import { createAsyncThunk } from "@reduxjs/toolkit";
import ADMINSERVER from "../../../utils/adminServer";

// export const addProductData = createAsyncThunk(
//   "addEmployeeyData",
//   async (params, thunkApi) => {
//     const { url = "", data = {} } = params;
//     try {
//       const response = await ADMINSERVER.post(
//         url,
//         {
//           ...data,
//         },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

// export const editProductData = createAsyncThunk(
//   "editProductData",
//   async (params, thunkApi) => {
//     const { url = "", data = {} } = params;
//     try {
//       const response = await ADMINSERVER.post(
//         url,
//         {
//           ...data,
//         },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );
// get
export const orderListData = createAsyncThunk(
  "orderListData",
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

export const downLoadOrderData = createAsyncThunk(
  "downLoadOrderData",
  async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
      const response = await ADMINSERVER({
        url,
        params: others,
        method: "GET",
        responseType: "blob", // Set responseType to "blob"
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const deleteProductData = createAsyncThunk(
//   "deleteProductData",
//   async (params, thunkApi) => {
//     const { url = "", data = {} } = params;
//     try {
//       const response = await ADMINSERVER.put(url, {
//         ...data,
//       });
//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

export const viewOrderData = createAsyncThunk(
  "viewOrderData",
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

export const orderStatusChangeData = createAsyncThunk(
  "orderStatusChangeData",
  async ({ id, order_status }, thunkApi) => {
    try {
      const response = await ADMINSERVER.put(
        `/order/updatestatus/${id}?status=${order_status}`
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const commonListData = createAsyncThunk(
//   "commonListData",
//   async (params, thunkApi) => {
//     const { url = "", ...others } = params;
//     try {
//       const response = await ADMINSERVER({
//         url,
//         params: others,
//         method: "GET",
//       });
//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );
