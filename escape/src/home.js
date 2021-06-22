import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

 const Home = ()  => {
    const [resourceType, setresourceType] = useState('homeProducts');
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
           <div>
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
           </button>
        </div>
    )
}

export default Home;