import { categoryListService } from "../../api/public/categoryService";
import { createSlice } from "@reduxjs/toolkit";

const categoryCases = [{
    api : categoryListService,
    name : "categoryListService"
}]

const initialState = {
}

categoryCases.forEach((cases)=>{
    initialState[cases.name] ={
        loading : false,
        data : undefined,
        error : null,
    }
})

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        categoryCases.forEach((cases)=>{
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

export default categorySlice.reducer