import { createSlice } from "@reduxjs/toolkit";
import {
  orderListData,
  downLoadOrderData,
  viewOrderData,
  orderStatusChangeData,
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
  viewOrder: {
    loading: false,
    data: null,
    error: null,
  },
  orderStatusChange: {
    loading: false,
    data: null,
    error: null,
  },
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
      })

      .addCase(viewOrderData.pending, (state, action) => {
        state.viewOrder.loading = true;
      })
      .addCase(viewOrderData.fulfilled, (state, action) => {
        state.viewOrder.loading = false;
        state.viewOrder.data = action.payload;
        state.viewOrder.error = false;
      })
      .addCase(viewOrderData.rejected, (state, action) => {
        state.viewOrder.loading = false;
        state.viewOrder.error = action.payload;
      })

      .addCase(orderStatusChangeData.pending, (state, action) => {
        state.orderStatusChange.loading = true;
      })
      .addCase(orderStatusChangeData.fulfilled, (state, action) => {
        state.orderStatusChange.loading = false;
        state.orderStatusChange.data = action.payload;
        state.orderStatusChange.error = false;
      })
      .addCase(orderStatusChangeData.rejected, (state, action) => {
        state.orderStatusChange.loading = false;
        state.orderStatusChange.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
