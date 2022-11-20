import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://192.168.1.6:5550/api/v1/',
    baseURL: 'http://api.scats.tk/api/v1/',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Content-Type": "application/json"
    },
});

export default instance;