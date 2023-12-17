import { combineReducers } from "@reduxjs/toolkit";
//Admin
import adminCustomerReducer from "../../redux/slice/admin/customerSlice";
import adminCategoryReducer from "../../redux/slice/admin/categorySlice";
import adminProductReducer from "../../redux/slice/admin/productSlice";
import adminAuthReducer from "../../redux/slice/admin/authSlice";
import dashboardReducer from "../../redux/slice/admin/dashboardSlice";
import adminSettingReducer from "../../redux/slice/admin/settingSlice";
import adminOrderReducer from "../../redux/slice/admin/orderSlice";
import adminPromotionReducer from "../../redux/slice/admin/promotionSlice";
// Public
import homeReducer from "../../redux/slice/public/homeSlice";
import categoryReducer from "../../redux/slice/public/categorySlice";
import productReducer from "../../redux/slice/public/productSlice";
import cartReducer from "../../redux/slice/public/cartSlice";
import publicAuthReducer from "../../redux/slice/public/authSlice";
import myProfileReducer from "../../redux/slice/public/profileSlice";

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
  cart: cartReducer,
  publicAuth: publicAuthReducer,
  myProfile: myProfileReducer,
  adminOrder: adminOrderReducer,
  adminPromotion: adminPromotionReducer,
});
