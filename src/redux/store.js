import { configureStore } from '@reduxjs/toolkit';
import genresSlice from './reducers/genre';
import yearsSlice from './reducers/year';
import countriesSlice from './reducers/country';
import authSlice from './reducers/auth';
const store = configureStore({
    reducer: {
        genres: genresSlice.reducer,
        years: yearsSlice.reducer,
        countries: countriesSlice.reducer,
        auth: authSlice.reducer,
    },
});

export default store;