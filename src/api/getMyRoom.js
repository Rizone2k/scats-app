import instance from "../configs/axios.config";

const getMyRoom = async ({ idUser }) => {
    try {
        const res = await instance.post(`/room/my-room`, { idUser });
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getMyRoom;