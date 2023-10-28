import { combineReducers } from "@reduxjs/toolkit";
import adminCustomerReducer from "../../redux/slice/admin/customerSlice";
import adminCategoryReducer from "../../redux/slice/admin/categorySlice";
import adminProductReducer from "../../redux/slice/admin/productSlice";
import adminAuthReducer from "../../redux/slice/admin/authSlice";
import dashboardReducer from "../../redux/slice/admin/dashboardSlice";

export const rootReducer = combineReducers({
  adminAuth: adminAuthReducer,
  adminCustomer: adminCustomerReducer,
  adminCategory: adminCategoryReducer,
  adminProduct: adminProductReducer,
  dashboard: dashboardReducer,
});
