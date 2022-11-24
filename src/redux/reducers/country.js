import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../configs/axios.config';
const countriesSlice = createSlice({
    name: 'countries',
    initialState: { status: 'idle', data: [] },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCountries.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getCountries.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'idle';
            })
            .addCase(getCountries.rejected, (state, action) => {
                state.status = 'error';
            })
    },
});

export const getCountries = createAsyncThunk('countries/getCountries', async () => {
    try {
        const res = await instance.get(`/country`);
        if (res.status == 200) {
            const result = res.data;
            return result.data;
        }
    } catch (error) {
        throw error;
    }
});

export default countriesSlice;