import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    "userData": {},
    "isLoggedIn": false
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserOnLogin: (state, action) => {
            state.userData = action.payload
            state.isLoggedIn = true
        },
        removeUserOnLogout: (state, action) => {
            state.userData = action.payload
            state.isLoggedIn = false
        },
    },
})


export const {
    saveUserOnLogin,
    removeUserOnLogout
} = userSlice.actions

export default userSlice.reducer

