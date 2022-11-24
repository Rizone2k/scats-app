import instance from "../configs/axios.config";

const getBanner = async () => {
    try {
        const res = await instance.get(`/movie/banner`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getBanner;