import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    "userData": {},
    "isLoggedIn": false,
    "isLoading": false,
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserOnLogin: (state, action) => {
            state.userData = action.payload
            state.isLoggedIn = true
            state.isLoading = false
        },
        removeUserOnLogout: (state, action) => {
            state.userData = action.payload
            state.isLoggedIn = false
        },
        loader: (state, action) => {
            state.isLoading = action.payload

        }
    },
})


export const {
    saveUserOnLogin,
    removeUserOnLogout,
    loader,
} = userSlice.actions

export default userSlice.reducer

