import instance from "./axios.config";

const getGenre = async () => {
    try {
        const res = await instance.get(`/genre`);
        if (res.status == 200) {
            const resutl = res.data;
            return resutl;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default getGenre;