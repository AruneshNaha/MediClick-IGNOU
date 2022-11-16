import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryProductCard(props) {
  const navigate = useNavigate();
  //../backend/uploads/${props.product._id}.jpg
  const imgsource = require(`../../backend/uploads/${props.product._id}.jpg`);

  return (
    <div className="col-3">
      <div className="card" style={{width: "100%"}}>
        <img
          src={imgsource ? imgsource : `${props.product.images}`}
          style={{width: "200px", height: "180px"}}
          alt="Product imag not found!"
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">
            {props.product.name}
            
          </h5>
          <span className="badge bg-info">
              <h5>
                {' '}
                <CurrencyRupee></CurrencyRupee>
                {props.product.price}
              </h5>
            </span>
          <h6>
            <i>
              {props.product.category === null
                ? 'No category classified'
                : props.product.category.name}
            </i>
          </h6>
        </div>

        <ul className="list-group list-group-flush">
          <center>
            <button
              className="btn btn-link m-2"
              onClick={() => {
                navigate('/productInfo', { state: props.product });
              }}
            >
              View this product
            </button>
          </center>
        </ul>
      </div>
    </div>
  );
}
