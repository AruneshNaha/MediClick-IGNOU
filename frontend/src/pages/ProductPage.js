import React from 'react';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';

export default function ProductPage(props) {
  return (
    <div className="d-flex justify-content-between">
      <img
        src={require(`../backend/uploads/${props.product._id}.jpg`)}
        alt=""
      />
      <div className="card">
        <h1>{props.product.name}</h1>
        <h2>
          <CurrencyRupee></CurrencyRupee> {props.product.price}
        </h2>
      </div>
    </div>
  );
}
