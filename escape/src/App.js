import React, { useState } from 'react';
// import './App.css';
import Store from './store.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AboutUs from './aboutUs.js';
import Navbar from './NavBar.js';
import Home from './home.js'
import Post from './Post.js';
import Admin from './Admin.js';
import Account from './Account.js';
import Blogs from "./Blogs.js";
import PostBlog from "./PostBlog.js"
import AdminBlog from './AdminBlog.js';
import Cart from './cart.js';
import UserAccount from './UserAccount.js';
import { CartProvider } from 'react-use-cart';


function App() {
  //  const [addToCart, setCart] = useState([])

  const [id, setId] = useState({id: '', auth: false});
  console.log("app.js", id)

  return (
    <Router>
      <Navbar />

      <CartProvider id={id} setId={setId}>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={AboutUs} />
        <Route path="/store" component={() => <Store id={id} />} />
        <Route path="/Post" component={()=> <Post id={id}/>} />
        <Route path="/Admin" component={Admin} />
        <Route path="/blog" component={Blogs} />
        <Route path='/postBlog' component={()=> { return <PostBlog id ={id} />}} />
        <Route path="/AdminBlog" exact component={AdminBlog} />
        <Route path="/SigIn" component={() => <Account id={id} setId={setId} />} />
        <Route path="/cart" component={Cart} />
        <Route path="/UserAccount" component={()=> <UserAccount id= {id}/>} />
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;





