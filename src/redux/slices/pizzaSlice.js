import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3004/items`, {
                params,
            });
            
            return {
                data: response.data,
                totalItems: response.headers['x-total-count'],
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    items: [],
    status: 'loading',
    totalItems: 0,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.totalItems = 0;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                const { data, totalItems } = action.payload;
                state.items = data;
                state.totalItems = totalItems;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = 'error';
            });
    },
});

export const selectPizzas = (state) => state.pizza;

export default pizzaSlice.reducer;
