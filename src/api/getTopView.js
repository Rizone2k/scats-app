import instance from "../configs/axios.config";

const getTopView = async () => {
    try {
        const res = await instance.get(`/movie/top/view`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getTopView;