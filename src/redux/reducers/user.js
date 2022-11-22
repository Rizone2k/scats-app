import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../api/axios.config';
const userSlice = createSlice({
    name: 'user',
    initialState: {},
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
            .addCase(login.fulfilled, (state, action) => {
                state = action.payload;
            })
    },
});

export const login = createAsyncThunk('user/login', async (username, password) => {
    try {
        const res = await instance.post(`/auth/login`, { username, password });
        if (res.status == 200) {
            const result = res.data;
            return result.data;
        }
    } catch (error) {
        throw error;
    }
});

export default userSlice;