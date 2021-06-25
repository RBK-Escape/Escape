import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function CardsItem() {

    const [blogs, setBolgs] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/api/homeBologs`).then((result) => {
            setBolgs(result.data)    
     })
     .catch((err) => {console.log(err);}) 
    }, []);

    return (
        <>
        {blogs.map((card) => {
            return (
         <li className="cards__item">
         <Link className="cards__item__link" to='/blog'>
             <figure className="cards__item__pic-wrap" data-category = {card.place}>
              <img src={card.image} alt='camping' className="cards__item__img" />
             </figure>
             <div className="cards__item__info">
                 <h5 className="cards__item__text">{card.experience}</h5>
             </div>
         </Link> 
          </li>
            )
        })}
            
        </>
    )
}
