import { configureStore } from "@reduxjs/toolkit"
import menuReducer from "./slices/menuSlice"
import cartReducer from "./slices/cartSlice"

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
