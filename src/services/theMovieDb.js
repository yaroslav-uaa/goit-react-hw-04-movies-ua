import axios from 'axios';

const apiKey = 'd2712e049a4d1b0de21ce6b389f4cf03';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = { api_key: apiKey };

const getTrending = async (page = 1) => {
  const { data } = await axios.get(`/trending/movie/day?page=${page}`);
  return data;
};

const searchMovies = async (query, page = 1) => {
  const { data } = await axios.get(
    `/search/movie?&language=en-US&query=${query}&page=${page}&include_adult=false`,
  );
  return data;
};

const getMoviesDetails = async movieID => {
  try {
    const response = await axios.get(`/movie/${movieID}`);
    if (response.status === 200) {
      console.log('result', response.status);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const getCredits = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data;
};

const getReviews = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  return data;
};

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export {
  getTrending,
  searchMovies,
  getMoviesDetails,
  getCredits,
  getReviews,
  Status,
};
