import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom';


const Footer = () => {
    return (
        <div className="main-footer">
          <div className="container">
            <div className="row">
              {/* Column1 */}
              <div className="col">
                <h4>Contact Us</h4>
                <div className="list-unstyled">
                  <li>+216-22 22 22 22</li>
                  <li>Tunis Ghazella</li>
                  <li>123 Tunis North Sreet</li>
                </div>
              </div>
              {/* Column2 */}
              <div className="col">
                <h4>Home</h4>
                <ui className="list-unstyled">
                  <Link to="/store" style={{ textDecoration: 'none', color: 'white' }} > <li>Store</li></Link>
                  <Link to="/account" style={{ textDecoration: 'none', color: 'white' }} ><li>Account</li></Link>
                  <Link to="/about" style={{ textDecoration: 'none', color: 'white' }} ><li>About Us</li></Link>

                </ui>
              </div>
              {/* Column3 */}
              <div className="col">
                <h4>Social Media</h4>
                <ui className="list-unstyled">
                  <li>Facebook</li>
                  <li>Instagram</li>
                  
                </ui>
              </div>
            </div>
            <hr />
            <div className="row">
              <p className="col-sm">
                &copy;{new Date().getFullYear()} Escape | All rights reserved |
                Human Right | Privacy
              </p>
            </div>
          </div>
        </div>
      );
    }



export default Footer;