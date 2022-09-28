import React, { useContext } from 'react';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import { useLocation } from 'react-router-dom';
import AuthContext from './context/AuthContext';

export default function ProductPage(props) {
  const location = useLocation();
  console.log(location.state);

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
      </div>
    </div>
  );
}
