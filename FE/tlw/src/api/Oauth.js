/**
 * 11-14 오어스 구현
 * @author 복성범
 */

import axiosClient from '.';
import { axiosInstance } from './axiosInstance';

// interface playlistReqDATA {
//   user: number;
// }

// interface IheartReqDATA {
//   user: number;
// }

// interface diariesPostReq {
//   userSeq: number;
//   calYmd: string;
//   diaryContent: string;
//   diaryWeather: string;
// }

// interface questionResponse {
//   questionSeq: number;
//   questionText: string;
//   questionVoice: string;
//   answer: string;
// }



// const kakaoTokenGetAPI = async (code) => {
//     const resposnse = await axiosInstance.post(`/oauth/kakao?code=${code}`)
//     return resposnse;
// };

const kakaoTokenGetAPI = async (code) => {
    const resposnse = await axiosClient.post(`/oauth/kakao`, { code: code })
    return resposnse;
};

const kakaoTokenGetAPI2 = async (data) => {
    const resposnse = await axiosInstance.post(`/oauth/kakao`, data)

    return resposnse;
};

const googleTokenGetAPI = async (code) => {
    const resposnse = await axiosInstance.post('/oauth/google', JSON.stringify(code))

    return resposnse;
};


export { kakaoTokenGetAPI, googleTokenGetAPI, kakaoTokenGetAPI2 };