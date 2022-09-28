import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Order() {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="card">
      <div className="card-body">
        <h1><mark>Congrats! Your order has been placed.</mark></h1>
        <h5 className="card-title">Your current order</h5>
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
              return <li key={orderItem.productId} className="list-group-item">
                {orderItem.name} * {orderItem.quantity} <br /> Price:{' '}
                <CurrencyRupee></CurrencyRupee> {orderItem.price} <br /> Total Price:
                {' '}
                <CurrencyRupee></CurrencyRupee>{orderItem.totalPrice}
              </li>;
            })}
          </ul>
        </p>
        <h6 className="card-subtitle mb-2 text-muted">
          Total Order Value: <CurrencyRupee></CurrencyRupee>{location.state.order.totalPrice}
        </h6>
      </div>
    </div>
  );
}
