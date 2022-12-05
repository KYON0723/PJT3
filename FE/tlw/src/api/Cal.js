/**
 * AxiosInstance 캡슐화
 * @author 복성범
 */

import axiosClient from '.';

const CalGetAPI = async (data, token) => {
    const response = await axiosClient.get('/calendars', {
        headers: {
            Authorization: token,
        },
        params: {
            calYmd: data.calYmd
        }
    });

    return response.data;
};

const CalDetailGetAPI = async (data, token) => {
    const response = await axiosClient.get('/calendars/details', {
        headers: {
            Authorization: token,
        },
        params: {
            calYmd: data.calYmd
        }
    });

    return response.data;
};


export { CalGetAPI, CalDetailGetAPI };