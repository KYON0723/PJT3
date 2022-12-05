import { useSelector } from 'react-redux';
import { axiosInstance } from './axiosInstance';

const MusicsLikesPostAPI = async (user) => {
  const token = useSelector((state) => state.auth.accessToken);
  const resposnse = await axiosInstance.get('/asdf/asdf', {
    user: user
  }, {
    headers: token
  })
  return resposnse.data;
};

const MusicsGetAPI = async (number, token) => {
  const resposnse = await axiosInstance.get('/musics', {
    headers: {
      Authorization: token,
    },
    params: {
      musicSeq: number,
    }
  })
  return resposnse.data;
};


export { MusicsLikesPostAPI, MusicsGetAPI };