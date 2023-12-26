import { configureStore } from '@reduxjs/toolkit'
import todoReducers from '../features/todo/todoSlice'
import productReducers from '../features/products/productSlice'


export const store = configureStore({
  reducer: {
    todo: todoReducers,
    products: productReducers,
  },
})