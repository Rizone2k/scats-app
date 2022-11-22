import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../api/axios.config';
const yearsSlice = createSlice({
    name: 'years',
    initialState: { status: 'idle', data: [] },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getYears.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getYears.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'idle';
            })
            .addCase(getYears.rejected, (state, action) => {
                state.status = 'error';
            })
    },
});

export const getYears = createAsyncThunk('years/getYears', async () => {
    try {
        const res = await instance.get(`/year`);
        if (res.status == 200) {
            const result = res.data;
            return result.data;
        }
    } catch (error) {
        throw error;
    }
});

export default yearsSlice;