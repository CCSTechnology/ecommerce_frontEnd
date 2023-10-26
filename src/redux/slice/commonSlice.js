import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	toast: {
		type: "success",
		messsage: null,
		show: false,
	},
};

export const profileSlice = createSlice({
	name: "common",
	initialState,
	reducers: {
     
    },

});

export default profileSlice.reducer;
