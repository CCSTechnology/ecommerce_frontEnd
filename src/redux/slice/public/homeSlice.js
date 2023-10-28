import { homeDataService } from "../../api/public/homeService";

const homeCases = [{
    api : homeDataService,
    name : "homeDataService"
}]

const initialState = {
}

homeCases.forEach((cases)=>{
    initialState[cases.name] ={
        loading : false,
        data : null,
        error : null,
    }
})

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        homeCases.forEach((cases)=>{
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

export default homeSlice.reducer