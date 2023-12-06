import { createSlice } from "@reduxjs/toolkit";
import {
  orderListData,
  downLoadOrderData,
} from "../../../redux/api/admin/orderService";

const initialState = {
  //   deleteProduct: {
  //     loading: false,
  //     data: null,
  //     error: null,
  //   },
  //   addProduct: {
  //     loading: false,
  //     data: null,
  //     error: null,
  //   },
  //   editProduct: {
  //     loading: false,
  //     data: null,
  //     error: null,
  //   },
  listOrder: {
    loading: false,
    data: null,
    error: null,
  },
  downloadOrder: {
    loading: false,
    data: null,
    error: null,
  },
  //   viewProduct: {
  //     loading: false,
  //     data: null,
  //     error: null,
  //   },
  //   commonList: {
  //     loading: false,
  //     data: null,
  //     error: null,
  //   },
};

export const orderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET
    builder
      //   employeeList
      .addCase(orderListData.pending, (state, action) => {
        state.listOrder.loading = true;
      })
      .addCase(orderListData.fulfilled, (state, action) => {
        state.listOrder.loading = false;
        state.listOrder.data = action.payload;
        state.listOrder.error = false;
      })
      .addCase(orderListData.rejected, (state, action) => {
        state.listOrder.loading = false;
        state.listOrder.error = action.payload;
      })

      .addCase(downLoadOrderData.pending, (state, action) => {
        state.downloadOrder.loading = true;
      })
      .addCase(downLoadOrderData.fulfilled, (state, action) => {
        state.downloadOrder.loading = false;
        state.downloadOrder.data = action.payload;
        state.downloadOrder.error = false;
      })
      .addCase(downLoadOrderData.rejected, (state, action) => {
        state.downloadOrder.loading = false;
        state.downloadOrder.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
