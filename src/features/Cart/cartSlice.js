import { createSlice } from '@reduxjs/toolkit'


// id: product?.id,
// thumbnail: product?.thumbnail,
// stockQuantity: product?.stock,
// title: product?.title,
// price: product?.price,
// manipulationPrice: product?.price,


const initialState = {
    cartItems: [],
    cartLength: 0,
    netProductsValueOfCart: 0,
    discount: 0,
    deliveryCharges: 0,
    netProductsValueIncludeOtherCharges: 0,
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductsInCart: (state, action) => {
            const { id, thumbnail, quantity, stockQuantity, title, price, manipulationPrice } = action.payload
            //check already exist in cart
            const isItemExist = state?.cartItems.find((item) => item?.id === id)
            //in case of already exist
            if (isItemExist) {
                isItemExist.quantity += 1;
                isItemExist.manipulationPrice += price;
                state.netProductsValueOfCart += manipulationPrice
                state.netProductsValueIncludeOtherCharges += manipulationPrice
            } else {
                state.cartItems?.push({ id, quantity, stockQuantity, title, price, quantity: 1, thumbnail, manipulationPrice })
                state.cartLength += 1 //used to calculate how many products in cart
                state.netProductsValueOfCart += manipulationPrice
                state.netProductsValueIncludeOtherCharges += manipulationPrice
            }
        },
        getProductsInCarts: (state, action) => {
            return { ...state }
        },
        updateProductsInCart: (state, action) => {

        },
        deleteProductsInCart: (state, action) => {
            state = state.filter(item => item.id != action.payload)
            return state
        },
        increaseProductsQuantity: (state, action) => {
            const { id, price } = action.payload;
            const item = state.cartItems.find((item) => item.id === id);
            if (item && item.quantity < item.stockQuantity) {
                item.quantity += 1;
                item.manipulationPrice += price;
                state.netProductsValueOfCart += price
                state.netProductsValueIncludeOtherCharges += price
            }
        },
        decreaseProductsQuantity: (state, action) => {
            const { id, price } = action.payload;
            const itemToUpdate = state?.cartItems?.find((item) => item.id === id);
            if (itemToUpdate && itemToUpdate?.quantity >= 2) {
                itemToUpdate.quantity--;
                itemToUpdate.manipulationPrice -= price;
                state.netProductsValueOfCart -= price
                state.netProductsValueIncludeOtherCharges -= price
            }
        },
        clearCart: (state) => {
            state.cartItems = []
            state.cartLength = 0;
            state.netProductsValueOfCart = 0
            state.discount = 0
            state.deliveryCharges = 0
            state.netProductsValueIncludeOtherCharges = 0
        },
    },
})


export const {
    addProductsInCart,
    getProductsInCarts,
    updateProductsInCart,
    deleteProductsInCart,
    increaseProductsQuantity,
    decreaseProductsQuantity,
    calculateInitialState,
    clearCart
} = cartSlice.actions

export default cartSlice.reducer

