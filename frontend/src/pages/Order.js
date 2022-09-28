import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);
  return (
    <div className="card">
      <div className="card-body">
        <h1>
          <mark>Congrats! Your order has been placed.</mark>
        </h1>
        <div className="card-title d-grid gap-2">
          <button
            className="btn btn-warning"
            onClick={() => {
              navigate('/manageorders');
            }}
          >
            Click here to manage other orders
          </button>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">
          Your Shipping Information
        </h6>
        <p className="card-text">
          Address: {location.state.order.shippingInfo.address} <br />
          City: {location.state.order.shippingInfo.city} <br />
          Pin Code: {location.state.order.shippingInfo.pinCode} <br />
          State: {location.state.order.shippingInfo.state} <br />
          Phone No.: {location.state.order.shippingInfo.phoneNo} <br />
        </p>
        <h6 className="card-subtitle mb-2 text-muted">
          Your order Information
        </h6>
        <p className="card-text">
          <ul className="list-group list-group-flush">
            {location.state.order.orderItems.map((orderItem) => {
              return (
                <li key={orderItem.productId} className="list-group-item">
                  {orderItem.name} * {orderItem.quantity} <br /> Price:{' '}
                  <CurrencyRupee></CurrencyRupee> {orderItem.price} <br /> Total
                  Price: <CurrencyRupee></CurrencyRupee>
                  {orderItem.totalPrice}
                </li>
              );
            })}
          </ul>
        </p>
        <h6 className="card-subtitle mb-2 text-muted">
          Total Order Value: <CurrencyRupee></CurrencyRupee>
          {location.state.order.totalPrice}
        </h6>
      </div>
    </div>
  );
}
