import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Table from 'react-bootstrap/Table';

export default function CheckOut() {
  const location = useLocation();

  const { cart } = useContext(AuthContext);

  console.log(location.state);

  return (
    <>
      <div
        className="position-relative"
        style={{ margin: '30px 0px', marginTop: '10px' }}
      >
        <center>
          <h1>Finalize your order now:</h1>
        </center>
      </div>

      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr className="table-warning">
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem) => {
              return (
                <tr>
                  <td>{cartItem.name}</td>
                  <td>{cartItem.price}</td>
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="table-success">
              <td colSpan={3}>Total Order Cost: </td>
              <td>{location.state}</td>
            </tr>
          </tfoot>
        </Table>
      </div>
      <div
          className="position-relative"
          style={{ margin: '30px 0px', marginTop: '30px' }}
        >
          <center><button className="btn btn-success">{`Place Order for Rs. ${location.state}`}</button></center>
        </div>
    </>
  );
}
