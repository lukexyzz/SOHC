import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShowById } from '../api';

const ShowDetail = () => {
  const { id } = useParams(); // Extracts 'id' from the URL
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const { data } = await getShowById(id);
        setShow(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching show details:", err);
        setLoading(false);
      }
    };
    fetchShowData();
  }, [id]);

  if (loading) return <div>LOADING GIG DATA...</div>;
  if (!show) return <div>SHOW NOT FOUND. <Link to="/">GO BACK</Link></div>;

  return (
    <div>
      {/* 1. Basic Info */}
      <img src={show.flyer} alt={show.headliner} style={{ width: '100%', maxWidth: '500px' }} />
      <h1>{show.headliner}</h1>
      <h3>{show.venue} — {new Date(show.date).toLocaleDateString()}</h3>
      
      <p style={{ whiteSpace: 'pre-wrap' }}>{show.description}</p>

      {/* 2. Support Bands Logic */}
      {show.supports && show.supports.length > 0 && (
        <div>
          <h4>SUPPORTED BY:</h4>
          <ul>
            {show.supports.map((band, index) => (
              <li key={index}>{band}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Spotify Tracks Logic */}
      <div style={{ marginTop: '30px', borderTop: '1px solid white' }}>
        <h3>LISTEN TO {show.headliner}:</h3>
        
        {show.spotifyTracks && show.spotifyTracks.length > 0 ? (
          show.spotifyTracks.map((track) => (
            <div key={track.id} style={{ margin: '15px 0' }}>
              <p><strong>{track.name}</strong></p>
              
              {/* Logic: Using the preview_url from your backend */}
              {track.preview_url ? (
                <audio controls src={track.preview_url}>
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'gray' }}>
                  (Preview unavailable - listen on Spotify)
                </p>
              )}
            </div>
          ))
        ) : (
          <p>NO TRACKS FOUND FOR THIS ARTIST.</p>
        )}
      </div>

      <Link to="/">← BACK TO ALL SHOWS</Link>
    </div>
  );
};

export default ShowDetail;