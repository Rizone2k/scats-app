import instance from "../configs/axios.config";

const register = async (username, password) => {
    try {
        const res = await instance.post(`/auth/register`, { username, password });
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default register;