// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import { useCart } from 'react-use-cart';

// const Cart = (props) => {
//     console.log(props)
//     const {
//         isEmpty,
//         totalUniqueItems,
//         items,
//         updateItemQuantity,
//         removeItem,
//         emptyCart,
//     } = useCart()
//     if(isEmpty) return <h1 className="text-center"> Your Cart is Empty</h1>
//     return (
//         <>
//       <section className="py-4 container">
//           <div className="row justify-content-center">
//               <div className="col-12">
//                 <h5>Cart ({totalUniqueItems})</h5>
//                 <table className="table table-light table-hover m-0">
//                 {
//                     items.map((item, index) => {
//                         <tr key={index}>
//                             <td>
//                             <img src={item.img} />
//                             </td>

//                         </tr>
//                     })
//                 }

//                 </table>

//               </div>
//           </div>
//       </section>

      
//         </>
//     )
// }

// export default Cart;