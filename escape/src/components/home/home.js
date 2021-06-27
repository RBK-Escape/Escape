import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// eslint-disable-next-line
import { NavLink, Link } from "react-router-dom";
import HomeSection from './homeSection.js';
import Cards from '../cards/cards.js'

const Home = ()  => {
    // eslint-disable-next-line
    const [resourceType, setresourceType] = useState('homeProducts');
    // eslint-disable-next-line
     const [products, setProducts] = useState([]);
     useEffect(() => {
         axios.get(`http://localhost:3001/api/${resourceType}`).then((result) =>{
           setProducts(result.data)
         }).catch((err)=> {
             console.log(err);
         })
     }, [resourceType])
    return (
        <div>
           {/* <div>
               {products.map((product) => {
                   return (
                       <div>
                         <img src={product.image} alt='product'/>
                         <p>{product.name}</p>
                       </div>
                   )
               })}
           </div>
           <button>
           <Link to="/blog">Blogs</Link>
           </button> */}
            <HomeSection />
            <Cards />
        </div>
    )
}

export default Home;
