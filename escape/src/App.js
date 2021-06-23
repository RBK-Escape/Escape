import React, {useState} from 'react';
// import './App.css';
import Store from './store.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AboutUs from './aboutUs.js';
import Navbar from './NavBar.js';
import Home from './home.js'
import Post from './Post.js';
import Admin from './Admin.js';
import Account from './Account.js';
import Cart from './cart.js';
import {CartProvider} from 'react-use-cart';


function App() {
//  const [addToCart, setCart] = useState([])


  return (
    <Router>
      <Navbar />
      <CartProvider>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/store" component={Store} />
      <Route path="/Post" component={Post} />
      <Route path="/Admin" component={Admin} />
      <Route path="/SigIn" component={Account} />
      <Route path="/cart" component={Cart} />
      <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;





