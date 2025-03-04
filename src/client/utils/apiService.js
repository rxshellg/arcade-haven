import axios from 'axios';

const headers = {
  'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
};

export const fetchGames = async (params = {}) => {
  const apiUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

  try {
    const response = await axios.get(apiUrl, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchGameDetails = async (id) => {
  const apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;

  try {
    const response = await axios.get(apiUrl, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};