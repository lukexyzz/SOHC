import React from 'react';
import styles from './ShowCard.module.css';

const ShowCard = ({ show, onClick, onFlyerClick }) => {
  return (
    <div 
      className={styles.showCard}
      onClick={onClick}
    >
      {/* The Flyer: clicks here optionally trigger admin logic passed via onFlyerClick */}
      <img 
        src={show.flyer} 
        alt={show.headliner} 
        onClick={onFlyerClick}
        className={styles.cardFlyer}
      />
      
      <div className={styles.cardContent}>
        <h2 className={styles.cardHeadliner}>{show.headliner}</h2>
        <p className={styles.cardDetails}>{show.venue} — {new Date(show.date).toDateString()}</p>
        
        <div className={styles.cardAction}>VIEW LINEUP & DETAILS →</div>
      </div>
    </div>
  );
};

export default ShowCard;
