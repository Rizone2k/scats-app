import instance from "../configs/axios.config";

const createRoom = async (data) => {
    try {
        const res = await instance.post(`/room`, data);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default createRoom;