import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'loading',
};

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('http://localhost:3004/cart');
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addItem = createAsyncThunk(
    'cart/addItemToCart',
    async (item, { rejectWithValue, getState }) => {
        try {
            const uniqueKey = `${item.id}_${item.type}_${item.size}`;
            const state = getState();
            const existingItem = state.cart.items.find(
                (cartItem) => cartItem.id === uniqueKey
            );
            item.pizzaId = item.id;
            item.id = uniqueKey;

            if (existingItem) {
                await axios.patch(`http://localhost:3004/cart/${existingItem.id}`, {
                    count: existingItem.count + 1,
                });
            } else {
                const newItem = { ...item, count: 1 };
                await axios.post('http://localhost:3004/cart', newItem);
            }
            return item;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeItem = createAsyncThunk(
    'cart/removeItem',
    async (item, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const existingItem = state.cart.items.find(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItem.count > 1) {
                await axios.patch(`http://localhost:3004/cart/${item.id}`, {
                    count: existingItem.count - 1,
                });
            } else {
                await axios.delete(`http://localhost:3004/cart/${item.id}`);
            }
            return item.id;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeIdenticalItems = createAsyncThunk(
    'cart/removeIdenticalItems',
    async (item, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:3004/cart/${item.id}`);
            return item.id
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const removeItems = createAsyncThunk(
    'cart/removeItems',
    async (_, { rejectWithValue }) => {
        try {
            const { data: cartItems } = await axios.get('http://localhost:3004/cart');

            const deletePromises = cartItems.map((item) =>
                axios.delete(`http://localhost:3004/cart/${item.id}`)
            );

            await Promise.all(deletePromises);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    extraReducers: (builder) => {
        builder
            // Запрос корзины
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                const cart = action.payload;
                state.items = cart;
                state.status = 'success';
            })
            .addCase(fetchCart.rejected, (state) => {
                state.status = 'error';
            })

            // Добавление элемента
            .addCase(addItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addItem.fulfilled, (state, action) => {
                const newItem = action.payload;
                const existingItem = state.items.find((item) => item.id === newItem.id);
                if (existingItem) {
                    existingItem.count += 1;
                } else {
                    state.items.push({
                        ...newItem,
                        count: 1,
                    });
                }
                state.status = 'success';
            })
            .addCase(addItem.rejected, (state, action) => {
                const error = action.payload;
                state.status = 'error';
                console.log(error);
            })

            // Удаление элемента
            .addCase(removeItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                const id = action.payload;
                const existingItem = state.items.find((item) => item.id === id);

                if (existingItem.count > 1) {
                    existingItem.count = existingItem.count - 1;
                } else {
                    const itemIndex = state.items.findIndex((item) => item.id === id);
                    state.items.splice(itemIndex, 1);
                }

                state.status = 'success';
            })
            .addCase(removeItem.rejected, (state, action) => {
                const error = action.payload;
                state.status = 'error';
                console.log(error);
            })

            // Удалить все идентичные товары
            .addCase(removeIdenticalItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeIdenticalItems.fulfilled, (state, action) => {
                const id = action.payload;
                const itemIndex = state.items.findIndex((item) => item.id === id);
                state.items.splice(itemIndex, 1);
                state.status = 'success';
            })
            .addCase(removeIdenticalItems.rejected, (state, action) => {
                const error = action.payload;
                state.status = 'error';
                console.log(error);
            })

            // Очистить корзину
            .addCase(removeItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeItems.fulfilled, (state) => {
                state.items = [];
                state.status = 'success';
            })
            .addCase(removeItems.rejected, (state, action) => {
                const error = action.payload;
                state.status = 'error';
                console.log(error);
            });
    },
});

export const selectCart = (state) => state.cart.items;
export const selectCartTotalPrice = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.count * item.price, 0);
export const selectCartTotalItems = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.count, 0);

export default cartSlice.reducer;