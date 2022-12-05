import { axiosInstance } from './axiosInstance';

const getTopMusic = async () => {
  const resposnse = await axiosInstance.get('/search', {
    params: {
      page: 1,
    }
  })
  return resposnse.data;
};

const getSearchMusic = async (keyword, searchType) => {
  const resposnse = await axiosInstance.get(`/search/${keyword}`, {
    params: {
      type: searchType,
      page: 1,
    }
  })
  return resposnse.data;
};


export { getTopMusic, getSearchMusic };