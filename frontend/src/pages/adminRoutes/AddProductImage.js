import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function AddProductImage(props) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const formdata = new FormData();
  const host = 'http://localhost:4000';

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
            onChange={async (e) => {
              const value = e.target.files[0];

              console.log(value);

              formdata.append('id', productId);
              formdata.append('images', value);

              for (var key of formdata.entries()) {
                console.log(key[0] + ': ' + key[1]);
              }

              // const token = localStorage.getItem('token');
              // if (token !== null) {
              //   try {
              //     const response = await fetch(`${host}/api/v1/upload`, {
              //       method: 'POST',
              //       body: formdata,
              //     });

              //     const res = response;
              //     if (response.status === 200) {
              //       console.log(
              //         `Message from upload product image: ${res.message}`
              //       );
              //       props.showAlert(
              //         'Product image uploaded successfully!',
              //         'success'
              //       );
              //       navigate('/adminDashboard');
              //     } else {
              //       console.log(
              //         `Message from upload product image: ${res.message}`
              //       );
              //       props.showAlert('Failed to create product', 'danger');
              //     }
              //     console.log(res);
              //   } catch (error) {
              //     console.log(error);
              //   }
              // } else {
              //   props.showAlert('Please login as admin first', 'danger');
              // }
            }}
          />
        </Button>
      </center>
      <center>
        <button
          className="btn btn-primary m-3"
          onClick={async () => {
            const token = localStorage.getItem('token');
            if (token !== null) {
              try {
                const response = await fetch(`${host}/api/v1/upload`, {
                  method: 'POST',
                  body: formdata,
                });

                const res = response;
                if (response.status === 200) {
                  console.log(
                    `Message from upload product image: ${res.message}`
                  );
                  props.showAlert(
                    'Product image uploaded successfully!',
                    'success'
                  );
                  navigate('/adminDashboard');
                } else {
                  console.log(
                    `Message from upload product image: ${res.message}`
                  );
                  props.showAlert('Failed to create product', 'danger');
                }
                console.log(res);
              } catch (error) {
                console.log(error);
              }
            } else {
              props.showAlert('Please login as admin first', 'danger');
            }
          }}
        >
          Upload this image
        </button>
      </center>
    </div>
  );
}
