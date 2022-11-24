import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../configs/axios.config';
const genresSlice = createSlice({
    name: 'genres',
    initialState: { status: 'idle', data: [] },
    reducers: {
        // IMMER
        // addTodo: (state, action) => {
        //     state.push(action.payload);
        // }, // action creators
        // toggleTodoStatus: (state, action) => {
        //     const currentTodo = state.find((todo) => todo.id === action.payload);
        //     if (currentTodo) {
        //         currentTodo.completed = !currentTodo.completed;
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'idle';
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.status = 'error';
            })
    },
});

export const getGenres = createAsyncThunk('genres/getGenres', async () => {
    try {
        const res = await instance.get(`/genre`);
        if (res.status == 200) {
            const result = res.data;
            return result.data;
        }
    } catch (error) {
        throw error;
    }
});

export default genresSlice;