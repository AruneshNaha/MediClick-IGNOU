import React, { useState, useContext } from 'react';
import AuthContext from '../pages/context/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function ProductCard(props) {
  const context = useContext(AuthContext);
  const { cart, updateCart, totalPrice, emptyCart, removeFromCart } = context;

  const quantityArray = [1, 2, 3];
  const [quantity, setQuantity] = useState(0);
  const [productAdded, setProductAdded] = useState(0);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card">
        <img
          src={require(`../backend/uploads/${props.product._id}.jpg`)}
          alt="Product not found!"
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{props.product.name}</h5>
          <h6>
            <i>{props.product.category}</i>
          </h6>
          <p className="card-text">{props.product.description}</p>
          <div className="d-flex justify-content-between">
            <span className="badge bg-info">
              <h5>Rs. {props.product.price}</h5>
            </span>

            <DropdownButton
              id="dropdown-basic-button"
              title={productAdded ? `Added ${quantity} to cart` : 'Add to cart'}
              onSelect={(e) => {
                if (!productAdded) {
                  setQuantity(e);
                  const cartItem = {
                    productId: props.product._id,
                    name: props.product.name,
                    price: props.product.price,
                    quantity: e,
                    totalPrice: e * props.product.price,
                  };
                  

                  updateCart(cartItem);

                  props.createCartArray(cart)
                  setProductAdded(1);
                  props.showAlert('Product added to cart', 'success');
                } else {
                  cart.forEach((cartItem) => {
                    if (cartItem.productId === props.product._id) {
                      cartItem.quantity = e;
                      cartItem.totalPrice = e * props.product.price
                    }
                    props.createCartArray(cart)
                  });
                }
              }}
            >
              {quantityArray.map((quantity) => {
                return (
                  <Dropdown.Item
                    eventKey={quantity}
                    key={quantity}
                    value={quantity}
                  >
                    {quantity}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            {productAdded ? (
              <button
                className="btn btn-danger"
                onClick={() => {
                  removeFromCart(props.product._id);
                  setProductAdded(0);
                  props.showAlert('Product removed from cart', 'danger');
                  props.createCartArray(cart)
                }}
              >
                Remove
              </button>
            ) : (
              ``
            )}
          </div>
        </div>
      </div>
    </div>
  );
}