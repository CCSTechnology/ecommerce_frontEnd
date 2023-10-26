import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const categoryListDatas = createAsyncThunk("categoryList", async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
        const response = await SERVER({
            url,
            params: others,
            method: "GET",
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

// export const addDirectoryData = createAsyncThunk("addDirectoryData", async (params, thunkApi) => {
//     const { url = "", data = {} } = params;
//     try {
//         const response = await SERVER.post(url, {
//             ...data,
//         }, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             }
//         });
//         return response.data;
//     } catch (error) {
//         return thunkApi.rejectWithValue(error);
//     }
// });

export const deleteCategoryData = createAsyncThunk("deleteCategoryData", async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
        const response = await SERVER.put(url, {
            ...data,
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const viewCategoryData = createAsyncThunk("categoryView", async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
        const response = await SERVER({
            url,
            params: others,
            method: "GET",
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const addCategoryData = createAsyncThunk(
  "addEmployeeyData",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await SERVER.post(
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

export const editCategoryData = createAsyncThunk(
  "editProductData",
  async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
      const response = await SERVER.post(
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

