import instance from "./axios.config";

const getCountry = async () => {
    try {
        const res = await instance.get(`/country`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getCountry;