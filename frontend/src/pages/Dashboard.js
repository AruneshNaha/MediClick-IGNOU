import React, { useEffect, useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Crsl from '../components/Crsl';
import ProductCard from '../components/ProductCard';
import AuthContext from './context/AuthContext';
import AuthState from './context/AuthState';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(props) {
  const navigate = useNavigate();

  const context = useContext(AuthContext);
  const { authToken } = context;
  const getAdmin = localStorage.getItem('role');

  console.log(`Authtoken from auth context: ${authToken}`);

  return (
    <AuthState>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>
            Welcome to MediClick
            {getAdmin === 'admin' ? (
              <h5>
                <span class="badge bg-danger">Admin privilege</span>
              </h5>
            ) : (
              ''
            )}
          </h1>
        </center>
      </div>
      <center>
        <button
          className="btn btn-primary m-1 p-2"
          onClick={() => {
            navigate('/products');
          }}
        >
          View our products <InventoryIcon></InventoryIcon>
        </button>
      </center>
      <Crsl></Crsl>
    </AuthState>
  );
}
