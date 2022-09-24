import React, { useState, useContext } from 'react';
import AuthContext from '../pages/context/AuthContext';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
                setQuantity(e);
                const cartItem = {
                  productId: props.product._id,
                  name: props.product.name,
                  price: props.product.price,
                  quantity: e,
                  totalPrice: e * props.product.price,
                };

                updateCart(cartItem);
                setProductAdded(1);
                props.showAlert('Product added to cart', 'success');
                if (productAdded) {
                  //TODO: update cart item quantity
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
