import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function Dashboard() {
  return (
    <>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center><h1>Welcome to mediclick</h1></center>
      </div>
      <Carousel fade variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: 390, opacity: .4}}
          src={require('../carousel-images/p1.jpg')}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First class products</h3>
          <p>We make no compromises in making first class products.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: 390, opacity: .4}}
          src={require('../carousel-images/p2.jpg')}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Health in a click</h3>
          <p>No compromise with health. You tell us, we deliver you medicines at your doorstep</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: 390, opacity: .3}}
          src={require('../carousel-images/p4.jpg')}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Expanding business</h3>
          <p>
            We are looking forward to making our business grow rapidly and expand more throughout the world
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  );
}
