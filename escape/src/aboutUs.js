import React from 'react';
import image6 from './photos/image6.jpg';
import './App.css'
import {Link} from 'react-router-dom';
import './about.css';
const AboutUs = () => {

return (
<div className="section">
    <div className="container">
        <div className="content-section">
            <div className="title">
                <h1>About Us</h1>
            </div>
            <div className="content" >
                <h3>Who are we </h3>
                <p>Escape. The first Tunisian platforme that permit the user to sell and rent camping equipments. We are glad to give you the opportunity to escape and breath the air of new places! </p>
                <p>It was founded in 2021 by RBK's students, they wanted to escape but were trapped ... So please be free instead of them. </p>
                <Link to='/store' style={{ textDecoration: 'none' }}>
                <div className="button">
                   <span>Go Purchase</span>
                </div>
                </Link> 
                <div className="social">
                    <a> <i className="fab fa-facebook-f" ></i></a>
                    <a><i className="fab fa-instagram"></i></a>
                </div>
            </div>
            
        </div>
        <div className="image-section">
                <img src={image6} alt="image6"/>
            </div>
    </div>

</div>
)
}

export default AboutUs;