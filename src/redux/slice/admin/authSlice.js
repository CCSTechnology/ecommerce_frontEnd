import { createSlice } from "@reduxjs/toolkit";
import {
	authLogin,
	authRegister,
	forgetPassword,
	logout,
	resetPassword,
} from "../../../redux/api/admin/authService";

const initialState = {
	login: {
		loading: false,
		data: null,
		error: null,
	},
	
	logout: {
		loading: false,
		data: null,
		error: null,
	},
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//GET
		builder
			//Auth login
			.addCase(authLogin.pending, (state, action) => {
				state.login.loading = true;
			})
			.addCase(authLogin.fulfilled, (state, action) => {
				state.login.loading = false;
				state.login.data = action.payload;
				state.login.error = null;
			})
			.addCase(authLogin.rejected, (state, action) => {
				state.login.loading = false;
				state.login.error = action.payload;
			})
			
			
			
			//Logout
			.addCase(logout.pending, (state, action) => {
				state.logout.loading = true;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.logout.loading = false;
				state.logout.data = action.payload;
				state.logout.error = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.logout.loading = false;
				state.logout.error = action.payload;
			});
	},
});

export default authSlice.reducer;
