import { createSelector } from '@reduxjs/toolkit';

// export const searchTextSelector = (state) => state.filters.search;
// export const filterStatusSelector = (state) => state.filters.status;
// export const filterPrioritiesSelector = (state) => state.filters.priorities;
export const genresSelector = (state) => state.genres.data;
export const yearsSelector = (state) => state.years.data;
export const countriesSelector = (state) => state.countries.data;

export const curentUserSelector = (state) => state.auth.curentUser;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;