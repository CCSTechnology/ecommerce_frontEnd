import { configureStore } from "@reduxjs/toolkit"
import { rootPublicReducer, rootAdminReducer } from "redux/reducer"

export const store = configureStore({
	reducer: {
        ...rootAdminReducer,
        ...rootPublicReducer
    },
})



