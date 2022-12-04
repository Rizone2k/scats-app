import instance from "../configs/axios.config";

const getLibrary = async (idUser) => {
    try {
        const res = await instance.get(`/library/${idUser}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getLibrary;