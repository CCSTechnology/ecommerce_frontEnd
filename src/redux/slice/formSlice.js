import { createSlice } from "@reduxjs/toolkit";
import { formList, addFormData, deleteForm, formListGetById } from "redux/api/services/formService";

const initialState = {
	formList: {
		loading: false,
		data: [],
		error: null,
	},
	deleteUpdate: {
		loading: false,
		data: [],
		error: null,
	},

	addFormData: {
		loading: false,
		data: [],
		error: null,
	},

	formListGetById: {
		loading: false,
		data: [],
		error: null,
	},
};

export const roleSlice = createSlice({
	name: "forms",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//Get me
			.addCase(formList.pending, (state, action) => {
				state.formList.loading = true;
			})
			.addCase(formList.fulfilled, (state, action) => {
				state.formList.loading = false;
				state.formList.data = action.payload;
				state.formList.error = null;
			})
			.addCase(formList.rejected, (state, action) => {
				state.formList.loading = false;
				state.formList.error = action.payload;
			})

			//Add Role
			.addCase(addFormData.pending, (state, action) => {
				state.addFormData.loading = true;
			})
			.addCase(addFormData.fulfilled, (state, action) => {
				state.addFormData.loading = false;
				state.addFormData.data = action.payload;
				state.addFormData.error = null;
			})
			.addCase(addFormData.rejected, (state, action) => {
				state.addFormData.loading = false;
				state.addFormData.error = action.payload;
			})

			//Delete form
			.addCase(deleteForm.pending, (state, action) => {
				state.deleteUpdate.loading = true;
			})
			.addCase(deleteForm.fulfilled, (state, action) => {
				state.deleteUpdate.loading = false;
				state.deleteUpdate.data = action.payload;
				state.deleteUpdate.error = null;
			})
			.addCase(deleteForm.rejected, (state, action) => {
				state.deleteUpdate.loading = false;
				state.deleteUpdate.error = action.payload;
			})

			.addCase(formListGetById.pending, (state, action) => {
				state.formListGetById.loading = true;
			})
			.addCase(formListGetById.fulfilled, (state, action) => {
				state.formListGetById.loading = false;
				state.formListGetById.data = action.payload;
				state.formListGetById.error = null;
			})
			.addCase(formListGetById.rejected, (state, action) => {
				state.formListGetById.loading = false;
				state.formListGetById.error = action.payload;
			});
	},
});

export default roleSlice.reducer;
