import React, { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AuthContext from '../pages/context/AuthContext';

export default function CartItem(props) {
  const quantityArray = [1, 2, 3];
  const context = useContext(AuthContext);
  const { cart, updateCart, removeFromCart } = context;

  return (
    <div className="card text-left">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a className="nav-link disabled" href="/">
              {props.cartItem.name}
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body d-flex justify-content-between">
        <h5 className="card-title">{`Rs. ${props.cartItem.price}`}</h5>
        <p className="card-text">{`Total Price ${props.cartItem.totalPrice}`}</p>
        <a href="/" className="btn btn-primary">
          {/* {`Quantity: ${props.cartItem.quantity}`} */}
          <DropdownButton
            id="dropdown-basic-button"
            title={`Quantity: ${props.cartItem.quantity}`}
            onSelect={(e) => {
              cart.forEach((cartItem) => {
                if (cartItem.productId === props.cartItem.productId) {
                  cartItem.quantity = e;
                  cartItem.totalPrice = e * props.cartItem.price;
                }
              });
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

          <button
            className="btn btn-danger"
            onClick={() => {
              removeFromCart(props.cartItem.productId);
            }}
          >
            Remove
          </button>
        </a>
      </div>
    </div>
  );
}
