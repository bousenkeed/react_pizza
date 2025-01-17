import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import pizzasReducer from './slices/pizzaSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        cart: cartReducer,
        pizza: pizzasReducer,
        search: searchReducer,
    },
});
