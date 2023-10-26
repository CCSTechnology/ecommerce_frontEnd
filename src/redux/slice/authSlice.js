import { createSlice } from "@reduxjs/toolkit";
import {
	authLogin,
	authRegister,
	forgetPassword,
	logout,
	resetPassword,
} from "redux/api/services/authService";

const initialState = {
	login: {
		loading: false,
		data: null,
		error: null,
	},
	register: {
		loading: false,
		data: null,
		error: null,
	},
	forget: {
		loading: false,
		data: null,
		error: null,
	},
	reset: {
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
			//Auth Register
			.addCase(authRegister.pending, (state, action) => {
				state.login.loading = true;
			})
			.addCase(authRegister.fulfilled, (state, action) => {
				state.login.loading = false;
				state.login.data = action.payload;
				state.login.error = null;
			})
			.addCase(authRegister.rejected, (state, action) => {
				state.login.loading = false;
				state.login.error = action.payload;
			})
			//AForget Password
			.addCase(forgetPassword.pending, (state, action) => {
				state.forget.loading = true;
			})
			.addCase(forgetPassword.fulfilled, (state, action) => {
				state.forget.loading = false;
				state.forget.data = action.payload;
				state.forget.error = null;
			})
			.addCase(forgetPassword.rejected, (state, action) => {
				state.forget.loading = false;
				state.forget.error = action.payload;
			})
			//Reset Password
			.addCase(resetPassword.pending, (state, action) => {
				state.reset.loading = true;
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.reset.loading = false;
				state.reset.data = action.payload;
				state.reset.error = null;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.reset.loading = false;
				state.reset.error = action.payload;
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
