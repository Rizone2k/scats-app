import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import instance from '../../api/axios.config';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        curentUser: {}
    },
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
                state.isLoggedIn = true;
                state.curentUser = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.curentUser = {};
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.curentUser = action.payload;
            })
    },
});

export const login = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
    try {
        const res = await instance.post(`/auth/login`, { username, password });
        if (res.status == 200) {
            if (res.data.status == 'success') {
                await SecureStore.setItemAsync('access_token', res.data.data.access_token);
                await SecureStore.setItemAsync('uid', String(res.data.data.user.id));
                return res.data.data.user;
            } else {
                throw rejectWithValue(res.data.message);
            }
        }
    } catch (error) {
        // console.log(error)
        if (error.payload) {
            throw rejectWithValue(error.payload);
        } else {
            throw error;
        }
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const res = await instance.get(`/auth/logout`);
        if (res.status == 200) {
            if (res.data.status == 'success') {
                await SecureStore.deleteItemAsync('access_token');
                await SecureStore.deleteItemAsync('uid');
            } else {
                throw rejectWithValue(res.data.message);
            }
        }
    } catch (error) {
        if (error.payload) {
            throw rejectWithValue(error.payload);
        } else {
            throw error;
        }
    }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
    try {
        const id = await SecureStore.getItemAsync('uid');
        const res = await instance.post(`/auth/refresh-token`, { id });
        if (res.status == 200) {
            if (res.data.status == 'success') {
                await SecureStore.setItemAsync('access_token', res.data.data.access_token);
                return res.data.data.user;
            } else {
                await SecureStore.deleteItemAsync('access_token');
                throw rejectWithValue(res.data.message);
            }
        }
    } catch (error) {
        if (error.payload) {
            throw rejectWithValue(error.payload);
        } else {
            throw error;
        }
    }
});

export default authSlice;