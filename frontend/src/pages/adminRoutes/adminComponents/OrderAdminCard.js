import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import React, { useEffect, useState } from 'react';

export default function OrderAdminCard(props) {
  const localhost = 'http://localhost:4000';
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [user, setUser] = useState({});
  const [orderStatus, setOrderStatus] = useState(props.order.orderStatus);

  const getUserInfo = async (userId) => {
    if (token && role === 'admin') {
      await fetch(`${localhost}/api/v1/getUserById/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      }).then(async (response) => {
        const res = await response.json();
        await setUser(res.users);
      });
    } else {
      props.showAlert('You are not an admin');
    }
  };

  const updateOrderStatus = async (orderId) => {
    if (token && role === 'admin') {
      await fetch(`${localhost}/api/v1/admin/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          status: 'Delivered',
        }),
      }).then(async (response) => {
        response.status === 200
          ? setOrderStatus('Delivered')
          : props.showAlert('Failed to update order status', 'danger');
      });
    } else {
      props.showAlert('You are not an admin', 'danger');
    }
  };

  useEffect(() => {
    getUserInfo(props.order.user);
  }, []);

  return (
    <div className="card p-3 m-5">
      <div className="d-flex justify-content-between">
        <h4 className="fw-light">Order {props.index + 1}</h4>
        <h4 className="fw-light">Order ID: {props.order._id}</h4>
      </div>

      <div className="d-flex justify-content-between">
        <h4 className="fw-semibold">User Info</h4>
        <h4>
          Status:{' '}
          <span
            className={
              orderStatus === 'Processing'
                ? `badge bg-warning`
                : `badge bg-success`
            }
          >
            {orderStatus}
          </span>
        </h4>
      </div>
      <p>
        ID: {user._id} <br />
        Name: {user.name} <br />
        Email: {user.email}
      </p>

      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Shipping Information
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <h6 className="card-subtitle mb-2 text-muted">
                Shipping Information
              </h6>
              Address: {props.order.shippingInfo.address}{' '}
              {props.order.shippingInfo.city} {props.order.shippingInfo.pinCode}{' '}
              {props.order.shippingInfo.state} <br />
              Phone No. {props.order.phoneNo}
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Order Information
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <ul className="list-group list-group-flush">
                {props.order.orderItems.map((orderItem) => {
                  return (
                    <li key={orderItem.productId} className="list-group-item">
                      {orderItem.name} * {orderItem.quantity} <br /> Price:{' '}
                      <CurrencyRupee></CurrencyRupee> {orderItem.price} <br />{' '}
                      Total Price: <CurrencyRupee></CurrencyRupee>
                      {orderItem.totalPrice}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {orderStatus === 'Processing' ? (
          <button
            className="btn btn-success m-3"
            onClick={() => {
              updateOrderStatus(props.order._id);
            }}
          >
            Update order status to delivered
          </button>
        ) : (
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger m-3">Delete this order</button>
          </div>
        )}

        <p className="card-text"></p>
        <h6 className="card-subtitle mb-2 text-muted">
          Total Order Value: <CurrencyRupee></CurrencyRupee>
          {props.order.totalPrice}
        </h6>
      </div>
    </div>
  );
}
