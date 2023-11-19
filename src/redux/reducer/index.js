import { combineReducers } from "@reduxjs/toolkit";
//Admin
import adminCustomerReducer from "../../redux/slice/admin/customerSlice";
import adminCategoryReducer from "../../redux/slice/admin/categorySlice";
import adminProductReducer from "../../redux/slice/admin/productSlice";
import adminAuthReducer from "../../redux/slice/admin/authSlice";
import dashboardReducer from "../../redux/slice/admin/dashboardSlice";
import adminSettingReducer from "../../redux/slice/admin/settingSlice";

// Public
import homeReducer from "../../redux/slice/public/homeSlice";
import categoryReducer from "../../redux/slice/public/categorySlice";
import productReducer from "../../redux/slice/public/productSlice";
import cartReducer from "../../redux/slice/public/cartSlice";



export const rootReducer = combineReducers({
  adminAuth: adminAuthReducer,
  adminCustomer: adminCustomerReducer,
  adminCategory: adminCategoryReducer,
  adminProduct: adminProductReducer,
  dashboard: dashboardReducer,
  adminSetting: adminSettingReducer,
  home: homeReducer,
  category: categoryReducer,
  product: productReducer,
  cart : cartReducer
});
