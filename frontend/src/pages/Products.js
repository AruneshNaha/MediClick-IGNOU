import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductCard from '../components/ProductCard';
import AuthContext from './context/AuthContext';
import RemoveShoppingCart from '@mui/icons-material/RemoveShoppingCart';

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
  const navigate = useNavigate();
  const { cartArray } = useParams();

  const context = useContext(AuthContext);
  const { emptyCart } = context;

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
      <div className="container m-5 d-flex justify-content-evenly">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            navigate('/cart');
          }}
        >
          Go to cart <ShoppingCartIcon></ShoppingCartIcon>{' '}
        </button>
        <button
          className="btn btn-warning"
          onClick={() => {
            emptyCart();
            props.showAlert('All items deleted from cart');
          }}
        >
          Empty Cart <RemoveShoppingCart></RemoveShoppingCart>
        </button>
      </div>
      <div className="container m-5">
        <div className="row m-3">
          {products.length !== 0
            ? products.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                    showAlert={props.showAlert}
                    createCartArray={createCartArray}
                  ></ProductCard>
                );
              })
            : 'No products to view'}
        </div>
      </div>
    </>
  );
}
