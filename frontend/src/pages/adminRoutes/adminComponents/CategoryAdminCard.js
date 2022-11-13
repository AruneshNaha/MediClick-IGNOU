import React, { useEffect, useState } from 'react';

export default function CategoryAdminCard(props) {

  useEffect(() => {
    countProducts()
  }, []);

  const products = props.products
  const [productCount, setProductCount] = useState(0)

  const countProducts = async() => {
    console.log(`countProducts worked: ${products.length}`)
    await products.forEach((product) => {
      console.log(product)
      if(product.category !== null){
        // console.log(`Product Category = ${product.category._id}`)
        if(product.category._id === props.category._id){
          console.log('Category matched!')
          setProductCount(productCount+1)
          console.log(productCount)
        }
      }
    })  
  }
  return (
    <div key={props.category._id} className="row text-center mb-2 ">
      <div className="col-4">
        <h5>{props.category.name}</h5>
        {/* <h6 className="text-muted">{props.productCount} products</h6> */}
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
