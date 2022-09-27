import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

export default function Navbar(props) {
  const token = localStorage.getItem('token');
  const host = 'http://localhost:4000';

  const getProducts = async () => {
    return await fetch(`http://localhost:4000/api/v1/products`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const [products, setProducts] = useState([]);
  const [productArray, setProductArray] = useState([]);
  const [error, seterror] = useState(false);

  const loadallproducts = () => {

    let arr = []

    getProducts().then((data) => {
      if (data.error) {
        seterror(data.error);
      } else {
        setProducts(data.products);
        console.log(data);
        data.products.forEach((product) => {
          arr.push(product.name);
        });
        setProductArray(arr);
        console.log(`ProductArray: ${productArray}`);
      }
    });
  };

  const [value, setValue] = useState('');

  useEffect(() => {
    loadallproducts();
  }, []);
  console.log(`Value at searchbar: ${value}`);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MediClick
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {token === null && (
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign in
                  </Link>
                </li>
              )}
              {token === null && (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              )}
              {token !== null && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    role="button"
                    onClick={async () => {
                      // console.log(token);
                      try {
                        await fetch(`${host}/api/v1/logout`, {
                          method: 'GET',
                        });
                        localStorage.clear();

                        props.showAlert(
                          'You are successfully logged out!',
                          'success'
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Logout
                  </Link>
                </li>
              )}
              {token !== null && (
                <li className="nav-item">
                  <Link className="nav-link" to="/forgotpassowrd">
                    Forgot Password
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/products"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  View Products
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About us
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={productArray}
                value={value}
                sx={{ width: 300 }}
                size={'small'}
                renderInput={(params) => (
                  <TextField {...params} label="Product Name" />
                )}
                onChange={(e, newValue) => setValue(newValue)}
                freeSolo
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
