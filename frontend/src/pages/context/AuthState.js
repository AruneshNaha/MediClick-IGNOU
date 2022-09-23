import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [authToken, setAuthToken] = useState("");

  const authenticate = () => {
    setAuthToken(localStorage.getItem("token"));
  };

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateCart = (productId, name, price, quantity) => {

    let totalItemPrice = price * quantity

    const arr = [...cart, {
        productId: productId,
        name: name,
        price: price,
        quantity: quantity,
        totalPrice: totalItemPrice
    }]

    setTotalPrice(totalPrice + totalItemPrice)
    setCart(arr)

  };

  const emptyCart = () => {
    setCart([])
    setTotalPrice(0)
  }

  console.log(cart)

  return (
    <AuthContext.Provider value={{ authToken, 
    authenticate, 
    cart, 
    emptyCart,
    updateCart, 
    totalPrice }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
