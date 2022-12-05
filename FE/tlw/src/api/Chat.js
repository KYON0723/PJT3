/**
 * AxiosInstance 캡슐화
 * @author 복성범
 */
import { axiosInstance } from './axiosInstance';

const ChatPostAPI = async (name, token) => {
    const resposnse = await axiosInstance.post('/chat/room',
        {}, {
        params: {
            name: name
        },
        headers: {
            'Authorization': token,
        },
    })
    return resposnse;
};

export {
    ChatPostAPI
};