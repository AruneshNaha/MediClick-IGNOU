import React, { useContext, useEffect, useState } from 'react';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ProductPage(props) {
  const location = useLocation();
  console.log(location.state);

  const quantityArray = [1, 2, 3];
  const [quantity, setQuantity] = useState(0);
  const [productAdded, setProductAdded] = useState(0);
  const navigate = useNavigate();

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
    <>
    <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>Product Information</h1>
        </center>
      </div>
      <div className="d-flex justify-content-evenly">
        <img
          src={require(`../backend/uploads/${location.state._id}.jpg`)}
          alt=""
          width={'400px'}
        />
        <div className="card p-3" width={'100%'}>
          <h1>{location.state.name}</h1>
          <div className="card-subtitle mb-2 text-muted">
            <h3>
              Price: <CurrencyRupee></CurrencyRupee> {location.state.price}
            </h3>
          </div>
          <br />
          <h6>Category</h6>
          <p>{location.state.category === null ? "No category classified" : location.state.category.name}</p>
          <h6>Description</h6>
          <p>{location.state.description}</p>
          <h6>Stock: {location.state.stock}</h6>
          <div className="d-flex flex-column mb-3">
            <div className="d-flex justify-content-between">
              <DropdownButton
                id="dropdown-basic-button"
                className="m-1"
                title={
                  productAdded ? `Added ${quantity} to cart` : `Add to cart`
                }
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
                  className="btn btn-danger m-1"
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
            <div className="d-flex justify-content-between">
              <div className="d-grip gap-2 m-1">
                <button
                  className="btn btn-info"
                  type="button"
                  onClick={() => {
                    navigate('/cart');
                  }}
                >
                  Go to cart <ShoppingCartIcon></ShoppingCartIcon>{' '}
                </button>
              </div>
              <button
                className="btn btn-warning m-1"
                type="button"
                onClick={() => {
                  navigate('/products');
                }}
              >
                Add more products
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
