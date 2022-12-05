/**
 * AxiosInstance 캡슐화
 * @author 복성범
 */

import axios from 'axios';

const createAxiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    return axiosInstance;
};

export const axiosInstance = createAxiosInstance();