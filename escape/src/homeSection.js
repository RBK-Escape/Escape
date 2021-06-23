import React from 'react';
import './homeSection.css';
import {Link} from 'react-router-dom';
const HomeSection = () => {
 return (
     <div className="hero-container">
         <video src='/video/video-1.mp4' autoPlay loop muted />
        <h1>ADVENTURE AWAITS</h1>
        <p>What are you waiting for?</p>
        <div className="hero-btns">
            <Link to ="/store"><button className="btn-home">
                GO TO SHOP
            </button>
            </Link>
        </div>
     </div>
 )
}

export default HomeSection;