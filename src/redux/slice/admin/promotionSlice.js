import {
  addPromotion,
  UpdatePromotion,
  viewPromotion,
  listPromotion,
  deletePromotion,
} from "../../api/admin/promotionService";
import { createSlice } from "@reduxjs/toolkit";

const myPromotionCases = [
  {
    api: addPromotion,
    name: "addPromotion",
  },
  {
    api: UpdatePromotion,
    name: "UpdatePromotion",
  },
  {
    api: viewPromotion,
    name: "viewPromotion",
  },
  {
    api: listPromotion,
    name: "listPromotion",
  },
  {
    api: deletePromotion,
    name: "deletePromotion",
  },
];

const initialState = {};

myPromotionCases.forEach((cases) => {
  initialState[cases.name] = {
    loading: false,
    data: null,
    error: null,
  };
});

export const myPromotionSlice = createSlice({
  name: "myPromotion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    myPromotionCases.forEach((cases) => {
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
    });
  },
});

export default myPromotionSlice.reducer;
