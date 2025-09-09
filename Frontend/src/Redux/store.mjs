import { configureStore } from "@reduxjs/toolkit";
import userReducre from './UserSlice.mjs'
import apartmentsReducer from "./ApartSlice.mjs"

export const store = configureStore({
    reducer:{
        user:userReducre,
        apart:apartmentsReducer
    }
})
