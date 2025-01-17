import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeCategory: 'все',
    currentPage: 1,
    selectedSort: {
        name: 'популярные 🏆',
        sort: 'rating',
        order: 'desc',
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            const category = action.payload;
            state.activeCategory = category;
        },
        setSelectedSort: (state, action) => {
            const sortValue = action.payload;
            state.selectedSort = sortValue;
        },
        setCurrentPage: (state, action) => {
            const currentPage = action.payload;
            state.currentPage = currentPage;
        },
        setFilters: (state, action) => {
            state.activeCategory = action.payload.category;
            state.currentPage = Number(action.payload.page);
            state.selectedSort = action.payload.selectedSort;
        },
    },
});

export const { setActiveCategory, setSelectedSort, setCurrentPage, setFilters } =
    filterSlice.actions;

export const selectFilters = (state) => state.filters;

export default filterSlice.reducer;
