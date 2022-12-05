import { axiosInstance } from './axiosInstance';

const musicCommentPutAPI = async (data, token) => {
  const resposnse = await axiosInstance.put('/musics/comments', {
    params: {
      commentSeq: data.commentSeq,
      comment: data.comment,
    },
    headers: { 'Authorization': token, },
  });

  return resposnse.data;
};

// data : comment, musicSeq
const musicCommentPostAPI = async (data, token) => {
  const resposnse = await axiosInstance.post('/musics/comments', data, {
    headers: { 'Authorization': token, },
  });

  return resposnse.data;
};

const musicCommentDeleteAPI = async (data, token) => {
  const resposnse = await axiosInstance.delete('/musics/comments', {
    params: { commentSeq: data.commentSeq },
    headers: { 'Authorization': token, },
  });

  return resposnse;
};


export { musicCommentPutAPI, musicCommentPostAPI, musicCommentDeleteAPI };

