import { TextField } from '@mui/material';
import React, { useState } from 'react';

export default function CreateProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });

    console.log(product);
  };

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
            #1 Enter the product Information correctly
          </h4>
        </div>
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
          <TextField
            sx={{ width: '45%', m: 1 }}
            required
            margin="normal"
            name="category"
            id="outlined-required"
            label="Product category"
            defaultValue=""
            onChange={handleChange}
            value={product.category}
          />
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
      </div>
    </>
  );
}
