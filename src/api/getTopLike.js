import instance from "./axios.config";

const getTopLike = async () => {
    try {
        const res = await instance.get(`/movie/top/like`);
        if (res.status == 200) {
            const resutl = res.data;
            return resutl;
        }
    } catch (error) {
        throw error;
    }
}

export default getTopLike;