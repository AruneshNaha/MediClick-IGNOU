import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';

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

        <center>
          <h4 className="text-muted">
            {orderDetails.length === 0 ? 'No orders to view' : ''}
          </h4>
        </center>

        {orderDetails.map((order, i) => {
          return (
            <OrderCard order={order} key={order._id} index={i}></OrderCard>
          );
        })}
      </div>
    </div>
  );
}
