import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import React, { useEffect, useState } from 'react';
import OrderAdminCard from './adminComponents/OrderAdminCard';

export default function ManageOrdersAdmin(props) {
  const localhost = 'http://localhost:4000';
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');

  const getAllOrders = async () => {
    if (token && role === 'admin') {
      await fetch(`${localhost}/api/v1/admin/orders/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      }).then(async (response) => {
        const res = await response.json();
        await setOrderDetails(res.orders);
        await setTotalPrice(res.totalAmount);
      });
    } else {
      props.showAlert('You are not an admin');
    }
  };

  const deleteOrder = async (orderId) => {
    if (token && role === 'admin') {
      await fetch(`${localhost}/api/v1/admin/order/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      }).then(async (response) => {
        if (response.status === 200)
          props.showAlert('Order has been removed', 'success');
          getAllOrders()
      });
    } else {
      props.showAlert('You are not an admin', 'danger');
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>Manage customer orders</h1>
          <h6>
            <span className="badge bg-danger">Admin privilege</span>
          </h6>
        </center>
      </div>

      <div className="container">
        <h3 className="m-3 fw-semibold">
          <mark>
            Total Earnings: <CurrencyRupee></CurrencyRupee> {totalPrice}
          </mark>
        </h3>

        <center><h4 className='text-muted'>{orderDetails.length === 0 ? "No orders to view" : ""}</h4></center>

        {orderDetails.map((order, index) => {
          return (
            <OrderAdminCard
              key={order._id}
              order={order}
              index={index}
              deleteOrder={deleteOrder}
            ></OrderAdminCard>
          );
        })}
      </div>
    </>
  );
}
