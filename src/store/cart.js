import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: "cart",
    initialState: {
        items: [],
        orderTotal: 0,
        totalQuantity: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                if(existingItem.allowedQuantity <= existingItem.quantity) {alert("You have reached the maximum quantity for this item."); return;}
                existingItem.quantity++;
                existingItem.totalPrice += action.payload.price || 0;
            } else {
                if(action.payload.allowedQuantity <= 0) {alert("This product is out of stock currently."); return;}
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                    totalPrice: action.payload.price || 0,
                    price: action.payload.price || 0,
                });
            }
            state.totalQuantity++;
            state.orderTotal = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.orderTotal = 0;
        },
        removeFromCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
                if (existingItem.quantity === 0) {
                    state.items = state.items.filter(item => item.id !== action.payload);
                }
                state.totalQuantity--;
                if (state.totalQuantity < 0) {
                    state.totalQuantity = 0;
                }
            }
            state.orderTotal = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
    },
});

export const cartAction = cart.actions;
export default cart.reducer;
