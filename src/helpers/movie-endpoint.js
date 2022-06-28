import axios from 'axios'
import common from '@/helpers/common'

const movieEndpoint = {};

movieEndpoint.getMovies = async function (algorithm, page, timeWindow) {
  const endpoints = {
    trending: `/trending/movie/${timeWindow}?api_key=${common.API_KEY}&page=${page}`,
    popular: `/movie/popular?api_key=${common.API_KEY}&page=${page}`
  }

  try {
    const res = await axios.get(`${common.BASE_URL}${endpoints[algorithm]}`);

    return res.data;
  } catch (err) {
    console.error(err.code, err.response.data.status_message);
  }
};

movieEndpoint.getMovieById = async function (id) {
  const endpoint = `${common.BASE_URL}/movie/${id}?api_key=${common.API_KEY}&language=en-US`;

  try {
    const res = await axios.get(endpoint);

    return res.data;
  } catch (err) {
    console.error(err.code, err.response.data.status_message);
  }
};

movieEndpoint.searchMovies = async function (query, page) {
  const searchEndpoint = `${common.BASE_URL}/search/movie?api_key=${common.API_KEY}&language=en-US&page=${page}
    &include_adult=false&query=${query}`;

  try {
    const res = await axios.get(searchEndpoint);

    return res.data;
  } catch(err) {
    console.error(err.code, err.response.data.status_message);
  }
};

export default movieEndpoint;