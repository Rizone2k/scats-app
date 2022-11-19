import instance from "./axios.config";

const getNewMovie = async () => {
    try {
        const res = await instance.get(`/movie/new`);
        if (res.status == 200) {
            const resutl = res.data;
            return resutl;
        }
    } catch (error) {
        throw error;
    }
}

export default getNewMovie;