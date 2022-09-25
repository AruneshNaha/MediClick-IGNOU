import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [authToken, setAuthToken] = useState("");

  const authenticate = () => {
    setAuthToken(localStorage.getItem("token"));
  };

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateCart = (cartItem) => {

    const arr = [...cart, cartItem]

    setTotalPrice(totalPrice + cartItem.totalPrice)
    setCart(arr)
    console.log(`cart array from authstate: ${cart}`)
  };

  const removeFromCart = (productId) => {

    var filteredCart = []
    
    cart.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        filteredCart.push(cartItem)
      }
    })
    
    setCart(filteredCart)
  }

  const emptyCart = () => {
    setCart([])
    setTotalPrice(0)
  }

  console.log(cart)

  useEffect(() => {
    setCart(cart)
    setTotalPrice(totalPrice)
  }, [])
  

  return (
    <AuthContext.Provider value={{ authToken, 
    authenticate, 
    cart, 
    emptyCart,
    updateCart, 
    removeFromCart,
    totalPrice }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
