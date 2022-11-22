import instance from "./axios.config";

const getMovie = async (id) => {
    try {
        const res = await instance.get(`/movie/${id}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getMovie;