const axios = require('axios');

const getAccessToken = async () => {
  const clientId = '5687e3f47c544289bba5eb4b5c925e96';
  const clientSecret = '1b20ad37886f4863bb4ceb598edff921';
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error.response?.data || error.message);
  }
};

const getArtistTopTracks = async (artistId) => {
  const token = await getAccessToken();
  if (!token) return console.log("No token");

  try {
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;
    const response = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(response.data);
  } catch (error) {
    console.error("ERROR 403 response data:", error.response?.data);
  }
};

getArtistTopTracks('6eUKZXaKkcviH0Ku9w2n3V');
