import axios from "axios";

const instance = axios.create({
    baseURL: 'http://api.scats.tk/api/v1/',
});

export default instance;