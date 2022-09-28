import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import React, { useEffect, useState } from 'react';

export default function ManageOrders() {
  const [res, setRes] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);

  const getAllOrders = async () => {
    const host = 'http://localhost:4000';
    try {
      const response = await fetch(`${host}/api/v1/orders/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      });

      const res = await response.json();

      if (response.status === 200) {
        await setRes(res);
        await setOrderDetails(res.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(res.orders);

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h1>
          <mark>Your orders:</mark>
        </h1>

        {orderDetails.map((order) => {
          return (
            <div className="card p-3">
              <div className="card-text">
                <p key={order._id} className="card-text">
                  <h3>Order ID: {order._id}</h3>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Your Shipping Information
                  </h6>
                  Address: {order.shippingInfo.address}{' '}
                  {order.shippingInfo.city} {order.shippingInfo.pinCode}{' '}
                  {order.shippingInfo.state} <br />
                  Phone No. {order.phoneNo}
                </p>
                <h6 className="card-subtitle mb-2 text-muted">
                  Your order Information
                </h6>
                <p className="card-text">
                  <ul className="list-group list-group-flush">
                    {order.orderItems.map((orderItem) => {
                      return (
                        <li
                          key={orderItem.productId}
                          className="list-group-item"
                        >
                          {orderItem.name} * {orderItem.quantity} <br /> Price:{' '}
                          <CurrencyRupee></CurrencyRupee> {orderItem.price}{' '}
                          <br /> Total Price: <CurrencyRupee></CurrencyRupee>
                          {orderItem.totalPrice}
                        </li>
                      );
                    })}
                  </ul>
                </p>
                <h6 className="card-subtitle mb-2 text-muted">
                  Total Order Value: <CurrencyRupee></CurrencyRupee>
                  {order.totalPrice}
                </h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
