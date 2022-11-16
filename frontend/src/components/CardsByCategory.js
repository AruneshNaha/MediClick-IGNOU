import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import React, { useState, useEffect } from 'react';
import CategoryContainer from './subComponents/CategoryContainer';

export default function CardsByCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState('');
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [error, setError] = useState(false);

  const host = 'http://localhost:4000';

  const getCategories = async () => {
    try {
      const response = await fetch(`${host}/api/v1/categories`, {
        method: 'GET',
      });

      const res = await response.json();
      if (response.status === 200) {
        setCategories(res);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      {categories.map((category) => {
        return (
          <CategoryContainer
            key={category._id}
            category={category}
          ></CategoryContainer>
        );
      })}
    </div>
    // <div className="container fluid overflow-scroll">
    //   <div className="row flex-row flex-nowrap">
    //     <div className="col-3">
    //       <div className="card card-block">
    //         <img
    //           //   src={imgsource ? imgsource : `${props.product.images}`}
    //           alt="Product imag not found!"
    //           className="card-img-top"
    //         />
    //         <div className="card-body">
    //           <h5 className="card-title d-flex justify-content-between">
    //             {/* {props.product.name}{' '} */}
    //             Product Name
    //             <span className="badge bg-info">
    //               <h5>
    //                 {' '}
    //                 <CurrencyRupee></CurrencyRupee>
    //                 {/* {props.product.price} */}
    //                 Price
    //               </h5>
    //             </span>
    //           </h5>
    //           <h6>
    //             <i>
    //               {/* {props.product.category === null
    //             ? 'No category classified'
    //             : props.product.category.name} */}
    //             </i>
    //           </h6>
    //         </div>

    //         <ul className="list-group list-group-flush">
    //           <center>
    //             <button
    //               className="btn btn-link m-2"
    //               onClick={() => {
    //                 // navigate('/productInfo', { state: props.product });
    //               }}
    //             >
    //               View this product for more details
    //             </button>
    //           </center>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
