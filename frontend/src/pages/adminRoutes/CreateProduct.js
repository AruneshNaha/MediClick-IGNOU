import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function CreateProduct(props) {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '',
  });

  const [productId, setProductId] = useState('');
  const [categories, setCategories] = useState([]);
  const [productCategory, setProductCategory] = useState('');

  const [imageButton, setImageButton] = useState(false);

  const navigate = useNavigate();
  const host = 'http://localhost:4000';

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });

    console.log(product);
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`${host}/api/v1/categories`, {
        method: 'GET',
      });

      const res = await response.json();
      if (response.status === 200) {
        await setCategories(res);
        console.log(categories);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async () => {
    if (
      !product.name ||
      !product.price ||
      !product.stock ||
      !product.category ||
      !product.description
    ) {
      props.showAlert('You cannot leave any field empty', 'danger');
      return;
    }

    const token = localStorage.getItem('token');
    if (token !== null) {
      try {
        const response = await fetch(`${host}/api/v1/product/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
          body: JSON.stringify(product),
        });

        const res = await response.json();
        if (response.status === 201) {
          // localStorage.setItem('token', auth.token);
          navigate(`/createProduct/${res.product._id}`);
          setProductId(res.product._id);
          console.log(`Product ID from createProduct: ${res.product._id}`);
          props.showAlert('Product created successfully!', 'success');
          setImageButton(true);
        } else {
          props.showAlert('Failed to create product', 'danger');
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      props.showAlert('Please login as admin first', 'danger');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>Create a product in 2 simple steps</h1>
          <h6>
            <span className="badge bg-danger">Admin privilege</span>
          </h6>
        </center>
      </div>
      <div className="container">
        <div className="center">
          <h4 className="text-muted">
            {imageButton
              ? '#2 Click on upload to upload a product image now '
              : '#1 Enter the product Information correctly then scroll down to the next form'}
          </h4>
        </div>
        {imageButton ? (
          <Outlet />
        ) : (
          <div className="container m-3">
            <h4>Product info:</h4>
            <TextField
              fullWidth
              sx={{ m: 1 }}
              required
              name="name"
              id="outlined-required"
              label="Product Name"
              defaultValue=""
              onChange={handleChange}
              value={product.name}
            />
            <TextField
              sx={{ width: '45%', m: 1 }}
              required
              name="price"
              id="outlined-required"
              label="Price"
              defaultValue=""
              onChange={handleChange}
              value={product.price}
            />
            <TextField
              sx={{ width: '45%', m: 1 }}
              required
              name="stock"
              margin="normal"
              id="outlined-required"
              label="Stock"
              defaultValue=""
              onChange={handleChange}
              value={product.stock}
            />
            <br />
            Select Category:{' '}
            <select
              name="category"
              onChange={handleChange}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories &&
                categories.map((cate, index) => (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                ))}
            </select>
            <TextField
              sx={{ m: 1, width: '45%' }}
              id="outlined-multiline-static"
              label="Description"
              name="description"
              multiline
              rows={4}
              defaultValue=""
              onChange={handleChange}
              value={product.description}
            />
          </div>
        )}

        {imageButton ? (
          <center>
            <h5>Upload image here</h5>
          </center>
        ) : (
          <div className="container">
            <center>
              <button className="btn btn-primary" onClick={createProduct}>
                Create this product with above information
              </button>
            </center>
          </div>
        )}
        {/* <Outlet /> */}
      </div>
    </>
  );
}
