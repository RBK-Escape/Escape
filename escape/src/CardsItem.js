import React from 'react';
import {Link} from 'react-router-dom';

export default function CardsItem() {
    return (
        <>
           <li className="cards__item">
           <Link className="cards__item__link">
               <figure className="cards__item__pic__wrap">
                <img src='/' alt='camping' className="cards__item__text" />
               </figure>
               <div className="cards__item__info">
                   <h5 className="cards__item__text"> </h5>§
               </div>
           </Link> 
            </li> 
        </>
    )
}
