import React, { useEffect, useState } from 'react';
import CategoryProductCard from './CategoryProductCard';

export default function CategoryContainer(props) {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [error, setError] = useState(false);

  const getProductsByCategory = async () => {
    return await fetch(
      `http://localhost:4000/api/v1/category/products/${props.category._id}`,
      {
        method: 'GET',
      }
    )
      .then(async (response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const loadproducts = async () => {
    await getProductsByCategory().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data.products);
        setProductCount(data.productCount);
      }
    });
  };

  useEffect(() => {
    loadproducts();
  }, []);

  console.log(products);

  return productCount ? (
    <div className="container fluid overflow-scroll p-3">
      <h4 className="text-muted">
        Viewing {productCount} products from {props.category.name}:
      </h4>
      <div className="row flex-row flex-nowrap">
        {products.map((product) => {
          return (
            <CategoryProductCard
              key={product._id}
              product={product}
            ></CategoryProductCard>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
}
