import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Crsl from '../components/Crsl';
import ProductCard from '../components/ProductCard';

export default function Dashboard() {
  const getProducts = async () => {
    return await fetch(`http://localhost:4000/api/v1/products`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const [products, setproducts] = useState([]);
  const [error, seterror] = useState(false);

  const loadallproducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        seterror(data.error);
      } else {
        setproducts(data.products);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    loadallproducts();
  }, []);

  return (
    <>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>Welcome to MediClick</h1>
        </center>
      </div>
      <Crsl></Crsl>
      <div className="container m-5">
        <div className="row m-3">
          {
            products.map((product) => {
              return (<ProductCard key={product._id} product = {product}></ProductCard>)
            })
          }
          
        </div>
      </div>
    </>
  );
}
