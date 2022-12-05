/**
 * AxiosInstance 캡슐화
 * @author 복성범
 */

import { axiosInstance } from './axiosInstance';

const playlistGetAPI = async (token) => {
  const resposnse = await axiosInstance.get('/playlists', {
    headers: {
      'Authorization': token
    }
  });

  return resposnse.data;
};

const playlistPutAPI = async (data, token) => {
  const resposnse = await axiosInstance.post(`/playlists/musics/${data.playSeq}`, data.data, {
    headers: {
      'Authorization': token
    }
  });
  return resposnse.data;
};

// data : playname
const playlistPostAPI = async (data, token) => {
  const resposnse = await axiosInstance.get('/playlists', data, {
    headers: {
      'Authorization': token
    }
  });

  return resposnse.data;
};

const playlistDeleteAPI = async (data, token) => {
  const resposnse = await axiosInstance.get('/playlists', {
    params: {
      playSeq: data.playSeq
    },
    headers: {
      'Authorization': token
    }
  });

  return resposnse.data;
};

// const playlistMusicPutAPI = async () => {
//   const resposnse = await axiosInstance.get('/playlists', {
//     params: {
//       user: ``
//     }
//   })
//   return resposnse.data;
// };

// const playlistMusicPostAPI = async () => {
//   const resposnse = await axiosInstance.get('/playlists', {
//     params: {
//       user: ``
//     }
//   })
//   return resposnse.data;
// };

export {
  playlistGetAPI,
  playlistPutAPI,
  playlistPostAPI,
  playlistDeleteAPI
};