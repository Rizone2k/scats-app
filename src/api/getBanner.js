import instance from "./axios.config";

const getBanner = async () => {
    try {
        const res = await instance.get(`/movie/banner`);
        if (res.status == 200) {
            const resutl = res.data;
            return resutl;
        }
    } catch (error) {
        throw error;
    }
}

export default getBanner;