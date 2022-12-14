import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductAdminCard from './adminComponents/ProductAdminCard';
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';

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
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState('');
  const [editedProd, setEditedProd] = useState({
    name: '',
    description: '',
    category: '',
    stock: '',
    price: '',
  });

  const formdata = new FormData();

  const localhost = 'http://localhost:4000';

  const handleChange = (e) => {
    setEditedProd({ ...editedProd, [e.target.name]: e.target.value });
    console.log(editedProd);
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`${localhost}/api/v1/categories`, {
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
      const response = await fetch(`${localhost}/api/v1/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        loadallproducts();
        props.showAlert('Product deleted successfully!', 'success');
      } else {
        props.showAlert('Failed to delete product', 'danger');
      }
    }
  };

  const editProduct = async (productId) => {
    console.log(productId);
    setProductId(productId);
    setShowModal(true);

    await fetch(`${localhost}/api/v1/product/${productId}`, {
      method: 'GET',
    }).then(async (res) => {
      const productInfo = await res.json();

      console.log(productInfo.product);

      const product = await productInfo.product;
      console.log(product);
      setEditedProd({
        name: product.name,
        description: product.description,
        category: product.category,
        stock: product.stock,
        price: product.price,
      });
      console.log(editedProd);
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const sendProductToDatabase = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
      const response = await fetch(`${localhost}/api/v1/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(editedProd),
      });

      if (response.status === 200) {
        loadallproducts();
        props.showAlert('Product updated successfully!', 'success');
        closeModal();
      } else {
        props.showAlert('Failed to update product', 'danger');
      }
    }
  };

  useEffect(() => {
    loadallproducts();
    getCategories();
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
      <Modal show={showModal}>
        <Modal.Header>
          <h5>Edit this Product</h5>
        </Modal.Header>
        <ModalBody>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                name="name"
                type="text"
                onChange={handleChange}
                value={editedProd.name}
                className="form-control"
                id="name"
                minLength={5}
                required
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                name="description"
                type="text"
                value={editedProd.description}
                onChange={handleChange}
                className="form-control"
                id="description"
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
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
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                name="price"
                type="number"
                value={editedProd.price}
                onChange={handleChange}
                className="form-control"
                id="price"
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                value={editedProd.stock}
                onChange={handleChange}
                className="form-control"
                id="stock"
                minLength={5}
                required
              />
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="images" className="form-label">
                Product Image
              </label>
              <input
                accept="image"
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

                  const token = localStorage.getItem('token');
                  if (token !== null) {
                    try {
                      const response = await fetch(
                        `${localhost}/api/v1/upload`,
                        {
                          method: 'POST',
                          body: formdata,
                        }
                      );

                      const res = response;
                      if (response.status === 200) {
                        console.log(
                          `Message from upload product image: ${res.message}`
                        );
                        props.showAlert(
                          'Product image uploaded successfully!',
                          'success'
                        );
                        closeModal();
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
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={sendProductToDatabase}
            className="btn btn-primary"
            // disabled={note.title.length < 5 || note.description.length < 5}
          >
            Update Product
          </button>
          <button onClick={closeModal} className="btn btn-danger">
            Close
          </button>
        </ModalFooter>
      </Modal>
      <div className="container m-5">
        <div className="row m-3">
          {products.map((product) => {
            return (
              <ProductAdminCard
                key={product._id}
                product={product}
                showAlert={props.showAlert}
                deleteProduct={deleteProduct}
                editProduct={editProduct}
              ></ProductAdminCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
