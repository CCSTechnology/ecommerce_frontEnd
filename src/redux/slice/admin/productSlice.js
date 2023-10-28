import { createSlice } from "@reduxjs/toolkit";
import {
  productListData,
  deleteProductData,
  addProductData,
  viewProductData,
  commonListData,
  editProductData,
} from "../../../redux/api/admin/productService";

const initialState = {
  deleteProduct: {
    loading: false,
    data: null,
    error: null,
  },
  addProduct: {
    loading: false,
    data: null,
    error: null,
  },
  editProduct: {
    loading: false,
    data: null,
    error: null,
  },
  listProduct: {
    loading: false,
    data: null,
    error: null,
  },
  viewProduct: {
    loading: false,
    data: null,
    error: null,
  },
  commonList:{
    loading: false,
    data: null,
    error: null,
  }
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET
    builder
      //   employeeList
      .addCase(productListData.pending, (state, action) => {
        state.listProduct.loading = true;
      })
      .addCase(productListData.fulfilled, (state, action) => {
        state.listProduct.loading = false;
        state.listProduct.data = action.payload;
        state.listProduct.error = false;
      })
      .addCase(productListData.rejected, (state, action) => {
        state.listProduct.loading = false;
        state.listProduct.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProductData.pending, (state, action) => {
        state.deleteProduct.loading = true;
      })
      .addCase(deleteProductData.fulfilled, (state, action) => {
        state.deleteProduct.loading = false;
        state.deleteProduct.data = action.payload;
        state.deleteProduct.error = null;
      })
      .addCase(deleteProductData.rejected, (state, action) => {
        state.deleteProduct.loading = false;
        state.deleteProduct.error = action.payload;
      })
      //add Employee
      .addCase(addProductData.pending, (state, action) => {
        state.addProduct.loading = true;
      })
      .addCase(addProductData.fulfilled, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.data = action.payload;
        state.addProduct.error = null;
      })
      .addCase(addProductData.rejected, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.error = action.payload;
      })
      //edit Employee
      .addCase(editProductData.pending, (state, action) => {
        state.editProduct.loading = true;
      })
      .addCase(editProductData.fulfilled, (state, action) => {
        state.editProduct.loading = false;
        state.editProduct.data = action.payload;
        state.editProduct.error = null;
      })
      .addCase(editProductData.rejected, (state, action) => {
        state.editProduct.loading = false;
        state.editProduct.error = action.payload;
      })
      // view Employee
      .addCase(viewProductData.pending, (state, action) => {
        state.viewProduct.loading = true;
      })
      .addCase(viewProductData.fulfilled, (state, action) => {
        state.viewProduct.loading = false;
        state.viewProduct.data = action.payload;
        state.viewProduct.error = null;
      })
      .addCase(viewProductData.rejected, (state, action) => {
        state.viewProduct.loading = false;
        state.viewProduct.error = action.payload;
      })
      // Common List
      .addCase(commonListData.pending, (state, action) => {
        state.commonList.loading = true;
      })
      .addCase(commonListData.fulfilled, (state, action) => {
        state.commonList.loading = false;
        state.commonList.data = action.payload;
        state.commonList.error = null;
      })
      .addCase(commonListData.rejected, (state, action) => {
        state.commonList.loading = false;
        state.commonList.error = action.payload;
      });
  },
});

export default productSlice.reducer;
