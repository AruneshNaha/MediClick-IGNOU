import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';

export default function ProductAdminCard(props) {
  const navigate = useNavigate();
  
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card">
        <img
          src={require(`../../../backend/uploads/${props.product._id}.jpg`)}
          alt="Product imag not found!"
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between">
            {props.product.name}{' '}
            <span className="badge bg-info">
              <h5>
                {' '}
                <CurrencyRupee></CurrencyRupee> {props.product.price}
              </h5>
            </span>
          </h5>
          <h6>
            <i>{props.product.category === null ? "No category classified" : props.product.category.name}</i>
          </h6>
          <p className="card-text">{props.product.description}</p>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary"
            onClick={() => {
                props.editProduct(props.product._id)
            }}
            >
              <EditIcon></EditIcon>
              Edit
            </button>

            <button className="btn btn-danger" onClick={() => {
                props.deleteProduct(props.product._id)
            }}>
              <DeleteIcon></DeleteIcon>
              Delete
            </button>
          </div>
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
