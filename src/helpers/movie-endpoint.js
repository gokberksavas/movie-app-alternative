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

    return res.data.results;
  } catch (err) {
    console.log(err);
    console.error(err.code, err.response.data.status_message);
  }
}

export default movieEndpoint;