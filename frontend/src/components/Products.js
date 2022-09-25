import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../pages/context/AuthContext';
import ProductCard from './ProductCard';

export default function Products(props) {
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
  const [cart, setCart] = useState([]);
  const navigate = useNavigate()
  const {cartArray} = useParams()

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

  const createCartArray = (cartArray) => {
    setCart(cartArray);
  };

  const getCartArray = () => {
    return cart;
  };

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
    <div className="d-grip gap-2">
    <center><button className="btn btn-primary" type="button" onClick={() => {
      navigate('/cart', {state: cart})
    }}>{`Go to cart >>>`} </button></center>
    </div>
      <div className="container m-5">
        <div className="row m-3">
          {products.map((product) => {
            return (
              <ProductCard
                key={product._id}
                product={product}
                showAlert={props.showAlert}
                createCartArray={createCartArray}
              ></ProductCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
