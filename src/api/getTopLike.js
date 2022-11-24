import instance from "../configs/axios.config";

const getTopLike = async () => {
    try {
        const res = await instance.get(`/movie/top/like`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getTopLike;