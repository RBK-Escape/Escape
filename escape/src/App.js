import './App.css';
import Store from './store.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AboutUs from './aboutUs.js';
import Navbar from './NavBar.js';
import Home from './home.js'
import React from 'react';
import Post from './Post.js';
import Admin from './Admin.js';
import Account from './Account.js';




function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/store" component={Store} />
      <Route path="/Post" component={Post} />
      <Route path="/Admin" component={Admin} />
      <Route path="/account" component={Account} />
      <Footer />
    </Router>
  );
}

export default App;





