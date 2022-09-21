import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Crsl from '../components/Crsl';

export default function Dashboard() {
  return (
    <>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center><h1>Welcome to MediClick</h1></center>
      </div>
      <Crsl></Crsl>
    </>
  );
}
