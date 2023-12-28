import { configureStore } from '@reduxjs/toolkit'
import todoReducers from '../features/todo/todoSlice'
import cartReducers from '../features/Cart/cartSlice'
import userReducers from '../features/Auth/authSlice'




export const store = configureStore({
  reducer: {
    todo: todoReducers,
    cart: cartReducers,
    user: userReducers,
  },
})