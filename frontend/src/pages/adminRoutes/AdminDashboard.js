import React from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function AdminDashboard() {
  const navigate = useNavigate();

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
            <button
              className="btn btn-link"
              onClick={() => {
                navigate('/createProduct');
              }}
            >
              <Inventory2Icon></Inventory2Icon> Create a product
            </button>
          </li>
          <li>
            <button
              className="btn btn-link"
              onClick={() => {
                navigate('/manageProducts');
              }}
            >
              <CategoryIcon></CategoryIcon> Manage products
            </button>
          </li>
          <li>
            <button
              className="btn btn-link"
              onClick={() => {
                navigate('/manageOrdersAdmin');
              }}
            >
              <ShoppingBasketIcon></ShoppingBasketIcon> Manage all orders
            </button>
          </li>
          <li>
            <button className="btn btn-link" onClick={() => {
                navigate('/manageUsersAdmin');
              }}>
              <PeopleIcon></PeopleIcon> Manage users
            </button>
          </li>
          <li>
            <button className="btn btn-link">
              Total sales value till date
            </button>
          </li>
        </ul>
      </center>
      <center>
        <div className="text-muted mb-2">
          <h5>Click on any of the above link</h5>
        </div>
      </center>
    </div>
  );
}
