/**
 * AxiosInstance 캡슐화
 * @author 복성범
 */

import { useSelector } from 'react-redux';
import axiosClient from '.';
import { axiosInstance } from './axiosInstance';

// interface playlistReqDATA {   user: number; } interface IheartReqDATA {
// user: number; } interface diariesPostReq {   userSeq: number;   calYmd:
// string;   diaryContent: string;   diaryWeather: string; } interface
// questionResponse {   questionSeq: number;   questionText: string;
// questionVoice: string;   answer: string; }


// const DiariesPostAPI0 = async (data, token) => {
//   const resposnse = await axiosInstance.post('/diaries', JSON.stringify(data), {
//     headers: {
//       'Authorization': token
//     },
//   })
//   return resposnse;
// };

// const DiariesPostAPI = async (data, token) => {
//   const resposnse = await axiosClient.post('/diaries', {
//     calYmd: data.calYmd,
//     diaryContent: data.diaryContent,
//     diaryWeather: data.diaryWeather,
//   }, {
//     headers: {
//       'Authorization': token,
//     },
//   })
//   return resposnse;
// };

const DiariesPostAPI = async (data, token) => {
  const resposnse = await axiosClient.post('/diaries',
    data, {
    headers: {
      'Authorization': token,
    },
  })
  return resposnse;
};

const QuestionsGetAPI = async () => {
  const resposnse = await axiosInstance.get('/diaries/questions')
  return resposnse.data;
};

export {
  QuestionsGetAPI,
  DiariesPostAPI,
};