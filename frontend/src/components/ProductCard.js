import React, {  } from 'react';

export default function ProductCard(props) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card">
        <img
          src={require(`../backend/uploads/${props.product._id}.jpg`)}
          alt="Product not found!"
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{props.product.name}</h5>
          <h6>
            <i>{props.product.category}</i>
          </h6>
          <p className="card-text">{props.product.description}</p>
          <div className="d-flex justify-content-between">
            <span className="badge bg-info">
              <h5>Rs. {props.product.price}</h5>
            </span>
            <button className="btn btn-primary">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
