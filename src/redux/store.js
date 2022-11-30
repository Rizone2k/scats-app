import { configureStore } from '@reduxjs/toolkit';
import genresSlice from './reducers/genre';
import yearsSlice from './reducers/year';
import countriesSlice from './reducers/country';
import authSlice from './reducers/auth';
import commentsSlice from './reducers/comment';
const store = configureStore({
    reducer: {
        genres: genresSlice.reducer,
        years: yearsSlice.reducer,
        countries: countriesSlice.reducer,
        auth: authSlice.reducer,
        comments: commentsSlice.reducer
    },
});

export default store;