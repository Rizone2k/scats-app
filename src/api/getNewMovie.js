import instance from "./axios.config";

const getNewMovie = async () => {
    try {
        const res = await instance.get(`/movie/new`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getNewMovie;