import { headerSearch, homeDataService } from "../../api/public/homeService";
import { createSlice } from "@reduxjs/toolkit";

const homeCases = [{
  api: homeDataService,
  name: "homeDataService"
}, {
  api: headerSearch,
    name : "headerSearch"
}]

const initialState = {
}

homeCases.forEach((cases) => {
  initialState[cases.name] = {
    loading: false,
    data: undefined,
    error: null,
  }
})

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    homeCases.forEach((cases) => {
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
          state[cases.name].data = null;
          state[cases.name].error = payload;
        });
    })
  },

})

export default homeSlice.reducer