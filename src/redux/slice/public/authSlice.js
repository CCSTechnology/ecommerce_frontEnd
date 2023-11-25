import { createSlice } from "@reduxjs/toolkit";
import {publicAuthLogin  } from "../../api/public/authServices";

const authCases = [{
    api : addauthServices,
    name : "addauthServices"
}]

const initialState = {
    authProducts : [] 
}

authCases.forEach((cases)=>{
    initialState[cases.name] ={
        loading : false,
        data : null,
        error : null,
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        authCases.forEach((cases)=>{
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
            });
        })
    },

})

export const {addauth} = authSlice.actions

export default authSlice.reducer