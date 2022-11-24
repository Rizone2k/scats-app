import instance from "../configs/axios.config";

const searchMovie = async (key) => {
    try {
        const res = await instance.get(`/movie/search?${key}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default searchMovie;