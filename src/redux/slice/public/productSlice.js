import { productListService, productViewService } from "../../api/public/productService";
import { createSlice } from "@reduxjs/toolkit";

const productCases = [{
    api : productViewService,
    name : "productViewService"
},{
  api : productListService,
  name : "productListService"
}]

const initialState = {
}

productCases.forEach((cases)=>{
    initialState[cases.name] ={
        loading : false,
        data : undefined,
        error : null,
    }
})

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        productCases.forEach((cases)=>{
            builder
            .addCase(cases.api.fulfilled, (state, { payload }) => {
              state[cases.name].loading = false;
              state[cases.name].data = payload;
              state[cases.name].error = null;
            })
            .addCase(cases.api.pending, (state) => {
              state[cases.name].loading = true;
              state[cases.name].error = null;
              state[cases.name].data = null;
            })
            .addCase(cases.api.rejected, (state, { payload }) => {
              state[cases.name].loading = false;
              state[cases.name].error = payload;
              state[cases.name].data = null;
            });
        })
    },

})

export default productSlice.reducer