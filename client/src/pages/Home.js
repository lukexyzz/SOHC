import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUpcomingShows, deleteShow } from '../api';
import ShowCard from '../components/ShowCard';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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


  const handleCardClick = (id) => {
    navigate(`/show/${id}`);
  };

  const handleSecretDelete = async (e, id) => {
    e.stopPropagation(); // prevent opening the card

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
    <div className="shows-grid">
      {shows.length === 0 ? (
        <p>NO UPCOMING SHOWS. CHECK BACK SOON.</p>
      ) : (
        shows.map(show => (
          <ShowCard
            key={show._id}
            show={show}
            onClick={() => handleCardClick(show._id)}
            onFlyerClick={(e) => handleSecretDelete(e, show._id)}
          />
        ))
      )}
    </div>
  );
};

export default Home;