import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "redux/reducer"

// const makeStore = (preloadedState) => {
// 	return configureStore({
// 		reducer: rootReducer,
// 	});
// }

export const store = configureStore({
	reducer: rootReducer,
})



