import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from 'react-use-cart';
import StripeCheckout from 'react-stripe-checkout'

const Cart = (props) => {
  const { isEmpty, items, totalUniqueItems, cartTotal, removeItem, emptyCart } = useCart();
  const [itemId, setId] = useState('');

  useEffect(() => {
    axios.patch(`http://localhost:3001/api/removeFromCart/${itemId}`).then((result) => {
      console.log(result)

    }).catch((err) => { console.log(err); })

  }, [itemId])

  const OutCart = (val) => {

    axios.delete(`http://localhost:3001/OutCart/${val}/${props.id.id}`).then((result) => {
      console.log(result)
    }).catch((err) => { console.log(err); })

  }


  const EmptyCart = () => {
    console.log("tessssssttttt", props.id.id)
    axios.delete(`http://localhost:3001/EmptyCart/${props.id.id}`).then((result) => {
      console.log(result)
    }).catch((err) => { console.log(err); })
  }

  const handleToken = (token, adresses) => {
    console.log(token, adresses)

  }

  if (isEmpty) return (<div className="container w-100"><h1 className="container text-center w-100"> Your Cart is Empty <div className="container w-100"></div> </h1> </div>)
  return (
    <>
      <div class="px-4 px-lg-0">
        <div >
          <div class="container">
            <p class="lead py-5 text-center">Shopping Cart ({totalUniqueItems})</p>
            <div class="row">
              <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5 ">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" class="border-0 bg-light">
                          <div class="p-2 px-3 text-uppercase">Product</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                          <div class="py-2 text-uppercase">Price</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                          <div class="py-2 text-uppercase">Status</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                          <div class="py-2 text-uppercase">Remove</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => {
                        return (
                          <tr>
                            <th scope="row" class="border-0">
                              <div class="p-2">
                                <div class="ml-3 d-inline-block align-middle">
                                  <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle text-capitalize">{item.name}</a></h5><span class="text-muted font-weight-normal font-italic d-block">Category: {item.category}</span>
                                </div>
                              </div>
                            </th>
                            <td class="border-0 align-middle"><strong>{item.price} TDN</strong></td>
                            <td class="border-0 align-middle"><strong>{item.toRent ? 'Rent' : 'Buy'}</strong></td>
                            <td class="border-0 align-middle"><a class="text-dark" onClick={() => {
                              OutCart(item.id)
                              console.log(item.id)
                              removeItem(item.id); setId(item.id)
                            }}><i class="fa fa-trash"></i></a></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-between">
                  <td className="justify-content-between"></td>
                  <td>
                    <button className="btn btn-dark rounded-pill py-2 " onClick={() => {
                      console.log(EmptyCart, "hererererere")
                      EmptyCart()
                      emptyCart();
                      setId('all')
                    }}>
                      Clear Cart
                    </button>
                  </td>
                </div>

              </div>
            </div>
            <div class="row py-5 p-4 bg-white rounded shadow-sm">
              <div class="col-lg-6">
                <div class="p-4">
                  <img className="input-group mb-7 border p-7 " style={{ height: '400px' }} src="https://images2.minutemediacdn.com/image/upload/c_crop,h_674,w_1200,x_0,y_113/f_auto,q_auto,w_1100/v1554999553/shape/mentalfloss/504605-publicdomain.gif" alt="faza" />
                </div>
                <div class="p-4">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                <div class="p-4">
                  <p class="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered. </p>
                  <p class="font-italic mb-4">Nb: Shipping is a fixed amount.</p>
                  <ul class="list-unstyled mb-4">
                    <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>{cartTotal} TDN</strong></li>
                    <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and handling</strong><strong>10.00 TDN </strong></li>
                    <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                      <h5 class="font-weight-bold">{cartTotal + 10} TDN</h5>
                    </li>
                  </ul>
                  <StripeCheckout
                    stripeKey="pk_test_51J6yJkJjdVstAFqKmzQNeXqk5UM5xzXCRIpaUy2l1Eau3sch3N3eRWQtTrvQi1EmFDiQdk3ZM64uHzng3ayk6o9o00GlJACko9"
                    token={handleToken}
                    shippingAdress
                    amount={(cartTotal+10)*100}
                  > <div class="btn  btn-dark rounded-pill px-4 py-3 w-100"> Procceed to checkout</div> </StripeCheckout>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>



    </>
  )
}

export default Cart;

