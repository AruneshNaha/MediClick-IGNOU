import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function AddProductImage(props) {
  const { productId } = useParams();

  const [formData, setFormData] = useState(new FormData());
  const host = 'http://localhost:4000';

  const handleChange = (e) => {
    const value = e.target.files[0];
    console.log(value);
    setFormData(formData.set('images', value))
    setFormData(formData.set('id', productId))
    // formData.set("id", productId);
    // setUploadBody({...uploadBody, [name]: value})
    console.log(formData);
    // uploadImage();
  };

  // useEffect(() => {
  //   formData.set('id', productId);
  //   console.log(formData);
  // }, []);

  const uploadImage = async () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      try {
        const response = await fetch(`${host}/api/v1/upload`, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json',
          //   token: localStorage.getItem('token'),
          // },
          body: formData,
        });

        const res = await response.json();
        if (response.status === 201) {
          // localStorage.setItem('token', auth.token);
          // navigate('/order', { state: res });
          // setProductId(res.product._id);
          console.log(`Message from upload product image: ${res.message}`);
          props.showAlert('Product image uploaded successfully!', 'success');
          // setImageButton(true);
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

  return (
    <div>
      <center>
        <Button variant="contained" component="label">
          Select an Image
          <input
            accept="image/*"
            name="images"
            placeholder="choose a file"
            type="file"
            onChange={handleChange}
          />
        </Button>
      </center>
      <button className="btn btn-primary" onClick={uploadImage}>
        Upload this image
      </button>
    </div>
  );
}
