import instance from "../configs/axios.config";

const getYear = async () => {
    try {
        const res = await instance.get(`/year`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getYear;