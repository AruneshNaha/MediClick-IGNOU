import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import AuthContext from './context/AuthContext';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export default function Cart(props) {

  const context = useContext(AuthContext);
  const { cart, totalPrice } = context;

  const navigate = useNavigate();

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
        ``
      ) : (
        <div
          className="position-relative"
          style={{ margin: '30px 0px', marginTop: '30px' }}
        >
          <center>
            <button
              className="btn btn-warning"
              onClick={() => {
                let finalPrice = 0;

                cart.forEach((cartItem) => {
                  finalPrice += cartItem.totalPrice;
                });

                navigate('/checkout', { state: finalPrice });
              }}
            >
              {`Proceed to checkout`}
              <ShoppingCartCheckoutIcon></ShoppingCartCheckoutIcon>
            </button>
          </center>
        </div>
      )}

      {cart.length === 0 ? (
        <h3>
          <center>Your cart is empty</center>
        </h3>
      ) : (
        cart.map((cartItem) => {
          return (
            <CartItem key={cartItem.productId} cartItem={cartItem} showAlert={props.showAlert}></CartItem>
          );
        })
      )}
    </>
  );
}
