import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import React from 'react'

export default function OrderCard(props) {

    const orderStatus =props.order.orderStatus;


  return (
    <div className="card p-3 m-5">
      <div className="d-flex justify-content-start">
        <h4 className="fw-light">Order {props.index + 1}</h4>
        
      </div>

      <div className="d-flex justify-content-between">
      <h4 className="fw-light">Order ID: {props.order._id}</h4>
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
          ""
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
  )
}
