import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    visibleCount: 8,
    status: 'loading',
};

export const fetchPizzas = createAsyncThunk(
    'search/fetchPizzas',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`http://localhost:3004/items`);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setVisibleCount: (state, action) => {
            const newVisibleCount = action.payload;
            state.visibleCount = newVisibleCount;
        },
        resetVisibleCount: (state) => {
            state.visibleCount = 8;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                const items = action.payload;
                state.items = items;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export const selectSearch = (state) => state.search;

export const { setVisibleCount, resetVisibleCount } = searchSlice.actions;

export default searchSlice.reducer;
