import { configureStore } from '@reduxjs/toolkit';
import genresSlice from './reducers/genre';
import yearsSlice from './reducers/year';
import countriesSlice from './reducers/country';
import userSlice from './reducers/user';
const store = configureStore({
    reducer: {
        genres: genresSlice.reducer,
        years: yearsSlice.reducer,
        countries: countriesSlice.reducer,
        user: userSlice.reducer,
    },
});

export default store;