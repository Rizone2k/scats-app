import instance from "./axios.config";

const getYear = async () => {
    try {
        const res = await instance.get(`/year`);
        if (res.status == 200) {
            const resutl = res.data;
            return resutl;
        }
    } catch (error) {
        throw error;
    }
}

export default getYear;