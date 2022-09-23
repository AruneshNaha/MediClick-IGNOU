import React, { useState, useContext } from 'react';
import AuthContext from '../pages/context/AuthContext';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function ProductCard(props) {
  const context = useContext(AuthContext);
  const { cart, updateCart, totalPrice, emptyCart } = context;


  const quantityArray = [1, 2, 3];
  const [quantity, setQuantity] = useState(0);

  const updateQuantity = (quantity = 1) => {
    setQuantity(quantity);
    console.log(`Quantity: ${quantity}`);
  };

  const addToCart = (quantity) => {
    updateCart(props.product._id, props.product.name, props.product.price, quantity)
  };

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
              title={'Add to cart'}
              onSelect={(e) => {
                updateQuantity(e)
                addToCart(quantity)
              }}
            >
              {quantityArray.map((quantity) => {
                return (
                  <Dropdown.Item eventKey={quantity} key={quantity} value={quantity}>
                    {quantity}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            {/* <Dropdown as={ButtonGroup}>
              <Button variant="success" >{cart.length === 0 ? 'Add to cart' : `Remove from cart`}</Button>

              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
                onSelect={(e) => {
                  console.log(e)
                }}
              />

              <Dropdown.Menu>
                {
                  quantityArray.map((quantity) => {
                    return <Dropdown.Item key={quantity} value={quantity}>{quantity}</Dropdown.Item>
                  })
                }
                
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
        </div>
      </div>
    </div>
  );
}
