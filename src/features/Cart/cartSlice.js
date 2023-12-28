import { createSlice } from '@reduxjs/toolkit'


// "id": product?.id,
// "stockQuantity": product?.stock,
// "title": product?.title,
// "price": product?.price,


const initialState = {
    "cartItems": [],
    "price": {
        "itemsCount": 0,
        "worth": 0
    },
    "discount": 0,
    "deliveryCharges": 0,
    "totalAmount": 0,
    "cartLength": 0
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductsInCart: (state, action) => {
            const { id, quantity, stockQuantity, title, price } = action.payload
            console.log('addProductsInCart___id', id);
            //check already exist in cart
            const isItemExist = state?.cartItems.find((item) => item?.id === id)
            //in case of already exist
            if (isItemExist) {
                isItemExist.quantity += 1;
                isItemExist.price += price;
                state.price.worth += price
                state.totalAmount += price
            } else {
                state.cartItems?.push({ id, quantity, stockQuantity, title, price, quantity: 1 })
                state.price.worth += price
                state.price.totalAmount += price
                state.cartLength += 1
                state.totalAmount += price
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
                item.price += price;
                state.price.worth += item.price;
                state.price.itemsCount = state.cartItems?.length || 0;
                state.totalAmount += item.price
            }
        },
        descreaseProductsQuantity: (state, action) => {
            const { id, price } = action.payload;
            const itemToUpdate = state?.cartItems?.find((item) => item.id === id);
            if (itemToUpdate && itemToUpdate?.quantity >= 2) {
                itemToUpdate.quantity--;
                itemToUpdate.price += price;
                state.price.worth = state.price.worth - itemToUpdate.price;
                state.price.itemsCount = state.cartItems?.length || 0;
                state.totalAmount = state.totalAmount - itemToUpdate.price
            }
        },
        clearCart: (state, action) => {
            state.cartItems = []
            state.price.worth = 0;
            state.price.itemsCount = 0;
            state.totalAmount = 0
            state.cartLength = 0
        },
    },
})


export const {
    addProductsInCart,
    getProductsInCarts,
    updateProductsInCart,
    deleteProductsInCart,
    increaseProductsQuantity,
    descreaseProductsQuantity,
    calculateInitialState,
    clearCart
} = cartSlice.actions

export default cartSlice.reducer

