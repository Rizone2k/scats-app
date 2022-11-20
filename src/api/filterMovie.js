import instance from "./axios.config";

const filterMovie = async (filter) => {
    try {
        const res = await instance.get(`/movie/filter?${filter}`);
        if (res.status == 200) {
            const resutl = res.data;
            return resutl;
        }
    } catch (error) {
        throw error;
    }
}

export default filterMovie;