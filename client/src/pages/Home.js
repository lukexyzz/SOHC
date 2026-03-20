import React, { useState, useEffect } from 'react';
import { getUpcomingShows, deleteShow } from '../api';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [clickCounts, setClickCounts] = useState({});


  useEffect(() => {
    const loadShows = async () => {
      try {
        const { data } = await getUpcomingShows();
        setShows(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    loadShows();
  }, []);


  const handleSecretDelete = async (id) => {

    const currentCount = (clickCounts[id] || 0) + 1;
    
    if (currentCount === 5) {
      const confirm = window.confirm("ADMIN: Permanently delete this gig?");
      if (confirm) {
        try {
          await deleteShow(id);

          setShows(shows.filter(s => s._id !== id));
          alert("Show nuked.");
        } catch (err) {
          alert("Unauthorized. Admin password missing or wrong.");
        }
      }

      setClickCounts({ ...clickCounts, [id]: 0 });
    } else {
      setClickCounts({ ...clickCounts, [id]: currentCount });
    }
  };

  if (loading) return <div>LOADING GIGS...</div>;

  return (
    <div>
      {shows.length === 0 ? (
        <p>NO UPCOMING SHOWS. CHECK BACK SOON.</p>
      ) : (
        shows.map(show => (
          <div key={show._id} style={{ marginBottom: '40px' }}>
            {/* The Flyer: 5 clicks here triggers the delete logic */}
            <img 
              src={show.flyer} 
              alt={show.headliner} 
              onClick={() => handleSecretDelete(show._id)}
              style={{ width: '100%', maxWidth: '400px', cursor: 'pointer' }}
            />
            
            <h2>{show.headliner}</h2>
            <p>{show.venue} — {new Date(show.date).toDateString()}</p>
            
            {/* Logic: Link to the Show Detail page */}
            <a href={`/show/${show._id}`}>VIEW LINEUP & TRACKS</a>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;