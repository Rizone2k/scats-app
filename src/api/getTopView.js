import instance from "./axios.config";

const getTopView = async () => {
    try {
        const res = await instance.get(`/movie/top/view`);
        if (res.status == 200) {
            const resutl = res.data;
            return resutl;
        }
    } catch (error) {
        throw error;
    }
}

export default getTopView;