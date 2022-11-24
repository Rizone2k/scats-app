import instance from "../configs/axios.config";

const getRoomLive = async () => {
    try {
        const res = await instance.get(`/room/live`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getRoomLive;