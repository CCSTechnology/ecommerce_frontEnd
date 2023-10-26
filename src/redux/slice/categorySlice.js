import { createSlice } from "@reduxjs/toolkit"
import {categoryListDatas, deleteCategoryData,viewCategoryData,addCategoryData,editCategoryData} from "redux/api/services/categoryService"

const initialState = {
    categoryList: {
        loading: false,
        data: [],
        error: null,
    },
    addCategory: {
        loading: false,
        data: null,
        error: null,
    },
    deleteCategory: {
        loading: false,
        data: null,
        error: null,
    },
    editCategory: {
        loading: false,
        data: null,
        error: null,
    },

    viewCategory: {
        loading: false,
        data: null,
        error: null,
    }
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Get me
            .addCase(categoryListDatas.pending, (state, action) => {
                state.categoryList.loading = true;
            })
            .addCase(categoryListDatas.fulfilled, (state, action) => {
                state.categoryList.loading = false;
                state.categoryList.data = action.payload;
                state.categoryList.error = null;
            })
            .addCase(categoryListDatas.rejected, (state, action) => {
                state.categoryList.loading = false;
                state.categoryList.error = action.payload;
            })
            //Add Directory
            .addCase(addCategoryData.pending, (state, action) => {
                state.addCategory.loading = true;
            })
            .addCase(addCategoryData.fulfilled, (state, action) => {
                state.addCategory.loading = false;
                state.addCategory.data = action.payload;
                state.addCategory.error = null;
            })
            .addCase(addCategoryData.rejected, (state, action) => {
                state.addCategory.loading = false;
                state.addCategory.error = action.payload;
            })
            //Delete Directory
            .addCase(deleteCategoryData.pending, (state, action) => {
                state.deleteCategory.loading = true;
            })
            .addCase(deleteCategoryData.fulfilled, (state, action) => {
                state.deleteCategory.loading = false;
                state.deleteCategory.data = action.payload;
                state.deleteCategory.error = null;
            })
            .addCase(deleteCategoryData.rejected, (state, action) => {
                state.deleteCategory.loading = false;
                state.deleteCategory.error = action.payload;
            })
            //Edit Directory
            .addCase(editCategoryData.pending, (state, action) => {
                state.editCategory.loading = true;
            })
            .addCase(editCategoryData.fulfilled, (state, action) => {
                state.editCategory.loading = false;
                state.editCategory.data = action.payload;
                state.editCategory.error = null;
            })
            .addCase(editCategoryData.rejected, (state, action) => {
                state.editCategory.loading = false;
                state.editCategory.error = action.payload;
            })
            //view Directory
            .addCase(viewCategoryData.pending, (state, action) => { 
                state.viewCategory.loading = true;
            })
            .addCase(viewCategoryData.fulfilled, (state, action) => {
                state.viewCategory.loading = false;
                state.viewCategory.data = action.payload;
                state.viewCategory.error = null;
            })
            .addCase(viewCategoryData.rejected, (state, action) => {
                state.viewCategory.loading = false;
                state.viewCategory.error = action.payload;
            })
    },

})

export default categorySlice.reducer