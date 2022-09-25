import React, { useEffect, useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Crsl from '../components/Crsl';
import ProductCard from '../components/ProductCard';
import AuthContext from './context/AuthContext';
import AuthState from './context/AuthState';

export default function Dashboard(props) {

  return (
    <AuthState>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>Welcome to MediClick</h1>
        </center>
      </div>
      <Crsl></Crsl>
      
    </AuthState>
  );
}
