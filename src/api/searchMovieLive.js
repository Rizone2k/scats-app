import instance from "../configs/axios.config";

const searchMovieLive = async (key) => {
    try {
        const res = await instance.get(`/movie/search-live?key=${key}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default searchMovieLive;