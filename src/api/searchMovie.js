import instance from "./axios.config";

const searchMovie = async (key) => {
    try {
        const res = await instance.get(`/movie/search?key=${key}`);
        if (res.status == 200) {
            const resutl = res.data;
            return resutl;
        }
    } catch (error) {
        throw error;
    }
}

export default searchMovie;