/**
 * 11- 15 이전에 삭제 예정
 * @author 복성범
 */

import axios from "axios";
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosClient.withCredentials = true;

export default axiosClient;
