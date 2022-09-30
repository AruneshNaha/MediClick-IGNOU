import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function AddProductImage(props) {
  const { productId } = useParams();
  const navigate = useNavigate()
  const [showUploadButton, setShowUploadButton] = useState(0)

  const formdata = new FormData();
  const host = 'http://localhost:4000';

  const handleChange = (e) => {
    const value = e.target.files[0];
    console.log(value);
    formdata.append('id', productId);

    formdata.append('images', value);
    setShowUploadButton(1)
    for (var key of formdata.entries()) {
      console.log(key[0] + ': ' + key[1]);
    }
  };

  const uploadImage = async () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      try {
        const response = await fetch(`${host}/api/v1/upload`, {
          method: 'POST',
          body: formdata,
        });

        const res = await response.json();
        if (response.status === 200) {
          console.log(`Message from upload product image: ${res.message}`);
          props.showAlert('Product image uploaded successfully!', 'success');
          navigate('/adminDashboard')
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
            accept="image"
            name="images"
            placeholder="choose a file"
            type="file"
            onChange={handleChange}
          />
        </Button>
      </center>
      <center>
      {showUploadButton ? <button className="btn btn-primary m-3" onClick={uploadImage}>
        Upload this image
      </button> : ''}
      </center>
    </div>
  );
}
