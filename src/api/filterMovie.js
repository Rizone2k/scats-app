import instance from "../configs/axios.config";

const filterMovie = async (filter) => {
    try {
        const res = await instance.get(`/movie/filter?${filter}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default filterMovie;