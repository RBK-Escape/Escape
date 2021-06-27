import React, { useState } from 'react';
// import './App.css';
import Store from './components/store/store.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/home/Footer.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AboutUs from './components/aboutUs/aboutUs.js';
import Navbar from './components/home/NavBar.js';
import Home from './components/home/home.js'
import Post from './components/userAccunt/Post.js';
import Admin from './components/admin/Admin.js';
import Account from './components/sigin/Account.js';
import Blogs from "./components/blogs/Blogs.js";
import PostBlog from "./components/blogs/PostBlog.js"
import AdminBlog from './components/admin/AdminBlog.js';
import Cart from './components/store/cart.js';
import UserAccount from './components/userAccunt/UserAccount.js';
import { CartProvider } from 'react-use-cart';
import OneBlog from "./components/blogs/OneBlog.js";
import ViewPost from './components/userAccunt/viewPost.js';

function App() {
  const [blog, setBlog] = useState({});
  //  const [addToCart, setCart] = useState([])

  console.log(blog)

  const [id, setId] = useState({ id: '', auth: false, type: null});
  console.log("app.js", id)

  return (
    <Router>
      <Navbar />

      <CartProvider id={id} setId={setId}>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={AboutUs} />
        <Route path="/store" component={() => <Store id={id} />} />
        <Route path="/Post" component={() => { return <Post id={id} /> }} />
        <Route path="/Admin" component={Admin} />
        <Route path='/postBlog' component={() => { return <PostBlog id={id} /> }} />
        <Route path="/AdminBlog" exact component={AdminBlog} />
        <Route path="/SigIn" component={() => <Account id={id} setId={setId} />} />
        <Route path="/cart" component={() => { return <Cart id={id} /> }} />
        <Route path="/UserAccount" component={() => <UserAccount id={id} />} />
        <Route path="/blog" component={() => <Blogs blog={blog} setBlog={setBlog} />} />
        <Route path="/oneblog" component={() => <OneBlog blog={blog} />} />
        <Route path="/viewPost" component={() => <ViewPost id={id} />} />
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
