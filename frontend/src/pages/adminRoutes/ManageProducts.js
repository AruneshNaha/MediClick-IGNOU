import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductAdminCard from './adminComponents/ProductAdminCard';
// import ProductAdminCard from './AdminComponents/ProductAdminCard';

export default function ManageProducts(props) {
  const getProducts = async () => {
    return await fetch(`http://localhost:4000/api/v1/products`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [error, seterror] = useState(false);
  const localhost = 'http://localhost:4000';

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

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
      const response = await fetch(
        `${localhost}/api/v1/product/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
        }
      );

      if (response.status === 200) {
        loadallproducts()
        props.showAlert('Product deleted successfully!', 'success');
      } else {
        props.showAlert('Failed to delete product', 'danger');
      }
    }
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
          <h1>Manage products</h1>
          <h6>
            <span className="badge bg-danger">Admin privilege</span>
          </h6>
        </center>
      </div>
      <div className="container m-5">
        <div className="row m-3">
          {products.map((product) => {
            return (
              <ProductAdminCard
                key={product._id}
                product={product}
                showAlert={props.showAlert}
                deleteProduct={deleteProduct}
              ></ProductAdminCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
