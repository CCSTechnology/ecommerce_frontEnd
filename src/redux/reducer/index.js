import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "redux/slice/authSlice";
import employeeReducer from "redux/slice/employeeSlice";
import profileReducer from "redux/slice/profileSlice";
import essentialReducer from "redux/slice/essentialSlice";
import directoryReducer from "redux/slice/directorySlice";
import categoryReducer from "redux/slice/categorySlice"
import roleReducer from "redux/slice/roleSlice";
import jobReducer from "redux/slice/jobSlice"
import formReducer from "redux/slice/formSlice"
import invoiceReducer from "redux/slice/invoiceSlice"
import notificationReducer from "redux/slice/notificationSlice"
import dashboardReducer from "redux/slice/dashboardSlice"
import productReducer from "redux/slice/productSlice"

export const rootReducer = combineReducers({
	auth: authReducer,
	employee: employeeReducer,
	profile: profileReducer,
	essential: essentialReducer,
	directory: directoryReducer,
	category: categoryReducer,
	role: roleReducer,
	form: formReducer,
	job: jobReducer,
	invoice: invoiceReducer,
	notification: notificationReducer,
	dashboard: dashboardReducer,
	product:productReducer,

});
