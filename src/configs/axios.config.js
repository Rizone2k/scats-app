import axios from "axios";
import * as SecureStore from 'expo-secure-store';

async function getToken() {
    return await SecureStore.getItemAsync('access_token') || undefined;
}

const instance = axios.create({
    baseURL: 'http://192.168.1.6:5550/api/v1/',
    // baseURL: 'http://api.scats.tk/api/v1/',
    withCredentials: true,
});

instance.interceptors.request.use(
    async config => {
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
        config.headers['Content-Type'] = 'multipart/form-data';
        const token = await SecureStore.getItemAsync('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

export default instance;