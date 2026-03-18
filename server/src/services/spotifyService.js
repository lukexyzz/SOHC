const axios = require('axios');

const getAccessToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;


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
    console.error('Error fetching Spotify Access Token:', error.response?.data || error.message);
  }
};


exports.getArtistTopTracks = async (artistId) => {
  
  const token = await getAccessToken();
  if (!token) {
    console.log("2. Token failed, exiting.");
    return [];
  }

  try {
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=GB`;
    
    console.log("3. Sending request to:", url);

    const response = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` },
      timeout: 5000 
    });

    return response.data.tracks;
  } catch (error) {
    console.error("4. ERROR during fetch:", error.response?.status, error.response?.data || error.message);
    return [];
  }
};