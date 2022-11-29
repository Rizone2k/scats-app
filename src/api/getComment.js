import instance from "../configs/axios.config";

const getComment = async (id) => {
    try {
        const res = await instance.get(`/comment/${id}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getComment;