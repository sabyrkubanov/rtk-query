import {configureStore} from "@reduxjs/toolkit";
import {usersSlice} from "./users";

const store = configureStore({
    reducer: {
        [usersSlice.reducerPath]: usersSlice.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersSlice.middleware)

})

export default store