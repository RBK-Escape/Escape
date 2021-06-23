import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useCart } from 'react-use-cart';

const Cart = () => {
const { isEmpty, items, totalUniqueItems, cartTotal, removeItem, emptyCart} = useCart();
const [itemId, setId] = useState('');

useEffect (() => {
  axios.patch(`http://localhost:3001/api/removeFromCart/${itemId}`).then((result) => {
      console.log(result)
      
}).catch((err) => {console.log(err);})

}, [itemId])

    if (isEmpty) return <h1 className="text-center"> Your Cart is Empty </h1>
    return (
        <>
<section className="py-4 container">
          <div className="row justify-content-center">
              <div className="col-12">
                <h5> Cart ({totalUniqueItems})</h5>
                <table className="table table-light">
                {items.map((item) => {
                  return (
                  <tr key ={item.id}>
                    <td>
                      <img src={item.image} style={{height: '6rem'}} alt="item"/>
                    </td>
                    <td> {item.name} </td>
                    <td>{item.price} TDN</td>
                    <td>Status ({item.toRent ? 'To be rented' : 'To be sold'})</td>
                    <td>
                      <button className="btn btn-danger ms-2" onClick={() => {removeItem(item.id); setId(item.id) }}>Remove Item</button>
                    </td>
                  </tr>)
                })}
                </table>
              </div>
              <div className="col-auto ms-auto"> 
                <h2>Total Price : {cartTotal} TDN</h2>
              </div>
              <div className="col-auto">
                <button className="btn btn-danger m-2" onClick={()=>{ emptyCart(); setId('all') }}>
                  Clear Cart
                </button>
                <button className="btn btn-primary m-2">Payment</button>
              </div>
          </div>
      </section>



     
        </>
    )
}

export default Cart;




//       <section className="py-4 container">
//   <div class="row">
//     <div class="col-lg-8">
//       <div class="card wish-list mb-3">
//         <div class="card-body">
//           <h5 class="mb-4"> Cart ({totalUniqueItems})</h5>
//           <div class="row mb-4">
//             {
//               items.map ((item) => {
//                 return (
//                   <>
//               <div class="col-md-5 col-lg-3 col-xl-3">
//               <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
//                 <img class="img-fluid w-100"
//                   src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample" />
//                   <div class="mask waves-effect waves-light">
//                     <img class="img-fluid w-100"
//                       src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg">
//                     <div class="mask rgba-black-slight waves-effect waves-light"></div>
//                   </div>
//               </div>
//             </div>
//                   </>
//                 )

//               })

//             }
           
//             <div class="col-md-7 col-lg-9 col-xl-9">
//               <div>
//                 <div class="d-flex justify-content-between">
//                   <div>
//                     <h5>Blue denim shirt</h5>
//                     <p class="mb-3 text-muted text-uppercase small">Shirt - blue</p>
//                     <p class="mb-2 text-muted text-uppercase small">Color: blue</p>
//                     <p class="mb-3 text-muted text-uppercase small">Size: M</p>
//                   </div>
//                   <div>
//                     <div class="def-number-input number-input safari_only mb-0 w-100">
//                       <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
//                         class="minus"></button>
//                       <input class="quantity" min="0" name="quantity" value="1" type="number">
//                       <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
//                         class="plus"></button>
//                     </div>
//                     <small id="passwordHelpBlock" class="form-text text-muted text-center">
//                       (Note, 1 piece)
//                     </small>
//                   </div>
//                 </div>
//                 <div class="d-flex justify-content-between align-items-center">
//                   <div>
//                     <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3"><i
//                         class="fas fa-trash-alt mr-1"></i> Remove item </a>
//                     <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
//                         class="fas fa-heart mr-1"></i> Move to wish list </a>
//                   </div>
//                   <p class="mb-0"><span><strong>$17.99</strong></span></p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <hr class="mb-4">
//           <div class="row mb-4">
//             <div class="col-md-5 col-lg-3 col-xl-3">
//               <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
//                 <img class="img-fluid w-100"
//                   src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg" alt="Sample">
//                 <a href="#!">
//                   <div class="mask waves-effect waves-light">
//                     <img class="img-fluid w-100"
//                       src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg">
//                     <div class="mask rgba-black-slight waves-effect waves-light"></div>
//                   </div>
//                 </a>
//               </div>
//             </div>
//             <div class="col-md-7 col-lg-9 col-xl-9">
//               <div>
//                 <div class="d-flex justify-content-between">
//                   <div>
//                     <h5>Red hoodie</h5>
//                     <p class="mb-3 text-muted text-uppercase small">Shirt - red</p>
//                     <p class="mb-2 text-muted text-uppercase small">Color: red</p>
//                     <p class="mb-3 text-muted text-uppercase small">Size: M</p>
//                   </div>
//                   <div>
//                     <div class="def-number-input number-input safari_only mb-0 w-100">
//                       <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
//                         class="minus"></button>
//                       <input class="quantity" min="0" name="quantity" value="1" type="number">
//                       <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
//                         class="plus"></button>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="d-flex justify-content-between align-items-center">
//                   <div>
//                     <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3"><i
//                         class="fas fa-trash-alt mr-1"></i> Remove item </a>
//                     <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
//                         class="fas fa-heart mr-1"></i> Move to wish list </a>
//                   </div>
//                   <p class="mb-0"><span><strong>$35.99</strong></span></p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <p class="text-primary mb-0"><i class="fas fa-info-circle mr-1"></i> Do not delay the purchase, adding
//             items to your cart does not mean booking them.</p>

//         </div>
//       </div>
     
//       <div class="card mb-3">
//         <div class="card-body">

//           <h5 class="mb-4">Expected shipping delivery</h5>

//           <p class="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
//         </div>
//       </div>
     
//       <div class="card mb-3">
//         <div class="card-body">

//           <h5 class="mb-4">We accept</h5>

//           <img class="mr-2" width="45px"
//             src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
//             alt="Visa">
//           <img class="mr-2" width="45px"
//             src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
//             alt="American Express">
//           <img class="mr-2" width="45px"
//             src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
//             alt="Mastercard">
//           <img class="mr-2" width="45px"
//             src="https://z9t4u9f6.stackpathcdn.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
//             alt="PayPal acceptance mark">
//         </div>
//       </div>

//     </div>
  
//     <div class="col-lg-4">

//       <div class="card mb-3">
//         <div class="card-body">

//           <h5 class="mb-3">The total amount of</h5>

//           <ul class="list-group list-group-flush">
//             <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//               Temporary amount
//               <span>$25.98</span>
//             </li>
//             <li class="list-group-item d-flex justify-content-between align-items-center px-0">
//               Shipping
//               <span>Gratis</span>
//             </li>
//             <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//               <div>
//                 <strong>The total amount of</strong>
//                 <strong>
//                   <p class="mb-0">(including VAT)</p>
//                 </strong>
//               </div>
//               <span><strong>$53.98</strong></span>
//             </li>
//           </ul>

//           <button type="button" class="btn btn-primary btn-block waves-effect waves-light">go to checkout</button>

//         </div>
//       </div>
      
//       <div class="card mb-3">
//         <div class="card-body">

//           <a class="dark-grey-text d-flex justify-content-between" data-toggle="collapse" href="#collapseExample1"
//             aria-expanded="false" aria-controls="collapseExample1">
//             Add a discount code (optional)
//             <span><i class="fas fa-chevron-down pt-1"></i></span>
//           </a>

//           <div class="collapse" id="collapseExample1">
//             <div class="mt-3">
//               <div class="md-form md-outline mb-0">
//                 <input type="text" id="discount-code1" class="form-control font-weight-light"
//                   placeholder="Enter discount code">
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
    

//   </div>
  

// </section>