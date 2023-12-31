import { configureStore } from '@reduxjs/toolkit'
import cartReducers from '../features/Cart/cartSlice'
import userReducers from '../features/Auth/authSlice'




export const store = configureStore({
  reducer: {
    cart: cartReducers,
    user: userReducers,
  },
})