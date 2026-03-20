import React from 'react';
import styles from './BackgroundVideo.module.css';

const BackgroundVideo = () => {
  return (
    <video autoPlay loop muted playsInline className={styles.bgVideo}>
      <source 
        src="https://res.cloudinary.com/dxh6odohl/video/upload/v1774035744/AQN34mRnqXtVaxLaaKkHbDaQp7jiVZbZJv8oVqpOWxSM6Y1YNiDeUoUUTu_Ip3aiYG5yV2d7pKWgZ0z5TSNRiIqeoxc6_hREEzwcpNI_gna5pf.mp4" 
        type="video/mp4" 
      />
    </video>
  );
};

export default BackgroundVideo;
