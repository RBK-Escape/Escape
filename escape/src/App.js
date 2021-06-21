import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Post from './Post.js';



function App() {
  return (
    <Router>
      <Route path="/Post" component={Post} />
    </Router>
  );
}

export default App;





