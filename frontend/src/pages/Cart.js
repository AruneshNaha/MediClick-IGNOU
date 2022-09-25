import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CartItem from '../components/CartItem';
import AuthContext from './context/AuthContext';

export default function Cart(props) {
  // const location = useLocation();
  // console.log(location.state)

  const context = useContext(AuthContext);
  const { cart } = context;

  console.log(cart);

  return (
    <>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>Your Cart Items</h1>
        </center>
      </div>
      {cart.length === 0 ? (
        <h3>
          <center>Your cart is empty</center>
        </h3>
      ) : (
        cart.map((cartItem) => {
          return <CartItem key={cartItem.productId} cartItem={cartItem}></CartItem>;
        })
      )}
    </>
  );
}
