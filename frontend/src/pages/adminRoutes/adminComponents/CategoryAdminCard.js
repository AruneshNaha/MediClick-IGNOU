import React, { useEffect, useState } from 'react';

export default function CategoryAdminCard(props) {

  const [products, setProducts] = useState([])
  const [productCount, setProductCount] = useState(0)
  const [error, setError] = useState(false) 

  const getProductsByCategory = async () => {
    return await fetch(`http://localhost:4000/api/v1/category/products/${props.category._id}`, {
      method: 'GET',
    })
      .then(async (response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const loadproducts = async() => {
    await getProductsByCategory().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data.products);
        setProductCount(data.productCount)
      }
    });
  };

  useEffect(() => {
    loadproducts()
  }, [])
  

  return (
    <div key={props.category._id} className="row text-center mb-2 ">
      <div className="col-4">
        <h5>{props.category.name}</h5>
        <h6 className="text-muted">{productCount} products</h6>
      </div>
      <div className="col-4">
        <button
          className="btn btn-success m-2"
          onClick={() => {
            props.getCategoryById(props.category._id);
            props.setCategoryID(props.category._id);
            props.setShowModal(true);
          }}
        >
          Update
        </button>
      </div>
      <div className="col-4">
        <button
          onClick={() => {
            props.deleteCategory(props.category._id);
          }}
          className="btn btn-danger m-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
