import React, { useContext, useEffect, useState } from 'react';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export default function ProductPage(props) {
  const location = useLocation();
  console.log(location.state);

  const quantityArray = [1, 2, 3];
  const [quantity, setQuantity] = useState(0);
  const [productAdded, setProductAdded] = useState(0);

  const checkIfProductAdded = (cart) => {
    cart.forEach((cartItem, index) => {
      if (cartItem.productId === location.state._id) {
        setProductAdded(1);
        setQuantity(cartItem.quantity);
      }
    });
  };

  useEffect(() => {
    checkIfProductAdded(cart);
  }, []);

  const context = useContext(AuthContext);
  const {
    cart,
    updateCart,
    updateTotalPrice,
    totalPrice,
    emptyCart,
    removeFromCart,
  } = context;

  return (
    <div className="d-flex justify-content-evenly">
      <img
        src={require(`../backend/uploads/${location.state._id}.jpg`)}
        alt=""
        width={'400px'}
      />
      <div className="card p-3">
        <h1>{location.state.name}</h1>
        <div className="card-subtitle mb-2 text-muted">
          <h3>
            Price: <CurrencyRupee></CurrencyRupee> {location.state.price}
          </h3>
        </div>
        <br />
        <h6>Category</h6>
        <p>{location.state.category}</p>
        <h6>Description</h6>
        <p>{location.state.description}</p>
        <h6>Stock: {location.state.stock}</h6>
        <div className="d-flex justify-content-between">
          <DropdownButton
            id="dropdown-basic-button"
            title={productAdded ? `Added ${quantity} to cart` : `Add to cart`}
            onSelect={(e) => {
              if (!productAdded) {
                setQuantity(e);
                const cartItem = {
                  productId: location.state._id,
                  name: location.state.name,
                  price: location.state.price,
                  quantity: e,
                  totalPrice: e * location.state.price,
                };

                updateCart(cartItem);
                updateTotalPrice(cart);

                setProductAdded(1);
                props.showAlert('Product added to cart', 'success');
              } else {
                cart.forEach((cartItem) => {
                  if (cartItem.productId === location.state._id) {
                    cartItem.quantity = e;
                    cartItem.totalPrice = e * location.state.price;
                  }
                });

                setQuantity(e);
                updateTotalPrice(cart);
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
                removeFromCart(location.state._id);
                setProductAdded(0);
                props.showAlert('Product removed from cart', 'danger');
              }}
            >
              Remove
              <RemoveShoppingCartIcon></RemoveShoppingCartIcon>
            </button>
          ) : (
            ``
          )}
        </div>
      </div>
    </div>
  );
}
