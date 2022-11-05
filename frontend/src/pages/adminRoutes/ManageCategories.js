import { TextField } from '@mui/material';
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

export default function ManageCategories(props) {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editedCategory, setEditedCategory] = useState({ name: categoryName });

  const host = 'http://localhost:4000';

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
    setEditedCategory({ name: categoryName });
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

  const createCategory = async () => {
    const body = { name: categoryName };
    if (!categoryName) {
      props.showAlert('You cannot leave category field empty', 'danger');
      return;
    }

    const token = localStorage.getItem('token');
    if (token !== null) {
      try {
        const response = await fetch(`${host}/api/v1/category/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
          body: JSON.stringify(body),
        });

        const res = await response.json();
        if (response.status === 200) {
          console.log(`category ID from createProduct: ${res.category._id}`);
          props.showAlert('Category created successfully!', 'success');
          getCategories();
        } else {
          props.showAlert('Failed to create category', 'danger');
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      props.showAlert('Please login as admin first', 'danger');
    }
  };

  const getCategoryById = async (categoryId) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
      const response = await fetch(`${host}/api/v1/category/${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      });

      const res = await response.json();

      if (response.status === 200) {
        setCategoryName(res.name);
      } else {
        props.showAlert('Failed to fetch category details', 'danger');
      }

      console.log(res.name);
    }
  };

  const deleteCategory = async (categoryId) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
      const response = await fetch(`${host}/api/v1/category/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        getCategories();
        props.showAlert('Category deleted successfully!', 'success');
      } else {
        props.showAlert('Failed to delete category', 'danger');
      }
    }
  };

  const updateCategory = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
      const response = await fetch(`${host}/api/v1/category/${categoryID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(editedCategory),
      });

      if (response.status === 200) {
        getCategories();
        props.showAlert('Category updated successfully!', 'success');
        closeModal();
      } else {
        props.showAlert('Failed to update category', 'danger');
      }
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
          <h1>Category Management</h1>
          <h6>
            <span className="badge bg-danger">Admin privilege</span>
          </h6>
        </center>
      </div>

      <div className="container">
        <center>
          <h2 className="text-muted">Create a category</h2>
          <TextField
            sx={{ width: '45%', m: 1 }}
            required
            name="name"
            margin="normal"
            id="outlined-required"
            label="Enter a category"
            defaultValue=""
            onChange={handleChange}
            value={categoryName}
          />

          <div className="container">
            <center>
              <button className="btn btn-primary" onClick={createCategory}>
                Create category
              </button>
            </center>
          </div>
        </center>
      </div>
      <hr />
      <div className="container">
        <center>
          <h2 className="text-muted">Manage categories</h2>

          <Modal show={showModal}>
            <Modal.Header>
              <h5>Edit this category</h5>
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
                    value={categoryName}
                    className="form-control"
                    id="name"
                    required
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button
                onClick={() => {
                  updateCategory(categoryID);
                }}
                className="btn btn-primary"
              >
                Update Category
              </button>
              <button onClick={closeModal} className="btn btn-danger">
                Close
              </button>
            </ModalFooter>
          </Modal>

          {categories.map((category) => {
            return (
              <div key={category._id} className="row text-center mb-2 ">
                <div className="col-4">
                  <h5>{category.name}</h5>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-success m-2"
                    onClick={() => {
                      getCategoryById(category._id);
                      setCategoryID(category._id);
                      setShowModal(true);
                    }}
                  >
                    Update
                  </button>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteCategory(category._id);
                    }}
                    className="btn btn-danger m-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </center>
      </div>
    </>
  );
}
