import { createSelector } from '@reduxjs/toolkit';

export const genresSelector = (state) => state.genres.data;
export const yearsSelector = (state) => state.years.data;
export const countriesSelector = (state) => state.countries.data;

export const currentUserSelector = (state) => state.auth.currentUser;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;

export const commentsSelector = (state) => state.comments;