import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {

  const navigate = useNavigate()

  return (
    <div>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>
            <span class="badge bg-danger">Admin Dashboard</span>
          </h1>
        </center>
      </div>
      <div className="container">
        <center>
          <h4>
            You have got admin privilges. The following are the privileges:
          </h4>
        </center>
      </div>
      <center>
        <ul className="list-group">
          <li>
            <button className="btn btn-link" onClick={() => {navigate('/createProduct')}}>Create a product</button>
          </li>
          <li>
            <button className="btn btn-link">Edit a product</button>
          </li>
          <li>
            <button className="btn btn-link">
              Delete or update stock of a product
            </button>
          </li>
          <li>
            <button className="btn btn-link">Manage all orders</button>
          </li>
          <li>
            <button className="btn btn-link">
              Get all users and manage them
            </button>
          </li>
          <li>
            <button className="btn btn-link">
              Total sales value till date
            </button>
          </li>
        </ul>
      </center>
      <center><div className="text-muted mb-2"><h5>Click on any of the above link</h5></div></center>
    </div>
  );
}
